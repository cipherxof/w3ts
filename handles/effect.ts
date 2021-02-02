/** @noSelfInFile **/

import { Handle } from "./handle";
import { MapPlayer } from "./player";
import { Point } from "./point";
import { Widget } from "./widget";

export class Effect extends Handle<effect> {
  /**
   * Creates a special effect.
   * @param modelName The path of the model that the effect will use.
   * @param x
   * @param y
   */
  constructor(modelName: string, x: number, y: number);
  /**
   * Creates a special effect attached to a widget.
   * @param modelName The path of the model that the effect will use.
   * @param targetWidget The widget to attach the effect to.
   * @param attachPointName The attachment point of the widget where the effect will
   * be placed. Attachment points are points in a model that can be referenced to as
   * areas for effects to be attached, whether it be from a spell or this function.
   * If the attachment point does not exist, it will attach the effect to the model's origin.
   */
  constructor(modelName: string, targetWidget: Widget, attachPointName: string);
  constructor(modelName: string, a: number | Widget, b: number | string) {
    if (Handle.initFromHandle()) {
      super();
    } else if (typeof a === "number" && typeof b === "number") {
      super(AddSpecialEffect(modelName, a, b));
    } else if (typeof a !== "number" && typeof b === "string") {
      super(AddSpecialEffectTarget(modelName, a.handle, b));
    }
  }

  public get scale() {
    return BlzGetSpecialEffectScale(this.handle);
  }

  public set scale(scale: number) {
    BlzSetSpecialEffectScale(this.handle, scale);
  }

  /**
   * Warning: asynchronous
   */
  public get x() {
    return BlzGetLocalSpecialEffectX(this.handle);
  }

  public set x(x: number) {
    BlzSetSpecialEffectX(this.handle, x);
  }

  /**
   * Warning: asynchronous
   */
  public get y() {
    return BlzGetLocalSpecialEffectY(this.handle);
  }

  public set y(y: number) {
    BlzSetSpecialEffectY(this.handle, y);
  }

  /**
   * Warning: asynchronous
   */
  public get z() {
    return BlzGetLocalSpecialEffectZ(this.handle);
  }

  public set z(z: number) {
    BlzSetSpecialEffectZ(this.handle, z);
  }

  public addSubAnimation(subAnim: subanimtype) {
    BlzSpecialEffectAddSubAnimation(this.handle, subAnim);
  }

  public clearSubAnimations() {
    BlzSpecialEffectClearSubAnimations(this.handle);
  }

  /**
   * Destroy the effect handle. This will play the effect's death animation.
   */
  public destroy() {
    DestroyEffect(this.handle);
  }

  public playAnimation(animType: animtype) {
    BlzPlaySpecialEffect(this.handle, animType);
  }

  public playWithTimeScale(animType: animtype, timeScale: number) {
    BlzPlaySpecialEffectWithTimeScale(this.handle, animType, timeScale);
  }

  public removeSubAnimation(subAnim: subanimtype) {
    BlzSpecialEffectRemoveSubAnimation(this.handle, subAnim);
  }

  public resetScaleMatrix() {
    BlzResetSpecialEffectMatrix(this.handle);
  }

  public setAlpha(alpha: number) {
    BlzSetSpecialEffectAlpha(this.handle, alpha);
  }

  public setColor(red: number, green: number, blue: number) {
    BlzSetSpecialEffectColor(this.handle, red, green, blue);
  }

  public setColorByPlayer(whichPlayer: MapPlayer) {
    BlzSetSpecialEffectColorByPlayer(this.handle, whichPlayer.handle);
  }

  public setHeight(height: number) {
    BlzSetSpecialEffectHeight(this.handle, height);
  }

  public setOrientation(yaw: number, pitch: number, roll: number) {
    BlzSetSpecialEffectOrientation(this.handle, yaw, pitch, roll);
  }

  public setPitch(pitch: number) {
    BlzSetSpecialEffectPitch(this.handle, pitch);
  }

  public setPoint(p: Point) {
    BlzSetSpecialEffectPositionLoc(this.handle, p.handle);
  }

  public setPosition(x: number, y: number, z: number) {
    BlzSetSpecialEffectPosition(this.handle, x, y, z);
  }

  public setRoll(roll: number) {
    BlzSetSpecialEffectRoll(this.handle, roll);
  }

  public setScaleMatrix(x: number, y: number, z: number) {
    BlzSetSpecialEffectMatrixScale(this.handle, x, y, z);
  }

  public setTime(value: number) {
    BlzSetSpecialEffectTime(this.handle, value);
  }

  public setTimeScale(timeScale: number) {
    BlzSetSpecialEffectTimeScale(this.handle, timeScale);
  }

  public setYaw(y: number) {
    BlzSetSpecialEffectYaw(this.handle, y);
  }

  public static fromHandle(handle: effect): Effect {
    return this.getObject(handle);
  }
}
