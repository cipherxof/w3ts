/** @noSelfInFile */

import { Handle } from "./handle";
import { MapPlayer } from "./player";
import { Point } from "./point";
import { Widget } from "./widget";

export class Effect extends Handle<effect> {
  public readonly attachWidget?: Widget;

  public readonly attachPointName?: string;

  /**
   * @deprecated use `Effect.create` or `Effect.createAttachment` instead.
   * @param modelName The path of the model that the effect will use.
   * @param x
   * @param y
   */
  constructor(modelName: string, x: number, y: number);

  /**
   * @deprecated use `Effect.create` or `Effect.createAttachment` instead.
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
      return;
    }

    let handle: effect | undefined;

    if (typeof a === "number" && typeof b === "number") {
      handle = AddSpecialEffect(modelName, a, b);
    } else if (typeof a !== "number" && typeof b === "string") {
      handle = AddSpecialEffectTarget(modelName, a.handle, b);
    }

    if (handle === undefined) {
      error("w3ts failed to create effect handle.", 3);
    }

    super(handle);

    if (typeof a !== "number" && typeof b === "string") {
      this.attachWidget = a;
      this.attachPointName = b;
    }
  }

  /**
   * Creates a special effect.
   * @param modelName The path of the model that the effect will use.
   * @param x
   * @param y
   */
  public static create(
    modelName: string,
    x: number,
    y: number
  ): Effect | undefined {
    const handle = AddSpecialEffect(modelName, x, y);
    if (handle) {
      const obj = this.getObject(handle) as Effect;

      const values: Record<string, unknown> = {};
      values.handle = handle;

      return Object.assign(obj, values);
    }

    return undefined;
  }

  /**
   * Creates a special effect attached to a widget.
   * @param modelName The path of the model that the effect will use.
   * @param targetWidget The widget to attach the effect to.
   * @param attachPointName The attachment point of the widget where the effect will
   * be placed. Attachment points are points in a model that can be referenced to as
   * areas for effects to be attached, whether it be from a spell or this function.
   * If the attachment point does not exist, it will attach the effect to the model's origin.
   */
  public static createAttachment(
    modelName: string,
    targetWidget: Widget,
    attachPointName: string
  ): Effect | undefined {
    const handle = AddSpecialEffectTarget(
      modelName,
      targetWidget.handle,
      attachPointName
    );
    if (handle) {
      const obj = this.getObject(handle) as Effect;

      const values: Record<string, unknown> = {};
      values.handle = handle;
      values.attachWidget = targetWidget;
      values.attachPointName = attachPointName;

      return Object.assign(obj, values);
    }
    return undefined;
  }

  /**
   * Creates a spell visual effect at position.
   * ```ts
   * // Create Thunder Clap's caster art effect at [0,0]
   * const clap = Effect.createSpell(FourCC("AHtz"), EFFECT_TYPE_CASTER, 0, 0);
   * ```
   */
  public static createSpell(
    abilityId: number,
    effectType: effecttype,
    x: number,
    y: number
  ): Effect | undefined {
    const handle = AddSpellEffectById(abilityId, effectType, x, y);
    if (handle) {
      const obj = this.getObject(handle) as Effect;

      const values: Record<string, unknown> = {};
      values.handle = handle;

      return Object.assign(obj, values);
    }
    return undefined;
  }

  /**
   * Creates a spell visual effect at position.
   * ```ts
   * const red = Players[0];
   * const peasant = Unit.create(red, FourCC("hpea"), 0, 0);
   * // Create Thunder Clap's caster art effect attached to "origin" of peasant.
   * const clap = Effect.createSpellAttachment(FourCC("AHtc"), EFFECT_TYPE_CASTER, peasant, "origin");
   * clap?.destroy();
   * ```
   */
  public static createSpellAttachment(
    abilityId: number,
    effectType: effecttype,
    targetWidget: Widget,
    attachPointName: string
  ): Effect | undefined {
    const handle = AddSpellEffectTargetById(
      abilityId,
      effectType,
      targetWidget.handle,
      attachPointName
    );
    if (handle) {
      const obj = this.getObject(handle) as Effect;

      const values: Record<string, unknown> = {};
      values.handle = handle;
      values.attachWidget = targetWidget;
      values.attachPointName = attachPointName;

      return Object.assign(obj, values);
    }
    return undefined;
  }

  public get scale() {
    return BlzGetSpecialEffectScale(this.handle);
  }

  public set scale(scale: number) {
    BlzSetSpecialEffectScale(this.handle, scale);
  }

  /**
   * Warning: asynchronous
   * @async
   */
  public get x() {
    return BlzGetLocalSpecialEffectX(this.handle);
  }

  public set x(x: number) {
    BlzSetSpecialEffectX(this.handle, x);
  }

  /**
   * Warning: asynchronous
   * @async
   */
  public get y() {
    return BlzGetLocalSpecialEffectY(this.handle);
  }

  public set y(y: number) {
    BlzSetSpecialEffectY(this.handle, y);
  }

  /**
   * Warning: asynchronous
   * @async
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

  public static fromHandle(handle: effect | undefined): Effect | undefined {
    return handle ? this.getObject(handle) : undefined;
  }
}
