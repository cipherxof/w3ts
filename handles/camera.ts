/** @noSelfInFile **/

import { Handle } from "./handle";
import { Point } from "./point";

export class Camera {
  private constructor() {}

  public static set visible(flag: boolean) {
    DisplayCineFilter(flag);
  }

  public static get visible() {
    return IsCineFilterDisplayed();
  }

  /**
   * Return-value for the local players camera only.
   */
  public static get boundMinX() {
    return GetCameraBoundMinX();
  }

  /**
   * Return-value for the local players camera only.
   */
  public static get boundMinY() {
    return GetCameraBoundMinY();
  }

  /**
   * Return-value for the local players camera only.
   */
  public static get boundMaxX() {
    return GetCameraBoundMaxX();
  }

  public static get boundMaxY() {
    return GetCameraBoundMaxY();
  }

  /**
   * Return-value for the local players camera only.
   */
  public static get targetX() {
    return GetCameraTargetPositionX();
  }

  /**
   * Return-value for the local players camera only.
   */
  public static get targetY() {
    return GetCameraTargetPositionY();
  }

  /**
   * Return-value for the local players camera only.
   */
  public static get targetZ() {
    return GetCameraTargetPositionZ();
  }

  /**
   * Return-value for the local players camera only.
   */
  public static get eyeX() {
    return GetCameraEyePositionX();
  }

  /**
   * Return-value for the local players camera only.
   */
  public static get eyeY() {
    return GetCameraEyePositionY();
  }

  /**
   * Return-value for the local players camera only.
   */
  public static get eyeZ() {
    return GetCameraEyePositionZ();
  }

  /**
   * Return-value for the local players camera only.
   */
  public static get eyePoint() {
    return Point.fromHandle(GetCameraEyePositionLoc());
  }

  /**
   * Return-value for the local players camera only.
   */
  public static get targetPoint() {
    return Point.fromHandle(GetCameraTargetPositionLoc());
  }

  /**
   * Changes one of the game camera's options whichField by offset over duration seconds.
   * @param whichField
   * @param offset
   * @param duration
   */
  public static adjustField(whichField: camerafield, offset: number, duration: number) {
    AdjustCameraField(whichField, offset, duration);
  }

  public static endCinematicScene() {
    EndCinematicScene();
  }

  public static forceCinematicSubtitles(flag: boolean) {
    ForceCinematicSubtitles(flag);
  }

  /**
   * Return-value for the local players camera only.
   */
  public static getField(field: camerafield) {
    return GetCameraField(field);
  }

  public static getMargin(whichMargin: number) {
    return GetCameraMargin(whichMargin);
  }

  public static pan(x: number, y: number, zOffsetDest: number | undefined) {
    if (!zOffsetDest) {
      PanCameraTo(x, y);
    } else {
      PanCameraToWithZ(x, y, zOffsetDest);
    }
  }

  public static panTimed(x: number, y: number, duration: number, zOffsetDest: number | undefined) {
    if (!zOffsetDest) {
      PanCameraToTimed(x, y, duration);
    } else {
      PanCameraToTimedWithZ(x, y, zOffsetDest, duration);
    }
  }

  public static reset(duration: number) {
    ResetToGameCamera(duration);
  }

  public static setBounds(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number) {
    SetCameraBounds(x1, y1, x2, y2, x3, y3, x4, y4);
  }

  public static setCameraOrientController(whichUnit: unit, xOffset: number, yOffset: number) {
    SetCameraOrientController(whichUnit, xOffset, yOffset);
  }

  public static setCineFilterBlendMode(whichMode: blendmode) {
    SetCineFilterBlendMode(whichMode);
  }

  public static setCineFilterDuration(duration: number) {
    SetCineFilterDuration(duration);
  }

  public static setCineFilterEndColor(red: number, green: number, blue: number, alpha: number) {
    SetCineFilterEndColor(red, green, blue, alpha);
  }

  public static setCineFilterEndUV(minU: number, minV: number, maxU: number, maxV: number) {
    SetCineFilterEndUV(minU, minV, maxU, maxV);
  }

  public static setCineFilterStartColor(red: number, green: number, blue: number, alpha: number) {
    SetCineFilterStartColor(red, green, blue, alpha);
  }

  public static setCineFilterStartUV(minU: number, minV: number, maxU: number, maxV: number) {
    SetCineFilterStartUV(minU, minV, maxU, maxV);
  }

  public static setCineFilterTexMapFlags(whichFlags: texmapflags) {
    SetCineFilterTexMapFlags(whichFlags);
  }

  public static setCineFilterTexture(fileName: string) {
    SetCineFilterTexture(fileName);
  }

  public static setCinematicAudio(cinematicAudio: boolean) {
    SetCinematicAudio(cinematicAudio);
  }

  public static setCinematicCamera(cameraModelFile: string) {
    SetCinematicCamera(cameraModelFile);
  }

  public static SetCinematicScene(portraitUnitId: number, color: playercolor, speakerTitle: string, text: string, sceneDuration: number, voiceoverDuration: number) {
    SetCinematicScene(portraitUnitId, color, speakerTitle, text, sceneDuration, voiceoverDuration);
  }

  public static setDepthOfFieldScale(scale: number) {
    CameraSetDepthOfFieldScale(scale);
  }

  public static setField(whichField: camerafield, value: number, duration: number) {
    SetCameraField(whichField, value, duration);
  }

  public static setFocalDistance(distance: number) {
    CameraSetFocalDistance(distance);
  }

  public static setPos(x: number, y: number) {
    SetCameraPosition(x, y);
  }

  public static setRotateMode(x: number, y: number, radiansToSweep: number, duration: number) {
    SetCameraRotateMode(x, y, radiansToSweep, duration);
  }

  public static setSmoothingFactor(factor: number) {
    CameraSetSmoothingFactor(factor);
  }

  public static setSourceNoise(mag: number, velocity: number, vertOnly = false) {
    CameraSetSourceNoiseEx(mag, velocity, vertOnly);
  }

  public static setTargetController(whichUnit: unit, xOffset: number, yOffset: number, inheritOrientation: boolean) {
    SetCameraTargetController(whichUnit, xOffset, yOffset, inheritOrientation);
  }

  public static setTargetNoise(mag: number, velocity: number, vertOnly = false) {
    CameraSetTargetNoiseEx(mag, velocity, vertOnly);
  }

  public static stop() {
    StopCamera();
  }
}

export class CameraSetup extends Handle<camerasetup> {
  /**
   * Creates a new CameraSetup object.
   */
  constructor() {
    super(Handle.initFromHandle() ? undefined : CreateCameraSetup());
  }

  /**
   * Returns the target Point of a CameraSetup.
   */
  public get destPoint() {
    return Point.fromHandle(CameraSetupGetDestPositionLoc(this.handle));
  }

  /**
   * Returns the target x-coordinate of a CameraSetup.
   */
  public get destX() {
    return CameraSetupGetDestPositionX(this.handle);
  }

  /**
   * Sets the target x-coordinate of a CameraSetup.
   */
  public set destX(x: number) {
    CameraSetupSetDestPosition(this.handle, x, this.destY, 0);
  }

  /**
   * Returns the target y-coordinate of a CameraSetup.
   */
  public get destY() {
    return CameraSetupGetDestPositionY(this.handle);
  }

  /**
   * Sets the target y-coordinate of a CameraSetup.
   */
  public set destY(y: number) {
    CameraSetupSetDestPosition(this.handle, this.destX, y, 0);
  }

  /**
   * Sets the label of a CameraSetup.
   */
  public set label(label: string) {
    BlzCameraSetupSetLabel(this.handle, label);
  }

  /**
   * Gets the label of a CameraSetup.
   */
  public get label() {
    return BlzCameraSetupGetLabel(this.handle);
  }

  /**
   * Applies the CameraSetup, altering the current camera's fields to match those of the camera setup.
   * @param doPan If set to true, it will move the current camera's target coordinates to the
   * camera setup's target coordinates. If false, the camera will not move
   * coordinates, but will still apply the other fields.
   * @param panTimed If set to true, then it will change the camera's properties over the times specified in `CameraSetup.setField`.
   */
  public apply(doPan: boolean, panTimed: boolean) {
    CameraSetupApply(this.handle, doPan, panTimed);
  }

  /**
   * Applies the camerasetup over a certain duration, altering the current camera's fields to match those of the camera setup.
   * @param doPan If set to true, it will move the current camera's target coordinates to the
   * camera setup's target coordinates. If false, the camera will not move
   * coordinates, but will still apply the other fields.
   * @param forceDuration The duration it will take to apply all the camera fields. It will ignore the times set by `CameraSetup.setField`.
   */
  public applyForceDuration(doPan: boolean, forceDuration: number) {
    CameraSetupApplyForceDuration(this.handle, doPan, forceDuration);
  }

  /**
   *
   * @param doPan If set to true, it will move the current camera's target coordinates to the
   * camera setup's target coordinates. If false, the camera will not move
   * coordinates, but will still apply the other fields.
   * @param forcedDuration The duration it will take to apply all the camera fields. It will ignore the times set by `CameraSetup.setField`.
   * @param easeInDuration
   * @param easeOutDuration
   * @param smoothFactor
   */
  public applyForceDurationSmooth(doPan: boolean, forcedDuration: number, easeInDuration: number, easeOutDuration: number, smoothFactor: number) {
    BlzCameraSetupApplyForceDurationSmooth(this.handle, doPan, forcedDuration, easeInDuration, easeOutDuration, smoothFactor);
  }

  /**
   * Applies the CameraSetup over a certain duration with a custom z-offset value,
   * altering the current camera's fields to match those of the camera setup.
   * The z-offset input will override the z-offset specified by `CameraSetup.setField`.
   * @param zDestOffset The camera's z-offset will gradually change to this value over the specified duration.
   * @param forceDuration The duration it will take to apply all the camera fields. It will ignore the times set by `CameraSetup.setField`.
   */
  public applyForceDurationZ(zDestOffset: number, forceDuration: number) {
    CameraSetupApplyForceDurationWithZ(this.handle, zDestOffset, forceDuration);
  }

  /**
   * Applies the CameraSetup with a custom z-offset, altering the current camera's
   * fields to match those of the camera setup. The z-offset input will override
   * the z-offset specified by the CameraSetup through `CameraSetup.setField`.
   * @param zDestOffset The camera's z-offset will gradually change to this value over the specified duration.
   * @bug If a player pauses the game after the CameraSetup has been applied, the z-offset of the game camera will change to the z-offset of the CameraSetup for that player.
   */
  public applyZ(zDestOffset: number) {
    CameraSetupApplyWithZ(this.handle, zDestOffset);
  }

  /**
   * Returns the value of the specified field for a CameraSetup. The angle of attack,
   * field of view, roll, and rotation are all returned in degrees, unlike `Camera.getField`.
   * @param whichField The field of the CameraSetup.
   * @note The angle of attack, field of view, roll, and rotation are all returned in degrees.
   */
  public getField(whichField: camerafield) {
    return CameraSetupGetField(this.handle, whichField);
  }

  /**
   * Sets the target coordinates for a CameraSetup over a duration. The coordinate
   * change will only be applied when `CameraSetup.apply` (or some other variant) is ran.
   * @param x The target x-coordinate.
   * @param y The target y-coordinate.
   * @param duration The coordinates will be applied over this duration once the camera setup is applied.
   */
  public setDestPos(x: number, y: number, duration: number) {
    CameraSetupSetDestPosition(this.handle, x, y, duration);
  }

  /**
   * Assigns a value to the specified field for a CameraSetup. The input angles should be in degrees.
   * @param whichField The field of the CameraSetup.
   * @param value The value to assign to the field.
   * @param duration The duration over which the field will be set. If the duration is greater than 0, the changes will be made gradually once the camera setup is applied.
   */
  public setField(whichField: camerafield, value: number, duration: number) {
    CameraSetupSetField(this.handle, whichField, value, duration);
  }

  public static fromHandle(handle: camerasetup): camerasetup {
    return this.getObject(handle);
  }
}
