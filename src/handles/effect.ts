/** @noSelfInFile **/

import { Handle } from "./handle";
import { MapPlayer } from "./player";
import { Point } from "./point";
import { Widget } from "./widget";

export class Effect extends Handle<effect> {

  constructor(modelName: string, x: number, y: number);
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

  public set alpha(a: number) {
    BlzSetSpecialEffectAlpha(this.handle, a);
  }

  public set height(h: number) {
    BlzSetSpecialEffectHeight(this.handle, h);
  }

  public set pitch(p: number) {
    BlzSetSpecialEffectPitch(this.handle, p);
  }

  public set roll(r: number) {
    BlzSetSpecialEffectRoll(this.handle, r);
  }

  public get scale() {
    return BlzGetSpecialEffectScale(this.handle);
  }

  public set scale(s: number) {
    BlzSetSpecialEffectScale(this.handle, s);
  }

  public set time(t: number) {
    BlzSetSpecialEffectTime(this.handle, t);
  }

  public set timeScale(ts: number) {
    BlzSetSpecialEffectTimeScale(this.handle, ts);
  }

  public get x() {
    return BlzGetLocalSpecialEffectX(this.handle);
  }

  public set x(x: number) {
    BlzSetSpecialEffectX(this.handle, x);
  }

  public get y() {
    return BlzGetLocalSpecialEffectY(this.handle);
  }

  public set y(y: number) {
    BlzSetSpecialEffectY(this.handle, y);
  }

  public set yaw(y: number) {
    BlzSetSpecialEffectYaw(this.handle, y);
  }

  public get z() {
    return BlzGetLocalSpecialEffectZ(this.handle);
  }

  public set z(z: number) {
    BlzSetSpecialEffectZ(this.handle, z);
  }

  public addSubAnimation(anim: subanimtype) {
    BlzSpecialEffectAddSubAnimation(this.handle, anim);
  }

  public clearSubAnimations() {
    BlzSpecialEffectClearSubAnimations(this.handle);
  }

  public destroy() {
    DestroyEffect(this.handle);
  }

  public playAnimation(anim: animtype) {
    BlzPlaySpecialEffect(this.handle, anim);
  }

  public playWithTimeScale(anim: animtype, timeScale: number) {
    BlzPlaySpecialEffectWithTimeScale(this.handle, anim, timeScale);
  }

  public removeSubAnimation(anim: subanimtype) {
    BlzSpecialEffectRemoveSubAnimation(this.handle, anim);
  }

  public resetScaleMatrix() {
    BlzResetSpecialEffectMatrix(this.handle);
  }

  public setColor(red: number, green: number, blue: number) {
    BlzSetSpecialEffectColor(this.handle, red, green, blue);
  }

  public setColorByPlayer(whichPlayer: MapPlayer | number) {
    BlzSetSpecialEffectColorByPlayer(this.handle, typeof whichPlayer === "number" ? Player(whichPlayer) : whichPlayer.handle);
  }

  public setOrientation(yaw: number, pitch: number, roll: number) {
    BlzSetSpecialEffectOrientation(this.handle, yaw, pitch, roll);
  }

  public setPosition(x: number, y: number, z: number) {
    BlzSetSpecialEffectPosition(this.handle, x, y, z);
  }

  public setPositionLoc(p: Point) {
    BlzSetSpecialEffectPositionLoc(this.handle, p.handle);
  }

  public setScaleMatrix(x: number, y: number, z: number) {
    BlzSetSpecialEffectMatrixScale(this.handle, x, y, z);
  }

  public static fromHandle(handle: effect): Effect {
    return this.getObject(handle);
  }
}
