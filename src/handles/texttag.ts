/** @noSelfInFile **/

import { Handle } from "./handle";
import { Unit } from "./unit";

export class Texttag extends Handle<texttag> {

  constructor() {
    super(Handle.initFromHandle() ? undefined : CreateTextTag());
  }

  public destroy() {
    DestroyTextTag(this.handle);
  }

  public setText(t: string, h: number,) {
    SetTextTagText(this.handle, t, h);
  }

  public setTextNew(t: string, s: number) {
    this.setText(t, s * 0.0023);
  }

  public setPos(x: number, y: number, ho: number) {
    SetTextTagPos(this.handle, x, y, ho);
  }

  public setPosUnit(u: Unit, ho: number) {
    SetTextTagPosUnit(this.handle, u.handle, ho);
  }
  
  public setColor(red: number, green: number, blue: number, alpha: number) {
    SetTextTagColor(this.handle, red, green, blue, alpha);
  }

  public setVelocity(xvel: number, yvel: number) {
    SetTextTagVelocity(this.handle, xvel, yvel);
  }

  public setVelocityNew(size: number, angle: number) {
    let vel = size * 0.071 / 128;
    this.setVelocity(vel * Cos(angle * bj_DEGTORAD), vel * Sin(angle * bj_DEGTORAD));
  }

  public set visible(flag: boolean) {
    SetTextTagVisibility(this.handle, flag);
  }
  
  public set suspended(flag: boolean) {
    SetTextTagSuspended(this.handle, flag);
  }

  public set permanent(flag: boolean) {
    SetTextTagPermanent(this.handle, flag);
  }
  
  public set age(age: number) {
    SetTextTagAge(this.handle, age);
  }

  public set lifespan(ls: number) {
    SetTextTagLifespan(this.handle, ls);
  }

  public set fadepoint(fp: number) {
    SetTextTagFadepoint(this.handle, fp);
  }

  public static fromHandle(handle: texttag): Texttag {
    return this.getObject(handle);
  }

}
