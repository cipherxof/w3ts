import { MapPlayer } from "../handles/player";

export * from "./order";
export const Players = Array.from(
  { length: bj_MAX_PLAYER_SLOTS },
  (_, i) => MapPlayer.fromHandle(Player(i)!)!
);
