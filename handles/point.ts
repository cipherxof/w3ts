/** @noSelfInFile **/

import { Handle } from "./handle";

export class Point extends Handle<location> {

  constructor(x: number, y: number) {
    if (Handle.initFromHandle()) {
      super();
    } else {
      super(Location(x, y));
    }
  }

  public get x(): number {
    return GetLocationX(this.handle);
  }

  public set x(value: number) {
    MoveLocation(this.handle, value, this.y);
  }

  public get y(): number {
    return GetLocationY(this.handle);
  }

  public set y(value: number) {
    MoveLocation(this.handle, this.x, value);
  }

  /**
   * This function is asynchronous. The values it returns are not guaranteed synchronous between each player.
   * If you attempt to use it in a synchronous manner, it may cause a desync.
   */
  public get z(): number {
    return GetLocationZ(this.handle);
  }

  public destroy() {
    RemoveLocation(this.handle);
  }

  public setPosition(x: number, y: number) {
    MoveLocation(this.handle, x, y);
  }

  public static fromHandle(handle: location): Point {
    return this.getObject(handle);
  }

}
