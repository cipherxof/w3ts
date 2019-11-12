import { MapPlayer } from "./player";

export const Players: MapPlayer[] = [];

for (let i = 0; i < bj_MAX_PLAYERS; i++) {
  Players[i] = MapPlayer.fromHandle(Player(i));
}
