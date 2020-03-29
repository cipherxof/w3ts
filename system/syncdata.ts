/** @noSelfInFile */

import { base64Decode, base64Encode } from "base64";
import { MapPlayer } from "../handles/player";
import { Timer } from "../handles/timer";
import { Trigger } from "../handles/trigger";
import { BinaryReader } from "./binaryreader";
import { BinaryWriter } from "./binarywriter";
import { getElapsedTime } from "./gametime";

const MAX_DATA_SIZE = 180;
const SYNC_TIMEOUT = 30; // seconds
const SYNC_PREFIX = "T";
const SYNC_PREFIX_CHUNK = "S";

export const enum SyncDataStatus {
  Syncing,
  Success,
  Timeout,
  NetworkError
}

export interface ISyncDataResponse {
  data: string;
  instance: SyncData;
  status: SyncDataStatus;
  time: number;
}

export interface ISyncDataOptions {
  timeout: number;
}

export type SyncDataCallback = (res: ISyncDataResponse) => void;

/**
 *
 */
export class SyncData {
  public readonly id: number;
  public onError?: SyncDataCallback;
  public onResponse?: SyncDataCallback;
  public readonly options: ISyncDataOptions;
  public readonly startTime: number;
  private chunks: string[] = [];
  private currentChunk = 0;
  private running: boolean = false;
  private status: SyncDataStatus;
  private timer = new Timer();
  public static cache: SyncData[] = [];
  private static counter = 0;
  private static defaultOptions: ISyncDataOptions = { timeout: SYNC_TIMEOUT };
  private static initialized = false;
  private static trig = new Trigger();

  constructor(from: MapPlayer, value: string, options = SyncData.defaultOptions) {
    // initialize
    this.id = SyncData.counter;
    this.options = options;
    SyncData.cache[this.id] = this;
    SyncData.counter++;
    SyncData.init();

    // start syncing
    this.currentChunk = 0;
    this.running = true;

    // attempt to send the data in a single packet
    if (value.length <= MAX_DATA_SIZE) {
      const writer = new BinaryWriter();
      writer.writeUInt16(this.id);
      writer.writeString(value);
      this.running = BlzSendSyncData(SYNC_PREFIX, base64Encode(writer.toString()));
    } else {
      // if the data is too long then send it over multiple packets
      const chunks = Math.ceil(value.length / MAX_DATA_SIZE);
      for (let i = 0; i < chunks; i++) {
        const writer = new BinaryWriter();
        writer.writeUInt16(this.id);
        writer.writeUInt16(chunks);
        writer.writeUInt16(i);
        writer.writeString(value.substr(i * MAX_DATA_SIZE, MAX_DATA_SIZE));
        this.running = this.running && BlzSendSyncData(SYNC_PREFIX_CHUNK, base64Encode(writer.toString()));
      }
    }

    this.startTime = getElapsedTime();
    this.status = SyncDataStatus.Syncing;

    // handle network errors
    if (this.running) {
      this.timer.start(this.options.timeout, false, () => {
        this.timer.destroy();
        if (this.onError && this.status === SyncDataStatus.Syncing) {
          this.onError({ instance: this, data: "Timeout", status: SyncDataStatus.Timeout, time: this.startTime });
        }
      });
    } else {
      const timer = new Timer().start(0, false, () => {
        timer.destroy();
        if (this.onError) {
          this.onError({ instance: this, data: "NetworkError", status: SyncDataStatus.NetworkError, time: this.startTime });
        }
      });
    }
  }

  /**
 *
 * @param callback
 */
  public catch(callback: SyncDataCallback) {
    this.onError = callback;
    return this;
  }

  /**
   *
   * @param callback
   */
  public then(callback: SyncDataCallback) {
    this.onResponse = callback;
    return this;
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
        this.trig.registerPlayerSyncEvent(p, SYNC_PREFIX, false);
        this.trig.registerPlayerSyncEvent(p, SYNC_PREFIX_CHUNK, false);
      }
    }
    this.trig.addAction(() => { this.onSync(); });
    this.initialized = true;
  }

  /**
   * Handler for all sync responses
   */
  private static onSync() {
    const isChunk = BlzGetTriggerSyncPrefix() === SYNC_PREFIX_CHUNK;
    const syncData = base64Decode(BlzGetTriggerSyncData());
    const reader = new BinaryReader(syncData);
    const id = reader.readUInt16();
    const chunks = isChunk ? reader.readUInt16() : 0;
    const chunk = isChunk ? reader.readUInt16() : 0;
    const value = reader.readString();
    const instance = SyncData.cache[id];

    if (!instance) {
      return;
    }

    instance.currentChunk++;
    instance.chunks[chunk] = value;

    if (instance.currentChunk >= chunks) {
      if (instance.running && instance.onResponse) {
        const data = instance.chunks.join("");
        const status = SyncDataStatus.Success;
        instance.status = status;
        instance.onResponse({ instance, data, status, time: getElapsedTime() });
      }
      instance.running = false;
    }
  }
}
