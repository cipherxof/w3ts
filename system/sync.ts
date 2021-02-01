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
  None,
  Syncing,
  Success,
  Timeout,
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

/**
 * A system which provides an easy way to synchronize data between game clients.
 * The data will be split into chunks and sent in order until all of them are recieved by
 * every player. Splitting the data is required as `BlzSendSyncData` only allows 255 characters
 * per request.
 *
 * @example
 * ```ts
 * const data = File.read("savecode.txt");
 *
 * // Synchronize the contents of the file from the first player's computer.
 * new SyncRequest(Players[0], data).then((res, req) => {
 *  print(res.data);
 * });
 * ```
 */
export class SyncRequest {
  public readonly from: MapPlayer;
  public readonly id: number;
  public readonly options: ISyncOptions;
  private _startTime: number = 0;
  private chunks: string[] = [];
  private currentChunk = 0;
  private destroyed = false;
  private onError?: SyncCallback;
  private onResponse?: SyncCallback;
  private status: SyncStatus = SyncStatus.None;
  private static readonly cache: SyncRequest[] = [];
  private static counter = 0;
  private static defaultOptions: ISyncOptions = { timeout: 0 };
  private static eventTrigger = new Trigger();
  private static index = 0;
  private static indicies: number[] = [];
  private static initialized = false;

  /**
   * Creates a new sync request.
   * @param from The player to send the data from.
   */
  constructor(from: MapPlayer);
  /**
   * Creates a new sync request and immediately attempts to send the data.
   * @param from The player to send the data from.
   * @param data The data to send.
   */
  constructor(from: MapPlayer, data: string);
  /**
   * Creates a new sync request. The data will be sent immediately if `data` is not empty.
   * @param from The player to send the data from.
   * @param data The data to send.
   * @param options The options of the request such as timeout.
   */
  constructor(from: MapPlayer, data?: string, options?: ISyncOptions) {
    // initialize
    this.options = !options ? SyncRequest.defaultOptions : options;
    this.from = from;
    this.id = this.allocate();

    SyncRequest.indicies[this.id] = -1;
    SyncRequest.cache[this.id] = this;
    SyncRequest.init();

    if (typeof data === "string") {
      this.start(data);
    }
  }

  /**
   * Get the time that the sync request started syncing.
   */
  public get startTime() {
    return this._startTime;
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
   * Recycles the request index and prevents it from sending any more data.
   */
  public destroy() {
    SyncRequest.indicies[this.id] = SyncRequest.index;
    SyncRequest.index = this.id;
    this.destroyed = true;
  }

  /**
   * Start syncing
   * @param data The data to sync. If data was passed to the constructor then nothing will happen.
   */
  public start(data: string) {
    if (this.status !== SyncStatus.None || this.destroyed) {
      return false;
    }

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

    this._startTime = getElapsedTime();
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

    return true;
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
  private static init() {
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
    this.eventTrigger.addAction(() => {
      this.onSync();
    });
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
        packet.req.onResponse({ data, status, time: getElapsedTime() }, packet.req);
      }
    }
  }
}
