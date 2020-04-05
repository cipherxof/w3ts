/** @noSelfInFile **/

import { Handle } from "./handle";
import { Point } from "./point";

export class Camera {

  private constructor() { }

  public static set visible(flag: boolean) {
    DisplayCineFilter(flag);
  }

  public static get visible() {
    return IsCineFilterDisplayed();
  }

  public static get boundMinX() {
    return GetCameraBoundMinX();
  }

  public static get boundMinY() {
    return GetCameraBoundMinY();
  }

  public static get boundMaxX() {
    return GetCameraBoundMaxX();
  }

  public static get boundMaxY() {
    return GetCameraBoundMaxY();
  }

  public static get targetX() {
    return GetCameraTargetPositionX();
  }

  public static get targetY() {
    return GetCameraTargetPositionY();
  }

  public static get targetZ() {
    return GetCameraTargetPositionZ();
  }

  public static get eyeX() {
    return GetCameraEyePositionX();
  }

  public static get eyeY() {
    return GetCameraEyePositionY();
  }

  public static get eyeZ() {
    return GetCameraEyePositionZ();
  }

  public static get eyePoint() {
    return GetCameraEyePositionLoc();
  }

  public static get targetPoint() {
    return Point.fromHandle(GetCameraTargetPositionLoc());
  }

  public static adjustField(whichField: camerafield, offset: number, duration: number) {
    AdjustCameraField(whichField, offset, duration);
  }

  public static endCinematicScene() {
    EndCinematicScene();
  }

  public static forceCinematicSubtitles(flag: boolean) {
    ForceCinematicSubtitles(flag);
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

  constructor() {
    super(Handle.initFromHandle() ? undefined : CreateCameraSetup());
  }

  public get destPoint() {
    return CameraSetupGetDestPositionLoc(this.handle);
  }

  public get destX() {
    return CameraSetupGetDestPositionX(this.handle);
  }

  public set destX(x: number) {
    CameraSetupSetDestPosition(this.handle, x, this.destY, 0);
  }

  public get destY() {
    return CameraSetupGetDestPositionY(this.handle);
  }

  public set destY(y: number) {
    CameraSetupSetDestPosition(this.handle, this.destX, y, 0);
  }

  public set label(label: string) {
    BlzCameraSetupSetLabel(this.handle, label);
  }

  public get label() {
    return BlzCameraSetupGetLabel(this.handle);
  }

  public apply(doPan: boolean, panTimed: boolean) {
    CameraSetupApply(this.handle, doPan, panTimed);
  }

  public applyForceDuration(doPan: boolean, forceDuration: number) {
    CameraSetupApplyForceDuration(this.handle, doPan, forceDuration);
  }

  public applyForceDurationSmooth(doPan: boolean, forcedDuration: number, easeInDuration: number, easeOutDuration: number, smoothFactor: number) {
    BlzCameraSetupApplyForceDurationSmooth(this.handle, doPan, forcedDuration, easeInDuration, easeOutDuration, smoothFactor);

  }

  public applyForceDurationZ(zDestOffset: number, forceDuration: number) {
    CameraSetupApplyForceDurationWithZ(this.handle, zDestOffset, forceDuration);
  }

  public applyZ(zDestOffset: number) {
    CameraSetupApplyWithZ(this.handle, zDestOffset);
  }

  public getField(whichField: camerafield) {
    return CameraSetupGetField(this.handle, whichField);
  }

  public setDestPos(x: number, y: number, duration: number) {
    CameraSetupSetDestPosition(this.handle, x, y, duration);
  }

  public setField(whichField: camerafield, value: number, duration: number) {
    CameraSetupSetField(this.handle, whichField, value, duration);
  }

  public static fromHandle(handle: camerasetup): camerasetup {
    return this.getObject(handle);
  }

}
