/** @noSelfInFile **/

import { Handle } from "./handle";
import { MapPlayer } from "./player";
import { Point } from "./point";

export class Effect extends Handle<effect> {

  constructor(m: string, s: number | widget, t: number | string) {
    if (typeof s == "number" && typeof t == "number") {
      super(AddSpecialEffect, [m, s, t]);
    // TODO
    // } else if (typeof s == "widget" && typeof t == "string") {
    } else {
      super(AddSpecialEffectTarget, [m, s, t]);
    }
  }

  public destroy() {
    DestroyEffect(this.handle);
  }

  // native BlzGetLocalSpecialEffectX                   takes effect whichEffect returns real
  // native BlzGetLocalSpecialEffectY                   takes effect whichEffect returns real
  // native BlzGetLocalSpecialEffectZ                   takes effect whichEffect returns real
  // native BlzSetSpecialEffectX                        takes effect whichEffect, real x returns nothing
  // native BlzSetSpecialEffectY                        takes effect whichEffect, real y returns nothing
  // native BlzSetSpecialEffectZ                        takes effect whichEffect, real z returns nothing
  // native BlzSetSpecialEffectPosition                 takes effect whichEffect, real x, real y, real z returns nothing
  // native BlzSetSpecialEffectPositionLoc              takes effect whichEffect, location loc returns nothing
 
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

  // native BlzSetSpecialEffectOrientation              takes effect whichEffect, real yaw, real pitch, real roll returns nothing
  // native BlzSetSpecialEffectYaw                      takes effect whichEffect, real yaw returns nothing
  // native BlzSetSpecialEffectPitch                    takes effect whichEffect, real pitch returns nothing
  // native BlzSetSpecialEffectRoll                     takes effect whichEffect, real roll returns nothing

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

  // native BlzSetSpecialEffectAlpha                    takes effect whichEffect, integer alpha returns nothing
  // native BlzSetSpecialEffectScale                    takes effect whichEffect, real scale returns nothing
  // native BlzSetSpecialEffectHeight                   takes effect whichEffect, real height returns nothing
  // native BlzSetSpecialEffectTimeScale                takes effect whichEffect, real timeScale returns nothing
  // native BlzSetSpecialEffectTime                     takes effect whichEffect, real time returns nothing
  // native BlzGetSpecialEffectScale                    takes effect whichEffect returns real
  // native BlzSetSpecialEffectMatrixScale              takes effect whichEffect, real x, real y, real z returns nothing
  // native BlzResetSpecialEffectMatrix                 takes effect whichEffect returns nothing

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
  
  // TODO

  // native BlzPlaySpecialEffect                        takes effect whichEffect, animtype whichAnim returns nothing
  // native BlzPlaySpecialEffectWithTimeScale           takes effect whichEffect, animtype whichAnim, real timeScale returns nothing

  // native BlzSetSpecialEffectColorByPlayer            takes effect whichEffect, player whichPlayer returns nothing
  // native BlzSetSpecialEffectColor                    takes effect whichEffect, integer r, integer g, integer b returns nothing
  // native BlzSpecialEffectClearSubAnimations          takes effect whichEffect returns nothing
  // native BlzSpecialEffectRemoveSubAnimation          takes effect whichEffect, subanimtype whichSubAnim returns nothing
  // native BlzSpecialEffectAddSubAnimation             takes effect whichEffect, subanimtype whichSubAnim returns nothing

  public setColorByPlayer(whichPlayer: MapPlayer | number) {
    BlzSetSpecialEffectColorByPlayer(this.handle, typeof whichPlayer === "number" ? Player(whichPlayer) : whichPlayer.handle);
  }

  public setColor(red: number, green: number, blue: number) {
    BlzSetSpecialEffectColor(this.handle, red, green, blue)
  }

  public static fromHandle(handle: effect): Effect {
    return this.get(handle);
  }
}
