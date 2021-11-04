/** @noSelfInFile * */

import { Handle } from "./handle";
import { MapPlayer } from "./player";

export class Force extends Handle<force> {
  /**
   * @deprecated use `Force.create` instead.
   */
  constructor() {
    if (Handle.initFromHandle()) {
      super();
      return;
    }

    const handle = CreateForce();

    if (handle === undefined) {
      error("w3ts failed to create force handle.", 3);
    }

    super(handle);
  }

  public static create(): Force | undefined {
    const handle = CreateForce();

    if (handle) {
      const obj = this.getObject(handle) as Force;

      const values: Record<string, unknown> = {};
      values.handle = handle;

      return Object.assign(obj, values);
    }
    return undefined;
  }

  public addPlayer(whichPlayer: MapPlayer) {
    ForceAddPlayer(this.handle, whichPlayer.handle);
  }

  public clear() {
    ForceClear(this.handle);
  }

  public destroy() {
    DestroyForce(this.handle);
  }

  public enumAllies(
    whichPlayer: MapPlayer,
    filter: boolexpr | (() => boolean)
  ) {
    ForceEnumAllies(
      this.handle,
      whichPlayer.handle,
      typeof filter === "function" ? Filter(filter) : filter
    );
  }

  public enumEnemies(
    whichPlayer: MapPlayer,
    filter: boolexpr | (() => boolean)
  ) {
    ForceEnumEnemies(
      this.handle,
      whichPlayer.handle,
      typeof filter === "function" ? Filter(filter) : filter
    );
  }

  public enumPlayers(filter: boolexpr | (() => boolean)) {
    ForceEnumPlayers(
      this.handle,
      typeof filter === "function" ? Filter(filter) : filter
    );
  }

  public enumPlayersCounted(
    filter: boolexpr | (() => boolean),
    countLimit: number
  ) {
    ForceEnumPlayersCounted(
      this.handle,
      typeof filter === "function" ? Filter(filter) : filter,
      countLimit
    );
  }

  public for(callback: () => void) {
    ForForce(this.handle, callback);
  }

  /**
   * Returns all player handles belonging to this force
   */
  public getPlayers() {
    const players: MapPlayer[] = [];

    ForForce(this.handle, () => {
      const pl = MapPlayer.fromEnum();
      if (pl) {
        players.push(pl);
      }
    });

    return players;
  }

  public hasPlayer(whichPlayer: MapPlayer) {
    return IsPlayerInForce(whichPlayer.handle, this.handle);
  }

  public removePlayer(whichPlayer: MapPlayer) {
    ForceRemovePlayer(this.handle, whichPlayer.handle);
  }

  public static fromPlayer(whichPlayer: MapPlayer) {
    return this.fromHandle(GetForceOfPlayer(whichPlayer.handle));
  }

  public static fromHandle(handle: force | undefined): Force | undefined {
    return handle ? this.getObject(handle) : undefined;
  }
}
