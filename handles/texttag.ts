/** @noSelfInFile **/

import { Handle } from "./handle";
import { Unit } from "./unit";

export class TextTag extends Handle<texttag> {

  constructor() {
    if (Handle.initFromHandle()) {
      super();
    } else {
      super(CreateTextTag());
    }
  }

  public destroy() {
    DestroyTextTag(this.handle);
  }

  public setAge(age: number) {
    SetTextTagAge(this.handle, age);
  }

  public setColor(red: number, green: number, blue: number, alpha: number) {
    SetTextTagColor(this.handle, red, green, blue, alpha);
  }

  public setFadepoint(fadepoint: number) {
    SetTextTagFadepoint(this.handle, fadepoint);
  }

  public setLifespan(lifespan: number) {
    SetTextTagLifespan(this.handle, lifespan);
  }

  public setPermanent(flag: boolean) {
    SetTextTagPermanent(this.handle, flag);
  }

  public setPos(x: number, y: number, heightOffset: number) {
    SetTextTagPos(this.handle, x, y, heightOffset);
  }

  public setPosUnit(u: Unit, heightOffset: number) {
    SetTextTagPosUnit(this.handle, u.handle, heightOffset);
  }

  public setSuspended(flag: boolean) {
    SetTextTagSuspended(this.handle, flag);
  }

  public setText(s: string, height: number, adjustHeight = false) {
    if (adjustHeight) {
      height = height * 0.0023;
    }
    SetTextTagText(this.handle, s, height);
  }

  public setVelocity(xvel: number, yvel: number) {
    SetTextTagVelocity(this.handle, xvel, yvel);
  }

  public setVelocityAngle(speed: number, angle: number) {
    const vel = speed * 0.071 / 128;
    this.setVelocity(vel * Cos(angle * bj_DEGTORAD), vel * Sin(angle * bj_DEGTORAD));
  }

  public setVisible(flag: boolean) {
    SetTextTagVisibility(this.handle, flag);
  }

  public static fromHandle(handle: texttag): TextTag {
    return this.getObject(handle);
  }

}
