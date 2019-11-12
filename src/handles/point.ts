/** @noSelfInFile **/

import { Handle } from "./handle";

export class Point extends Handle<location> {

  constructor();
  constructor(x: number, y: number);
  constructor(x?: number, y?: number) {
    super(Location, [x, y]);
  }

  static fromHandle(handle: location): Point {
    this.setDefaultHandle(handle);
    return new Point();
  }

  public setPosition(x: number, y: number) {
    MoveLocation(this.handle, x, y);
  }

  public destroy() {
    RemoveLocation(this.handle);
  }

  public get x(): number {
    return GetLocationX(this.handle);
  }

  public get y(): number {
    return GetLocationY(this.handle);
  }

  // This function is asynchronous. The values it returns are not guaranteed synchronous between each player.
  // If you attempt to use it in a synchronous manner, it may cause a desync.
  public get z(): number {
    return GetLocationZ(this.handle);
  }

  public set x(value: number) {
    MoveLocation(this.handle, value, this.y);
  }

  public set y(value: number) {
    MoveLocation(this.handle, this.x, value);
  }

}
