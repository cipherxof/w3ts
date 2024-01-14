/** @noSelfInFile */

import { Handle } from "./handle";

/**
 * Warcraft III's UI uses a proprietary format known as FDF (Frame Definition Files).
 * This class provides the ability to manipulate and create them dynamically through code.
 *
 * @example Create a simple button.
 * ```ts
 * const gameui = Frame.fromOrigin(ORIGIN_FRAME_GAME_UI, 0);
 * if (gameui) {
 *  // Create a "GLUEBUTTON" named "Facebutton", the clickable Button, for game UI
 *  const buttonFrame = Frame.createType("FaceButton", gameui, 0, "GLUEBUTTON", "");
 *  if (buttonFrame) {
 *    // Create a BACKDROP named "FaceButtonIcon", the visible image, for buttonFrame.
 *    const buttonIconFrame = Frame.createType("FaceButton", buttonFrame, 0, "BACKDROP", "");
 *    // buttonIconFrame will mimic buttonFrame in size and position
 *    buttonIconFrame?.setAllPoints(buttonFrame);
 *    // Set a Texture
 *    buttonIconFrame?.setTexture("ReplaceableTextures\\CommandButtons\\BTNSelectHeroOn", 0, true);
 *    // Place the buttonFrame to the center of the screen
 *    buttonFrame.setAbsPoint(FRAMEPOINT_CENTER, 0.4, 0.3);
 *    // Give that buttonFrame a size
 *    buttonFrame.setSize(0.05, 0.05);
 *  }
 *}
 *```
 *
 * There are many aspects to modifying the UI and it can become complicated, so here are some
 * guides:
 *
 * https://www.hiveworkshop.com/threads/ui-frames-starting-guide.318603/
 * https://www.hiveworkshop.com/pastebin/913bd439799b3d917e5b522dd9ef458f20598/
 * https://www.hiveworkshop.com/tags/ui-fdf/
 */
export class Frame extends Handle<framehandle> {
  /**
   * @deprecated use `Frame.create` instead.
   * @param name The name of the frame to be accessed with `Frame.fromName`.
   * @param owner The parent frame.
   * @param priority
   * @param createContext The ID assigned to a frame to be accessed with `Frame.fromName`. This value does not have to be unique and can be overwritten.
   */
  constructor(
    name: string,
    owner: Frame,
    priority: number,
    createContext: number
  );

  /**
   * @deprecated use `Frame.createSimple` instead.
   *
   * https://www.hiveworkshop.com/threads/ui-simpleframes.320385/
   * @param name The name of the frame to be accessed with `Frame.fromName`.
   * @param priority
   * @param owner The parent frame.
   * @param createContext The ID assigned to a frame to be accessed with `Frame.fromName`. This value does not have to be unique and can be overwritten.
   */
  constructor(name: string, owner: Frame, priority: number);

  /**
   * @deprecated use `Frame.createType` instead.
   * @param name The name of the frame to be accessed with `Frame.fromName`.
   * @param owner The parent frame.
   * @param priority
   * @param createContext The ID assigned to a frame to be accessed with `Frame.fromName`. This value does not have to be unique and can be overwritten.
   * @param typeName The type of Frame.
   * @param inherits The name of the Frame it inherits.
   */
  constructor(
    name: string,
    owner: Frame,
    priority: number,
    createContext: number,
    typeName: string,
    inherits: string
  );

  constructor(
    name: string,
    owner: Frame,
    priority: number,
    createContext?: number,
    typeName?: string,
    inherits?: string
  ) {
    if (Handle.initFromHandle()) {
      super();
      return;
    }

    let handle: framehandle | undefined;

    if (createContext === undefined) {
      handle = BlzCreateSimpleFrame(name, owner.handle, priority);
    } else if (typeName !== undefined && inherits !== undefined) {
      handle = BlzCreateFrameByType(
        typeName,
        name,
        owner.handle,
        inherits,
        createContext
      );
    } else {
      handle = BlzCreateFrame(name, owner.handle, priority, createContext);
    }

    if (handle === undefined) {
      error("w3ts failed to create framehandle handle.", 3);
    }

    super(handle);
  }

  /**
   * Creates a Frame.
   * @param name The name of the frame to be accessed with `Frame.fromName`.
   * @param owner The parent frame.
   * @param priority Should be a natural number (greater equal to 0).
   * @param createContext The ID assigned to a frame to be accessed with `Frame.fromName`. This value does not have to be unique and can be overwritten.
   */
  public static create(
    name: string,
    owner: Frame,
    priority: number,
    createContext: number
  ): Frame | undefined {
    const handle = BlzCreateFrame(name, owner.handle, priority, createContext);
    if (handle) {
      const obj = this.getObject(handle) as Frame;

      const values: Record<string, unknown> = {};
      values.handle = handle;

      return Object.assign(obj, values);
    }
    return undefined;
  }

  /**
   * Creates a SimpleFrame.
   *
   * https://www.hiveworkshop.com/threads/ui-simpleframes.320385/
   * @param name The name of the frame to be accessed with `Frame.fromName`.
   * @param owner The parent frame.
   * @param createContext The ID assigned to a frame to be accessed with `Frame.fromName`. This value does not have to be unique and can be overwritten.
   */
  public static createSimple(
    name: string,
    owner: Frame,
    createContext: number
  ): Frame | undefined {
    const handle = BlzCreateSimpleFrame(name, owner.handle, createContext);
    if (handle) {
      const obj = this.getObject(handle) as Frame;

      const values: Record<string, unknown> = {};
      values.handle = handle;

      return Object.assign(obj, values);
    }
    return undefined;
  }

  /**
   * Create a Frame by type.
   * @param name The name of the frame to be accessed with `Frame.fromName`.
   * @param owner The parent frame.
   * @param createContext The ID assigned to a frame to be accessed with `Frame.fromName`. This value does not have to be unique and can be overwritten.
   * @param typeName The type of Frame.
   * @param inherits The name of the Frame it inherits.
   */
  public static createType(
    name: string,
    owner: Frame,
    createContext: number,
    typeName: string,
    inherits: string
  ): Frame | undefined {
    const handle = BlzCreateFrameByType(
      typeName,
      name,
      owner.handle,
      inherits,
      createContext
    );

    if (handle) {
      const obj = this.getObject(handle) as Frame;

      const values: Record<string, unknown> = {};
      values.handle = handle;

      return Object.assign(obj, values);
    }

    return undefined;
  }

  public set alpha(alpha: number) {
    BlzFrameSetAlpha(this.handle, alpha);
  }

  public get alpha() {
    return BlzFrameGetAlpha(this.handle);
  }

  public get children() {
    const count = this.childrenCount;
    const output: Frame[] = [];
    for (let i = 0; i < count; i++) {
      const child = this.getChild(i);
      if (child) {
        output.push(child);
      }
    }
    return output;
  }

  public get childrenCount() {
    return BlzFrameGetChildrenCount(this.handle);
  }

  public set enabled(flag: boolean) {
    BlzFrameSetEnable(this.handle, flag);
  }

  public get enabled() {
    return BlzFrameGetEnable(this.handle);
  }

  public set height(height: number) {
    BlzFrameSetSize(this.handle, this.width, height);
  }

  public get height() {
    return BlzFrameGetHeight(this.handle);
  }

  /**
   * @deprecated use `getParent` and `setParent` instead.
   */
  public set parent(parent: Frame) {
    BlzFrameSetParent(this.handle, parent.handle);
  }

  public get parent() {
    return Frame.fromHandle(
      BlzFrameGetParent(this.handle) as framehandle
    ) as Frame;
  }

  public set text(text: string) {
    BlzFrameSetText(this.handle, text);
  }

  public get text() {
    return BlzFrameGetText(this.handle) ?? "";
  }

  public set textSizeLimit(size: number) {
    BlzFrameSetTextSizeLimit(this.handle, size);
  }

  public get textSizeLimit() {
    return BlzFrameGetTextSizeLimit(this.handle);
  }

  public set value(value: number) {
    BlzFrameSetValue(this.handle, value);
  }

  public get value() {
    return BlzFrameGetValue(this.handle);
  }

  public set visible(flag: boolean) {
    BlzFrameSetVisible(this.handle, flag);
  }

  public get visible() {
    return BlzFrameIsVisible(this.handle);
  }

  public set width(width: number) {
    BlzFrameSetSize(this.handle, width, this.height);
  }

  public get width() {
    return BlzFrameGetWidth(this.handle);
  }

  public addText(text: string) {
    BlzFrameAddText(this.handle, text);
    return this;
  }

  public cageMouse(enable: boolean) {
    BlzFrameCageMouse(this.handle, enable);
    return this;
  }

  public clearPoints() {
    BlzFrameClearAllPoints(this.handle);
    return this;
  }

  public click() {
    BlzFrameClick(this.handle);
    return this;
  }

  public destroy() {
    BlzDestroyFrame(this.handle);
    return this;
  }

  public getChild(index: number) {
    return Frame.fromHandle(BlzFrameGetChild(this.handle, index));
  }

  public setAbsPoint(point: framepointtype, x: number, y: number) {
    BlzFrameSetAbsPoint(this.handle, point, x, y);
    return this;
  }

  public setAllPoints(relative: Frame) {
    BlzFrameSetAllPoints(this.handle, relative.handle);
    return this;
  }

  public setAlpha(alpha: number) {
    BlzFrameSetAlpha(this.handle, alpha);
    return this;
  }

  public setEnabled(flag: boolean) {
    BlzFrameSetEnable(this.handle, flag);
    return this;
  }

  public setFocus(flag: boolean) {
    BlzFrameSetFocus(this.handle, flag);
    return this;
  }

  public setFont(filename: string, height: number, flags: number) {
    BlzFrameSetFont(this.handle, filename, height, flags);
    return this;
  }

  public setHeight(height: number) {
    BlzFrameSetSize(this.handle, this.width, height);
    return this;
  }

  public setLevel(level: number) {
    BlzFrameSetLevel(this.handle, level);
    return this;
  }

  public setMinMaxValue(minValue: number, maxValue: number) {
    BlzFrameSetMinMaxValue(this.handle, minValue, maxValue);
    return this;
  }

  public setTextAlignment(vert: textaligntype, horz: textaligntype) {
    BlzFrameSetTextAlignment(this.handle, vert, horz);
  }

  public setModel(modelFile: string, cameraIndex: number) {
    BlzFrameSetModel(this.handle, modelFile, cameraIndex);
    return this;
  }

  public getParent() {
    return Frame.fromHandle(BlzFrameGetParent(this.handle));
  }

  public setParent(parent: Frame) {
    BlzFrameSetParent(this.handle, parent.handle);
    return this;
  }

  public setPoint(
    point: framepointtype,
    relative: Frame,
    relativePoint: framepointtype,
    x: number,
    y: number
  ) {
    BlzFrameSetPoint(this.handle, point, relative.handle, relativePoint, x, y);
    return this;
  }

  public setScale(scale: number) {
    BlzFrameSetScale(this.handle, scale);
    return this;
  }

  public setSize(width: number, height: number) {
    BlzFrameSetSize(this.handle, width, height);
    return this;
  }

  public setSpriteAnimate(primaryProp: number, flags: number) {
    BlzFrameSetSpriteAnimate(this.handle, primaryProp, flags);
    return this;
  }

  public setStepSize(stepSize: number) {
    BlzFrameSetStepSize(this.handle, stepSize);
    return this;
  }

  public setText(text: string) {
    BlzFrameSetText(this.handle, text);
    return this;
  }

  public setTextColor(color: number) {
    BlzFrameSetTextColor(this.handle, color);
    return this;
  }

  public setTextSizeLimit(size: number) {
    BlzFrameSetTextSizeLimit(this.handle, size);
    return this;
  }

  public setTexture(texFile: string, flag: number, blend: boolean) {
    BlzFrameSetTexture(this.handle, texFile, flag, blend);
    return this;
  }

  public setTooltip(tooltip: Frame) {
    BlzFrameSetTooltip(this.handle, tooltip.handle);
    return this;
  }

  public setValue(value: number) {
    BlzFrameSetValue(this.handle, value);
    return this;
  }

  public setVertexColor(color: number) {
    BlzFrameSetVertexColor(this.handle, color);
    return this;
  }

  public setVisible(flag: boolean) {
    BlzFrameSetVisible(this.handle, flag);
    return this;
  }

  public setWidth(width: number) {
    BlzFrameSetSize(this.handle, width, this.height);
    return this;
  }

  public static autoPosition(enable: boolean) {
    BlzEnableUIAutoPosition(enable);
  }

  public static fromEvent() {
    return this.fromHandle(BlzGetTriggerFrame());
  }

  public static fromHandle(handle: framehandle | undefined): Frame | undefined {
    return handle ? this.getObject(handle) : undefined;
  }

  public static fromName(name: string, createContext: number) {
    return this.fromHandle(BlzGetFrameByName(name, createContext));
  }

  public static fromOrigin(frameType: originframetype, index: number) {
    return this.fromHandle(BlzGetOriginFrame(frameType, index));
  }

  public static getEventHandle() {
    return BlzGetTriggerFrameEvent();
  }

  public static getEventText() {
    return BlzGetTriggerFrameValue();
  }

  public static getEventValue() {
    return BlzGetTriggerFrameValue();
  }

  public static hideOrigin(enable: boolean) {
    BlzHideOriginFrames(enable);
  }

  public static loadTOC(filename: string) {
    return BlzLoadTOCFile(filename);
  }
}
