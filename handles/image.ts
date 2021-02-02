/** @noSelfInFile **/

import { Handle } from "./handle";

export enum ImageType {
  /**
   * Drawn above all other imageTypes.
   */
  Selection = 1,
  /**
   *  Drawn above Ubersplat, but below Selection and OcclusionMask.
   */
  Indicator = 2,
  /**
   * Drawn above Ubersplat and Indicator and below Selection.
   */
  OcclusionMask = 3,
  /**
   * Drawn below every other type. Images of this type are additionally affected by time of day and the fog of war (only for tinting).
   */
  Ubersplat = 4,
}

export class Image extends Handle<image> {
  /**
   * Creates a new image, the first ID given being 0 and then counting upwards (0, 1, 2, 3, ...).
   * Multiple images with the same type are drawn in their order of creation,
   * meaning that the image created first is drawn below the image created after.
   * @param file The path to the image. The image itself should have its border alpha-ed out
   * completely. If an invalid path is specified CreateImage returns image(-1).
   * @param sizeX The x-dimensions of the image.
   * @param sizeY The y-dimensions of the image.
   * @param sizeZ The z-dimensions of the image.
   * @param posX The x-cooridnate of where to create the image. This is the bottom left corner of the image.
   * @param posY The y-cooridnate of where to create the image. This is the bottom left corner of the image.
   * @param posZ The z-cooridnate of where to create the image.
   * @param originX Moves the origin (bottom left corner) of the image from posX in negative X-direction.
   * @param originY Moves the origin (bottom left corner) of the image from posY in negative Y-direction.
   * @param originZ Moves the origin (bottom left corner) of the image from posZ in negative Z-direction.
   * @param imageType
   */
  constructor(
    file: string,
    sizeX: number,
    sizeY: number,
    sizeZ: number,
    posX: number,
    posY: number,
    posZ: number,
    originX: number,
    originY: number,
    originZ: number,
    imageType: ImageType
  ) {
    if (Handle.initFromHandle()) {
      super();
    } else {
      super(CreateImage(file, sizeX, sizeY, sizeZ, posX, posY, posZ, originX, originY, originZ, imageType));
    }
  }

  /**
   * Destroys the image specified and recycles the handle ID of that image instantly (no ref counting for images).
   * @bug May crash the game if an invalid image is used (null, before the first image is created).
   */
  public destroy() {
    DestroyImage(this.handle);
  }

  /**
   * Every ImageType other than Selection doesnt seem to appear above water.
   * @param flag Draws the specified image above the water if the flag is true.
   * @param useWaterAlpha
   */
  public setAboveWater(flag: boolean, useWaterAlpha: boolean) {
    SetImageAboveWater(this.handle, flag, useWaterAlpha);
  }

  /**
   * Valid values for all channels range from 0 to 255.
   */
  public setColor(red: number, green: number, blue: number, alpha: number) {
    SetImageColor(this.handle, red, green, blue, alpha);
  }

  /**
   * This is the only function that is able to modify an image's z-offset.
   * @param flag
   * @param height The z-offset of the image.
   */
  public setConstantHeight(flag: boolean, height: number) {
    SetImageConstantHeight(this.handle, flag, height);
  }

  /**
   * Sets the X/Y position of the provided image. This is the bottom left corner of the image, unless you used values
   * form originX/Y/Z in the constructor other than 0, in which case the bottom left corner is moved further into negative
   * X/Y/Z direction.
   */
  public setPosition(x: number, y: number, z: number) {
    SetImagePosition(this.handle, x, y, z);
  }

  /**
   * Enable or disable the rendering of the image.
   * @param flag render if true, don't render if false
   */
  public setRender(flag: boolean) {
    SetImageRenderAlways(this.handle, flag);
  }

  /**
   * Change image's type.
   * @param imageType  Influence the order in which images are drawn above one another.
   */
  public setType(imageType: ImageType) {
    SetImageType(this.handle, imageType);
  }

  /**
   * Show or hide the image depending on boolean flag.
   * Seems like a redundant function in the light of SetImageRender(Always).
   * @param flag true shows, false hides
   */
  public show(flag: boolean) {
    ShowImage(this.handle, flag);
  }

  public static fromHandle(handle: image): Image {
    return this.getObject(handle);
  }
}
