/** @noSelfInFile **/

import { Handle } from "./handle";

export class Widget extends Handle<widget> {

  private constructor() {
    super(() => { }, []);
  }

  public get life() {
    return GetWidgetLife(this.handle);
  }

  public set life(value: number) {
    SetWidgetLife(this.handle, value);
  }

  public getX() {
    return GetWidgetX(this.handle);
  }

  public getY() {
    return GetWidgetY(this.handle);
  }

  public static fromTrigger() {
    return Widget.fromHandle(GetTriggerWidget());
  }

}
