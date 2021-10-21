/** @noSelfInFile */

import { Handle } from "./handle";

export class Widget extends Handle<widget> {
  /**
   * Get the Widget's life.
   */
  public get life() {
    return GetWidgetLife(this.handle);
  }

  /**
   * Set the Widget's life.
   */
  public set life(value: number) {
    SetWidgetLife(this.handle, value);
  }

  /**
   * Get the Widget's x-coordinate
   */
  public get x() {
    return GetWidgetX(this.handle);
  }

  /**
   * Get the Widget's y-coordinate
   */
  public get y() {
    return GetWidgetY(this.handle);
  }

  public static fromEvent() {
    return this.fromHandle(GetTriggerWidget());
  }

  public static fromHandle(handle: widget | undefined): Widget | undefined {
    return handle ? this.getObject(handle) : undefined;
  }
}
