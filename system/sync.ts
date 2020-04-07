/** @noSelfInFile */

import { MapPlayer } from "../handles/player";
import { Timer } from "../handles/timer";
import { Trigger } from "../handles/trigger";
import { base64Decode, base64Encode } from "./base64";
import { BinaryReader } from "./binaryreader";
import { BinaryWriter } from "./binarywriter";
import { getElapsedTime } from "./gametime";

const SYNC_PREFIX = "T";
const SYNC_PREFIX_CHUNK = "S";
const SYNC_MAX_CHUNK_SIZE = 244;

export const enum SyncStatus {
  Syncing,
  Success,
  Timeout
}

export interface ISyncResponse {
  data: string;
  status: SyncStatus;
  time: number;
}

export interface ISyncOptions {
  timeout: number;
}

export type SyncCallback = (res: ISyncResponse, req: SyncRequest) => void;

class SyncIncomingPacket {
  public readonly chunk: number;
  public readonly chunks: number;
  public readonly data: string;
  public readonly req: SyncRequest;

  public constructor(prefix: string, data: string) {
    const isChunk = prefix === SYNC_PREFIX_CHUNK;
    const header = base64Decode(isChunk ? data.substr(0, 10) : data.substr(0, 5));
    const reader = new BinaryReader(header);
    const id = reader.readUInt16();
    this.req = SyncRequest.fromIndex(id);
    this.chunks = isChunk ? reader.readUInt16() : 0;
    this.chunk = isChunk ? reader.readUInt16() : 0;
    this.data = isChunk ? data.substr(10) : data.substr(5);
  }
}

class SyncOutgoingPacket {
  public readonly chunk: number;
  public readonly chunks: number;
  public readonly data: string;
  public readonly req: SyncRequest;

  public constructor(req: SyncRequest, data: string, chunk = -1, totalChunks = 0) {
    this.req = req;
    this.data = data;
    this.chunk = chunk;
    this.chunks = totalChunks;
  }

  public getHeader() {
    const writer = new BinaryWriter();
    writer.writeUInt16(this.req.id);
    if (this.chunk !== -1) {
      writer.writeUInt16(this.chunks);
      writer.writeUInt16(this.chunk);
    }
    return base64Encode(writer.toString());
  }

  public toString() {
    const header = this.getHeader();
    const writer = new BinaryWriter();
    writer.writeString(this.data);
    return header + writer.toString();
  }
}

export class SyncRequest {
  public readonly from: MapPlayer;
  public readonly id: number;
  public readonly options: ISyncOptions;
  public readonly startTime: number;
  private chunks: string[] = [];
  private currentChunk = 0;
  private onError?: SyncCallback;
  private onResponse?: SyncCallback;
  private status: SyncStatus;
  private static readonly cache: SyncRequest[] = [];
  private static counter = 0;
  private static defaultOptions: ISyncOptions = { timeout: 0 };
  private static eventTrigger = new Trigger();
  private static index = 0;
  private static indicies: number[] = [];
  private static initialized = false;

  /**
   * Creates a new sync request and immediately attempts to send the data.
   * @param from The player to send the data from.
   * @param data The data to send.
   * @param options
   */
  constructor(from: MapPlayer, data: string, options = SyncRequest.defaultOptions) {
    // initialize
    this.options = options;
    this.from = from;
    this.id = this.allocate();

    SyncRequest.indicies[this.id] = -1;
    SyncRequest.cache[this.id] = this;
    SyncRequest.init();

    // start syncing
    this.currentChunk = 0;

    if (data.length <= SYNC_MAX_CHUNK_SIZE) {
      this.send(new SyncOutgoingPacket(this, data));
    } else {
      // if the data is too long then send it over multiple packets
      const chunks = Math.floor(data.length / SYNC_MAX_CHUNK_SIZE);
      for (let i = 0; i <= chunks; i++) {
        this.send(new SyncOutgoingPacket(this, data.substr(i * SYNC_MAX_CHUNK_SIZE, SYNC_MAX_CHUNK_SIZE), i, chunks));
      }
    }

    this.startTime = getElapsedTime();
    this.status = SyncStatus.Syncing;

    // handle timeout
    if (this.options.timeout > 0) {
      new Timer().start(this.options.timeout, false, () => {
        Timer.fromExpired().destroy();
        if (this.onError && this.status === SyncStatus.Syncing) {
          this.onError({ data: "Timeout", status: SyncStatus.Timeout, time: this.startTime }, this);
        }
      });
    }
  }

  /**
   * Sets the callback for when a request failed.
   * @param callback
   */
  public catch(callback: SyncCallback) {
    this.onError = callback;
    return this;
  }

  /**
   * Sets the callback for when a request has sucessfully synchronized.
   * @param callback
   */
  public then(callback: SyncCallback) {
    this.onResponse = callback;
    return this;
  }

  /**
   * Allocates a unique index.
   */
  private allocate() {
    if (SyncRequest.index !== 0) {
      const id = SyncRequest.index;
      SyncRequest.index = SyncRequest.indicies[id];
      return id;
    } else {
      SyncRequest.counter++;
      return SyncRequest.counter;
    }
  }

  /**
   * Recycles the index.
   */
  private recycle() {
    SyncRequest.indicies[this.id] = SyncRequest.index;
    SyncRequest.index = this.id;
  }

  /**
 * Encode and send the data from the correct player.
 * @param data
 */
  private send(packet: SyncOutgoingPacket) {
    const prefix = packet.chunk === -1 ? SYNC_PREFIX : SYNC_PREFIX_CHUNK;
    if (this.from === MapPlayer.fromLocal() && !BlzSendSyncData(prefix, packet.toString())) {
      print("SyncData: Network Error");
    }
  }

  /**
   * Retrieve a request based on it's index
   * @param index The request index
   */
  public static fromIndex(index: number) {
    return this.cache[index];
  }

  /**
   * Initialize
   */
  public static init() {
    if (this.initialized) {
      return;
    }
    for (let i = 0; i < bj_MAX_PLAYER_SLOTS; i++) {
      const p = MapPlayer.fromIndex(i);
      if (p.controller === MAP_CONTROL_USER && p.slotState === PLAYER_SLOT_STATE_PLAYING) {
        this.eventTrigger.registerPlayerSyncEvent(p, SYNC_PREFIX, false);
        this.eventTrigger.registerPlayerSyncEvent(p, SYNC_PREFIX_CHUNK, false);
      }
    }
    this.eventTrigger.addAction(() => { this.onSync(); });
    this.initialized = true;
  }

  /**
   * Handler for all sync responses
   */
  private static onSync() {
    const packet = new SyncIncomingPacket(BlzGetTriggerSyncPrefix(), BlzGetTriggerSyncData());

    if (!packet.req) {
      return;
    }

    packet.req.currentChunk++;
    packet.req.chunks[packet.chunk] = packet.data;

    if (packet.chunk >= packet.chunks) {
      if (packet.req.onResponse) {
        const data = packet.req.chunks.join("");
        const status = SyncStatus.Success;
        packet.req.status = SyncStatus.Success;
        packet.req.recycle();
        packet.req.onResponse({ data, status, time: getElapsedTime() }, packet.req);
      }
    }
  }
}
