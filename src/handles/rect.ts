/** @noSelfInFile **/

import { Handle } from "./handle";
import { Point } from "./point";

export class Rectangle extends Handle<rect> {

  constructor(minX: number, minY: number, maxX: number, maxY: number) {
    super(Rect, [minX, minY, maxX, maxY]);
  }

  public destroy() {
    RemoveRect(this.handle);
  }

  public setRect(minX: number, minY: number, maxX: number, maxY: number) {
    SetRect(this.handle, minX, minY, maxX, maxY);
  }

  public setRectFromPoint(min: Point, max: Point) {
    SetRectFromLoc(this.handle, min.handle, max.handle);
  }

  public move(newCenterX: number, newCenterY: number) {
    MoveRectTo(this.handle, newCenterX, newCenterY);
  }

  public movePoint(newCenterPoint: Point) {
    MoveRectToLoc(this.handle, newCenterPoint.handle);
  }

  public get centerX() {
    return GetRectCenterX(this.handle);
  }

  public get centerY() {
    return GetRectCenterY(this.handle);
  }

  public get minX() {
    return GetRectMinX(this.handle);
  }

  public get minY() {
    return GetRectMinY(this.handle);
  }

  public get maxX() {
    return GetRectMaxX(this.handle);
  }

  public get maxY() {
    return GetRectMaxY(this.handle);
  }

  // Returns full map bounds, including unplayable borders, in world coordinates
  public getWorldBounds() {
    return Rectangle.fromHandle(GetWorldBounds());
  }

  public enumDestructables(filter: boolexpr, actionFunc: () => void) {
    EnumDestructablesInRect(this.handle, filter, actionFunc);
  }

  public enumItems(filter: boolexpr, actionFunc: () => void) {
    EnumItemsInRect(this.handle, filter, actionFunc);
  }

  public static fromHandle(handle: rect): Rectangle {
    return this.get(handle);
  }

  public static fromPoint(min: Point, max: Point) {
    return this.fromHandle(RectFromLoc(min.handle, max.handle));
  }

}
