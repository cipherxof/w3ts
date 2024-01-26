/** @noSelfInFile */

import { MapPlayer } from "../handles/index";
import { Timer } from "../handles/timer";
import { addInitHook } from "../hooks/index";
import { base64Decode, base64Encode } from "./base64";
import { BinaryReader } from "./binaryreader";
import { BinaryWriter } from "./binarywriter";
import { SyncRequest } from "./sync";

const lobbyTimes: number[] = [];
const hostCallbacks: Array<() => void> = [];
let localJoinTime = 0;
let localStartTime = 0;
let host: MapPlayer | undefined;
let checkTimer: Timer | undefined;
let isChecking = false;

export function onHostDetect(callback: () => void) {
  if (host) {
    callback();
  } else {
    hostCallbacks.push(callback);
  }
}

function onConfig() {
  if (localJoinTime === 0) {
    localJoinTime = os.clock();
  }
}

function findHost() {
  isChecking = true;

  if (localStartTime === 0) {
    localStartTime = os.clock();
  }

  // sync each players total game time
  const writer = new BinaryWriter();
  writer.writeFloat(localStartTime - localJoinTime);

  new SyncRequest(MapPlayer.fromLocal(), base64Encode(writer.toString()))
    .then((res, req) => {
      const data = base64Decode(res.data);
      const reader = new BinaryReader(data);
      const syncedTime = reader.readFloat();

      // store how long the player has been in the game
      const from = MapPlayer.fromEvent()!;
      lobbyTimes[from.id] = syncedTime;

      // check which player has been in the game the longest
      let hostTime = 0;
      let hostId = 0;

      for (let i = 0; i < bj_MAX_PLAYERS; i++) {
        const p = MapPlayer.fromIndex(i);

        // skip if the player is not playing
        if (
          p === undefined ||
          p.slotState !== PLAYER_SLOT_STATE_PLAYING ||
          p.controller !== MAP_CONTROL_USER
        ) {
          // eslint-disable-next-line no-continue
          continue;
        }

        // if a playing user has not yet finished syncing then terminate execution
        if (!lobbyTimes[p.id]) {
          return;
        }

        // store the host with the longest game time
        if (lobbyTimes[p.id] > hostTime) {
          hostTime = lobbyTimes[p.id];
          hostId = p.id;
        }
      }

      // set the host, cleanup, and execute callbacks
      host = MapPlayer.fromIndex(hostId);
      if (checkTimer) {
        checkTimer.destroy();
      }
      hostCallbacks.forEach((cb) => {
        cb();
      });
    })
    .catch((res) => {
      print(`findHost Error: ${res.status}`);
      isChecking = false;
    });
}

function onMain() {
  checkTimer = Timer.create();
  checkTimer.start(0.0, false, findHost);
}

addInitHook("main", onMain);
addInitHook("config", onConfig, true);
