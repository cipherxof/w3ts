/** @noSelfInFile **/

import { Handle } from "./handle";

export class Destructable extends Handle<destructable> {

  private _visible = false;

  constructor(objectId: number, x: number, y: number, z: number, face: number, scale: number, varation: number) {
    super(CreateDestructableZ, [objectId, x, y, z, face, scale, varation]);
  }

  public static fromHandle(handle: destructable): Destructable {
    this.setDefaultHandle(handle);
    return new Destructable(0, 0, 0, 0, 0, 0, 0);
  }

  public static fromTrigger() {
    return this.fromHandle(GetTriggerDestructable());
  }

  public destroy() {
    RemoveDestructable(this.handle);
  }

  public kill() {
    KillDestructable(this.handle);
  }

  public set invulnerable(flag: boolean) {
    SetDestructableInvulnerable(this.handle, true);
  }

  public get invulnerable() {
    return IsDestructableInvulnerable(this.handle);
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

  public heal(life: number, birth: boolean) {
    DestructableRestoreLife(this.handle, life, birth)
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

  public get visible() {
    return this._visible;
  }

  public set visible(flag: boolean) {
    this._visible = flag;
    ShowDestructable(this.handle, flag);
  }

  public get occluderHeight() {
    return GetDestructableOccluderHeight(this.handle);
  }

  public set occluderHeight(value: number) {
    SetDestructableOccluderHeight(this.handle, value);
  }

  public get name() {
    return GetDestructableName(this.handle);
  }

}
