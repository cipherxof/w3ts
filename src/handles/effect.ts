/** @noSelfInFile **/

import { Handle } from "./handle";
import { MapPlayer } from "./player";
import { Point } from "./point";

export class Effect extends Handle<effect> {

  constructor(m: string, s: number | widget, t: number | string) {
    if (typeof s == "number" && typeof t == "number") {
      super(AddSpecialEffect, [m, s, t]);
    // TODO: Find a better solution, if possible.
    } else {
      super(AddSpecialEffectTarget, [m, s, t]);
    }
  }

  public destroy() {
    DestroyEffect(this.handle);
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

  public get z() {
    return BlzGetLocalSpecialEffectZ(this.handle);
  }

  public set z(z: number) {
    BlzSetSpecialEffectZ(this.handle, z);
  }

  public setPosition(x: number, y: number, z: number) {
    BlzSetSpecialEffectPosition(this.handle, x, y, z);
  }

  public setPositionLoc(p: Point) {
    BlzSetSpecialEffectPositionLoc(this.handle, p.handle);
  }

  public setOrientation(yaw: number, pitch: number, roll: number) {
    BlzSetSpecialEffectOrientation(this.handle, yaw, pitch, roll);
  }

  public set yaw(y: number) {
    BlzSetSpecialEffectYaw(this.handle, y);
  }

  public set pitch(p: number) {
    BlzSetSpecialEffectPitch(this.handle, p);
  }

  public set roll(r: number) {
    BlzSetSpecialEffectRoll(this.handle, r);
  }

  public set alpha(a: number) {
    BlzSetSpecialEffectAlpha(this.handle, a);
  }

  public set height(h: number) {
    BlzSetSpecialEffectHeight(this.handle, h);
  }

  public set timeScale(ts: number) {
    BlzSetSpecialEffectTimeScale(this.handle, ts);
  }

  public set time(t: number) {
    BlzSetSpecialEffectTime(this.handle, t);
  }

  public get scale() {
    return BlzGetSpecialEffectScale(this.handle);
  }

  public set scale(s: number) {
    BlzSetSpecialEffectScale(this.handle, s);
  }

  public setScaleMatrix(x: number, y: number, z: number) {
    BlzSetSpecialEffectMatrixScale(this.handle, x, y, z);
  }

  public resetScaleMatrix() {
    BlzResetSpecialEffectMatrix(this.handle);
  }

  public playAnimation(anim: animtype) {
    BlzPlaySpecialEffect(this.handle, anim);
  }

  public playWithTimeScale(anim: animtype, timeScale: number) {
    BlzPlaySpecialEffectWithTimeScale(this.handle, anim, timeScale);
  }

  public setColorByPlayer(whichPlayer: MapPlayer | number) {
    BlzSetSpecialEffectColorByPlayer(this.handle, typeof whichPlayer === "number" ? Player(whichPlayer) : whichPlayer.handle);
  }

  public setColor(red: number, green: number, blue: number) {
    BlzSetSpecialEffectColor(this.handle, red, green, blue);
  }

  public addSubAnimation(anim: subanimtype) {
    BlzSpecialEffectAddSubAnimation(this.handle, anim);
  }

  public removeSubAnimation(anim: subanimtype) {
    BlzSpecialEffectRemoveSubAnimation(this.handle, anim);
  }

  public clearSubAnimations() {
    BlzSpecialEffectClearSubAnimations(this.handle);
  }

  public static fromHandle(handle: effect): Effect {
    return this.get(handle);
  }
}
