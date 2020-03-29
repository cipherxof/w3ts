/** @noSelfInFile **/

import { Handle } from "./handle";

export class Widget extends Handle<widget> {

  public get life() {
    return GetWidgetLife(this.handle);
  }

  public set life(value: number) {
    SetWidgetLife(this.handle, value);
  }

  public get x() {
    return GetWidgetX(this.handle);
  }

  public get y() {
    return GetWidgetY(this.handle);
  }

  public static fromEvent() {
    return this.fromHandle(GetTriggerWidget());
  }

  public static fromHandle(handle: widget): Widget {
    return this.getObject(handle);
  }

}
