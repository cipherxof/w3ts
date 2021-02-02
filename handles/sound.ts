/** @noSelfInFile **/

import { Handle } from "./handle";

export class Sound extends Handle<sound> {
  /**
   * Creates a sound handle.
   * @note You can only play the same sound handle once.
   * @note You can only play the same sound filepath four times.
   * @note You can only play 16 sounds in general.
   * @note Sounds of the same filepath (on different sound handles) must have a delay
   * of at least 0.1 seconds inbetween them to be played.
   * You can overcome this by starting one earlier and then using `SetSoundPosition`.
   * @param fileName The path to the file.
   * @param looping Looping sounds will restart once the sound duration has finished.
   * @param is3D 3D Sounds can be played on particular areas of the map. They are at their loudest when the camera is close to the sound's coordinates.
   * @param stopWhenOutOfRange
   * @param fadeInRate How quickly the sound fades in. The higher the number, the faster the sound fades in. Maximum number is 127.
   * @param fadeOutRate How quickly the sound fades out. The higher the number, the faster the sound fades out. Maximum number is 127.
   * @param eaxSetting EAX is an acronym for environmental audio extensions. In the sound editor, this corresponds to the "Effect" setting.
   */
  constructor(fileName: string, looping: boolean, is3D: boolean, stopWhenOutOfRange: boolean, fadeInRate: number, fadeOutRate: number, eaxSetting: string) {
    if (Handle.initFromHandle()) {
      super();
    } else {
      super(CreateSound(fileName, looping, is3D, stopWhenOutOfRange, fadeInRate, fadeOutRate, eaxSetting));
    }
  }

  public get dialogueSpeakerNameKey() {
    return GetDialogueSpeakerNameKey(this.handle);
  }

  public set dialogueSpeakerNameKey(speakerName: string) {
    SetDialogueSpeakerNameKey(this.handle, speakerName);
  }

  public get dialogueTextKey() {
    return GetDialogueTextKey(this.handle);
  }

  public set dialogueTextKey(dialogueText: string) {
    SetDialogueTextKey(this.handle, dialogueText);
  }

  public get duration() {
    return GetSoundDuration(this.handle);
  }

  public set duration(duration: number) {
    SetSoundDuration(this.handle, duration);
  }

  public get loading() {
    return GetSoundIsLoading(this.handle);
  }

  public get playing() {
    return GetSoundIsPlaying(this.handle);
  }

  public killWhenDone() {
    KillSoundWhenDone(this.handle);
  }

  public registerStacked(byPosition: boolean, rectWidth: number, rectHeight: number) {
    RegisterStackedSound(this.handle, byPosition, rectWidth, rectHeight);
  }

  public setChannel(channel: number) {
    SetSoundDistanceCutoff(this.handle, channel);
  }

  /**
   * @note This call is only valid if the sound was created with 3d enabled
   */
  public setConeAngles(inside: number, outside: number, outsideVolume: number) {
    SetSoundConeAngles(this.handle, inside, outside, outsideVolume);
  }

  /**
   * @note This call is only valid if the sound was created with 3d enabled
   */
  public setConeOrientation(x: number, y: number, z: number) {
    SetSoundConeOrientation(this.handle, x, y, z);
  }

  public setDistanceCutoff(cutoff: number) {
    SetSoundDistanceCutoff(this.handle, cutoff);
  }

  /**
   * @note This call is only valid if the sound was created with 3d enabled
   */
  public setDistances(minDist: number, maxDist: number) {
    SetSoundDistances(this.handle, minDist, maxDist);
  }

  public setFacialAnimationFilepath(animationSetFilepath: string) {
    SetSoundFacialAnimationSetFilepath(this.handle, animationSetFilepath);
  }

  public setFacialAnimationGroupLabel(groupLabel: string) {
    SetSoundFacialAnimationGroupLabel(this.handle, groupLabel);
  }

  public setFacialAnimationLabel(animationLabel: string) {
    SetSoundFacialAnimationLabel(this.handle, animationLabel);
  }

  /**
   * pplies default settings to the sound.
   * @param soundLabel The label out of one of the SLK-files, whose settings should be used, e.g. values like volume, pitch, pitch variance, priority, channel, min distance, max distance, distance cutoff or eax.
   */
  public setParamsFromLabel(soundLabel: string) {
    SetSoundParamsFromLabel(this.handle, soundLabel);
  }

  /**
   * Tones the pitch of the sound, default value is 1.
   * Increasing it you get the chipmunk version and the sound becomes shorter, when decremented the sound becomes low-pitched and longer.
   * @param pitch
   * @bug This native has very weird behaviour.
   * See [this](http://www.hiveworkshop.com/threads/setsoundpitch-weirdness.215743/#post-2145419) for an explenation
   * and [this](http://www.hiveworkshop.com/threads/snippet-rapidsound.258991/#post-2611724) for a non-bugged implementation.
   */
  public setPitch(pitch: number) {
    SetSoundPitch(this.handle, pitch);
  }

  /**
   * Must be called immediately after starting the sound
   * @param millisecs
   */
  public setPlayPosition(millisecs: number) {
    SetSoundPlayPosition(this.handle, millisecs);
  }

  /**
   * @note This call is only valid if the sound was created with 3d enabled
   */
  public setPosition(x: number, y: number, z: number) {
    SetSoundPosition(this.handle, x, y, z);
  }

  /**
   * @note This call is only valid if the sound was created with 3d enabled
   */
  public setVelocity(x: number, y: number, z: number) {
    SetSoundVelocity(this.handle, x, y, z);
  }

  /**
   * Sets the sounds volume
   * @param volume Volume, between 0 and 127
   */
  public setVolume(volume: number) {
    SetSoundVolume(this.handle, volume);
  }

  /**
   * Starts the sound.
   * @note You can only play the same sound handle once.
   * @note You can only play 16 sounds in general.
   * @note Sounds of the same filepath (on different sound handles) must have a delay of at least 0.1 seconds inbetween them to be played.
   * You can overcome this by starting one earlier and then using `setPosition`.
   */
  public start() {
    StartSound(this.handle);
  }

  /**
   * Stops the sound.
   * @param killWhenDone The sound gets destroyed if true.
   * @param fadeOut Turns down the volume with `fadeOutRate` as stated in constructor.
   */
  public stop(killWhenDone: boolean, fadeOut: boolean) {
    StopSound(this.handle, killWhenDone, fadeOut);
  }

  public unregisterStacked(byPosition: boolean, rectWidth: number, rectHeight: number) {
    UnregisterStackedSound(this.handle, byPosition, rectWidth, rectHeight);
  }

  public static fromHandle(handle: sound): Sound {
    return this.getObject(handle);
  }

  public static getFileDuration(fileName: string) {
    return GetSoundFileDuration(fileName);
  }
}
