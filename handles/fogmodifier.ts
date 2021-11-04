/** @noSelfInFile */

import { Handle } from "./handle";
import { MapPlayer } from "./player";
import { Rectangle } from "./rect";

export class FogModifier extends Handle<fogmodifier> {
  /**
   * @deprecated use `FogModifier.create` instead.
   * @param forWhichPlayer
   * @param whichState Determines what type of fog the area is being modified to.
   * @param centerX The x-coordinate where the fog modifier begins.
   * @param centerY The y-coordinate where the fog modifier begins.
   * @param radius Determines the extent that the fog travels (expanding from the coordinates ( centerx , centery )).
   * @param useSharedVision Determines whether or not the fog modifier will be applied to allied players with shared vision.
   * @param afterUnits Will determine whether or not units in that area will be masked by the fog.
   * If it is set to true and the fogstate is masked, it will hide all the units in the fog modifier's radius and mask the area.
   * If set to false, it will only mask the areas that are not visible to the units.
   */
  constructor(
    forWhichPlayer: MapPlayer,
    whichState: fogstate,
    centerX: number,
    centerY: number,
    radius: number,
    useSharedVision: boolean,
    afterUnits: boolean
  ) {
    if (Handle.initFromHandle()) {
      super();
      return;
    }

    const handle = CreateFogModifierRadius(
      forWhichPlayer.handle,
      whichState,
      centerX,
      centerY,
      radius,
      useSharedVision,
      afterUnits
    );

    if (handle === undefined) {
      error("w3ts failed to create fogmodifier handle.", 3);
    }

    super(handle);
  }

  /**
   * @param forWhichPlayer
   * @param whichState Determines what type of fog the area is being modified to.
   * @param centerX The x-coordinate where the fog modifier begins.
   * @param centerY The y-coordinate where the fog modifier begins.
   * @param radius Determines the extent that the fog travels (expanding from the coordinates ( centerx , centery )).
   * @param useSharedVision Determines whether or not the fog modifier will be applied to allied players with shared vision.
   * @param afterUnits Will determine whether or not units in that area will be masked by the fog.
   * If it is set to true and the fogstate is masked, it will hide all the units in the fog modifier's radius and mask the area.
   * If set to false, it will only mask the areas that are not visible to the units.
   */
  public static create(
    forWhichPlayer: MapPlayer,
    whichState: fogstate,
    centerX: number,
    centerY: number,
    radius: number,
    useSharedVision: boolean,
    afterUnits: boolean
  ): FogModifier | undefined {
    const handle = CreateFogModifierRadius(
      forWhichPlayer.handle,
      whichState,
      centerX,
      centerY,
      radius,
      useSharedVision,
      afterUnits
    );

    if (handle) {
      const obj = this.getObject(handle) as FogModifier;

      const values: Record<string, unknown> = {};
      values.handle = handle;

      return Object.assign(obj, values);
    }

    return undefined;
  }

  public destroy() {
    DestroyFogModifier(this.handle);
  }

  public start() {
    FogModifierStart(this.handle);
  }

  public stop() {
    FogModifierStop(this.handle);
  }

  public static fromHandle(
    handle: fogmodifier | undefined
  ): FogModifier | undefined {
    return handle ? this.getObject(handle) : undefined;
  }

  public static fromRect(
    forWhichPlayer: MapPlayer,
    whichState: fogstate,
    where: Rectangle,
    useSharedVision: boolean,
    afterUnits: boolean
  ) {
    return this.fromHandle(
      CreateFogModifierRect(
        forWhichPlayer.handle,
        whichState,
        where.handle,
        useSharedVision,
        afterUnits
      )
    );
  }
}
