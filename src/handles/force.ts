/** @noSelfInFile **/

import { Handle } from "./handle";
import { MapPlayer } from "./player";

export class Force extends Handle<force> {

  constructor() {
    super(CreateForce, []);
  }

  public destroy() {
    DestroyForce(this.handle);
  }

  public addPlayer(whichPlayer: MapPlayer) {
    ForceAddPlayer(this.handle, whichPlayer.handle);
  }

  public removePlayer(whichPlayer: MapPlayer) {
    ForceRemovePlayer(this.handle, whichPlayer.handle);
  }

  public hasPlayer(whichPlayer: MapPlayer) {
    return IsPlayerInForce(whichPlayer.handle, this.handle);
  }

  public clear() {
    ForceClear(this.handle);
  }

  public enumPlayers(filter: boolexpr) {
    ForceEnumPlayers(this.handle, filter);
  }

  public enumPlayersCounted(filter: boolexpr, countLimit: number) {
    ForceEnumPlayersCounted(this.handle, filter, countLimit);
  }

  public enumAllies(whichPlayer: MapPlayer, filter: boolexpr) {
    ForceEnumAllies(this.handle, whichPlayer.handle, filter);
  }

  public enumEnemies(whichPlayer: MapPlayer, filter: boolexpr) {
    ForceEnumEnemies(this.handle, whichPlayer.handle, filter);
  }

  public for(callback: () => void) {
    ForForce(this.handle, callback);
  }

}
