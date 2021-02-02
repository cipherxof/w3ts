/** @noSelfInFile **/

import { Handle } from "./handle";
import { Widget } from "./widget";

export class Destructable extends Widget {
  public readonly handle!: destructable;

  /**
   * Creates a destructable at the specified coordinates.
   * @param objectId The rawcode of the destructable to be created.
   * @param x The x-coordinate of the Destructable.
   * @param y The y-coordinate of the Destructable.
   * @param z The z-coordinate of the Destructable.
   * @param face The facing of the Destructable.
   * @param scale The X-Y-Z scaling value of the Destructable.
   * @param varation The integer representing the variation of the Destructable to be created.
   */
  constructor(objectId: number, x: number, y: number, z: number, face: number, scale: number, varation: number) {
    if (Handle.initFromHandle()) {
      super();
    } else {
      super(CreateDestructableZ(objectId, x, y, z, face, scale, varation));
    }
  }

  public set invulnerable(flag: boolean) {
    SetDestructableInvulnerable(this.handle, flag);
  }

  public get invulnerable() {
    return IsDestructableInvulnerable(this.handle);
  }

  public get life() {
    return GetDestructableLife(this.handle);
  }

  public set life(value: number) {
    SetDestructableLife(this.handle, value);
  }

  public get maxLife() {
    return GetDestructableMaxLife(this.handle);
  }

  public set maxLife(value: number) {
    SetDestructableMaxLife(this.handle, value);
  }

  /**
   * This will return different values depending on the locale.
   */
  public get name() {
    return GetDestructableName(this.handle);
  }

  public get occluderHeight() {
    return GetDestructableOccluderHeight(this.handle);
  }

  public set occluderHeight(value: number) {
    SetDestructableOccluderHeight(this.handle, value);
  }

  public get typeId() {
    return GetDestructableTypeId(this.handle);
  }

  public get x() {
    return GetDestructableX(this.handle);
  }

  public get y() {
    return GetDestructableY(this.handle);
  }

  public destroy() {
    RemoveDestructable(this.handle);
  }

  /**
   * Resurrects a Destructable with the specified hit points.
   * @param life The amount of hit points the Destructable will have when it is
   * resurrected. A value of 0, or any value above the Destructable's maximum HP,
   * will give the Destructable its maximum HP (as defined in the object editor).
   * Any value below 0.5 will give the Destructable 0.5 hit points.
   * @param birth If true, the Destructable will play its birth animation upon resurrection.
   */
  public heal(life: number, birth: boolean) {
    DestructableRestoreLife(this.handle, life, birth);
  }

  public kill() {
    KillDestructable(this.handle);
  }

  public queueAnim(whichAnimation: string) {
    QueueDestructableAnimation(this.handle, whichAnimation);
  }

  public setAnim(whichAnimation: string) {
    SetDestructableAnimation(this.handle, whichAnimation);
  }

  public setAnimSpeed(speedFactor: number) {
    SetDestructableAnimationSpeed(this.handle, speedFactor);
  }

  public show(flag: boolean) {
    ShowDestructable(this.handle, flag);
  }

  public static fromEvent() {
    return this.fromHandle(GetTriggerDestructable());
  }

  public static fromHandle(handle: destructable): Destructable {
    return this.getObject(handle);
  }
}
