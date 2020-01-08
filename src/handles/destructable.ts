/** @noSelfInFile **/

import { Handle } from "./handle";

export class Destructable extends Handle<destructable> {

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

  public get visible() {
    return this.isVisible;
  }

  public set visible(flag: boolean) {
    this.isVisible = flag;
    ShowDestructable(this.handle, flag);
  }

  public get x() {
    return GetDestructableX(this.handle);
  }

  public get y() {
    return GetDestructableY(this.handle);
  }

  private isVisible = false;

  constructor(objectId: number, x: number, y: number, z: number, face: number, scale: number, varation: number) {
    super(CreateDestructableZ, [objectId, x, y, z, face, scale, varation]);
  }

  public destroy() {
    RemoveDestructable(this.handle);
  }

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

  public static fromEvent() {
    return this.fromHandle(GetTriggerDestructable());
  }

  public static fromHandle(handle: destructable): Destructable {
    return this.get(handle);
  }

}
