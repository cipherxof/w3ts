/** @noSelfInFile */

import { Handle } from "./handle";
import { Point } from "./point";

export class Rectangle extends Handle<rect> {
  /**
   * @deprecated use `Rectangle.create` instead.
   */
  constructor(minX: number, minY: number, maxX: number, maxY: number) {
    if (Handle.initFromHandle()) {
      super();
      return;
    }
    const handle = Rect(minX, minY, maxX, maxY);
    if (handle === undefined) {
      error("w3ts failed to create rect handle.", 3);
    }
    super(handle);
  }

  public static create(
    minX: number,
    minY: number,
    maxX: number,
    maxY: number
  ): Rectangle {
    const handle = Rect(minX, minY, maxX, maxY);
    const obj = this.getObject(handle) as Rectangle;

    const values: Record<string, unknown> = {};
    values.handle = handle;

    return Object.assign(obj, values);
  }

  public get centerX() {
    return GetRectCenterX(this.handle);
  }

  public get centerY() {
    return GetRectCenterY(this.handle);
  }

  public get maxX() {
    return GetRectMaxX(this.handle);
  }

  public get maxY() {
    return GetRectMaxY(this.handle);
  }

  public get minX() {
    return GetRectMinX(this.handle);
  }

  public get minY() {
    return GetRectMinY(this.handle);
  }

  public destroy() {
    RemoveRect(this.handle);
  }

  public enumDestructables(
    filter: boolexpr | (() => boolean),
    actionFunc: () => void
  ) {
    EnumDestructablesInRect(
      this.handle,
      typeof filter === "function" ? Filter(filter) : filter,
      actionFunc
    );
  }

  public enumItems(filter: boolexpr | (() => boolean), actionFunc: () => void) {
    EnumItemsInRect(
      this.handle,
      typeof filter === "function" ? Filter(filter) : filter,
      actionFunc
    );
  }

  public move(newCenterX: number, newCenterY: number) {
    MoveRectTo(this.handle, newCenterX, newCenterY);
  }

  public movePoint(newCenterPoint: Point) {
    MoveRectToLoc(this.handle, newCenterPoint.handle);
  }

  public setRect(minX: number, minY: number, maxX: number, maxY: number) {
    SetRect(this.handle, minX, minY, maxX, maxY);
  }

  public setRectFromPoint(min: Point, max: Point) {
    SetRectFromLoc(this.handle, min.handle, max.handle);
  }

  public static fromHandle(handle: rect | undefined): Rectangle | undefined {
    return handle ? this.getObject(handle) : undefined;
  }

  public static fromPoint(min: Point, max: Point) {
    return this.fromHandle(RectFromLoc(min.handle, max.handle));
  }

  // Returns full map bounds, including unplayable borders, in world coordinates
  public static getWorldBounds() {
    return Rectangle.fromHandle(GetWorldBounds());
  }
}
