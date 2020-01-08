/** @noSelfInFile **/

import { Handle } from "./handle";

export class Widget extends Handle<widget> {

  public get life() {
    return GetWidgetLife(this.handle);
  }

  public set life(value: number) {
    SetWidgetLife(this.handle, value);
  }

  private constructor() {
    super();
  }

  public getX() {
    return GetWidgetX(this.handle);
  }

  public getY() {
    return GetWidgetY(this.handle);
  }

  public static fromEvent() {
    return this.fromHandle(GetTriggerWidget());
  }

  public static fromHandle(handle: widget): Widget {
    return this.get(handle);
  }

}
