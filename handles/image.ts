/** @noSelfInFile **/

import { Handle } from "./handle";

export enum ImageType {
  Selection = 1,
  Indicator = 2,
  OcclusionMask = 3,
  Ubersplat = 4
}

export class Image extends Handle<image> {

  constructor(file: string, sizeX: number, sizeY: number, sizeZ: number, posX: number, posY: number, posZ: number, originX: number, originY: number, originZ: number, imageType: ImageType) {
    if (Handle.initFromHandle()) {
      super();
    } else {
      super(CreateImage(file, sizeX, sizeY, sizeZ, posX, posY, posZ, originX, originY, originZ, imageType));
    }
  }

  public destroy() {
    DestroyImage(this.handle);
  }

  public setAboveWater(flag: boolean, useWaterAlpha: boolean) {
    SetImageAboveWater(this.handle, flag, useWaterAlpha);
  }

  public setColor(red: number, green: number, blue: number, alpha: number) {
    SetImageColor(this.handle, red, green, blue, alpha);
  }

  public setConstantHeight(flag: boolean, height: number) {
    SetImageConstantHeight(this.handle, flag, height);
  }

  public setPosition(x: number, y: number, z: number) {
    SetImagePosition(this.handle, x, y, z);
  }

  public setRender(flag: boolean) {
    SetImageRenderAlways(this.handle, flag);
  }

  public setType(imageType: ImageType) {
    SetImageType(this.handle, imageType);
  }

  public show(flag: boolean) {
    ShowImage(this.handle, flag);
  }

  public static fromHandle(handle: image): Image {
    return this.getObject(handle);
  }

}
