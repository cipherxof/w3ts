/** @noSelfInFile */

import { Handle } from "./handle";

export class Ubersplat extends Handle<ubersplat> {
  /** @deprecated use `Ubersplat.create` instead. */
  constructor(
    x: number,
    y: number,
    name: string,
    red: number,
    green: number,
    blue: number,
    alpha: number,
    forcePaused: boolean,
    noBirthTime: boolean
  ) {
    if (Handle.initFromHandle()) {
      super();
      return;
    }
    const handle = CreateUbersplat(
      x,
      y,
      name,
      red,
      green,
      blue,
      alpha,
      forcePaused,
      noBirthTime
    );
    if (handle === undefined) {
      error("w3ts failed to create ubersplat handle.", 3);
    }
    super(handle);
  }

  public static create(
    x: number,
    y: number,
    name: string,
    red: number,
    green: number,
    blue: number,
    alpha: number,
    forcePaused: boolean,
    noBirthTime: boolean
  ): Ubersplat | undefined {
    const handle = CreateUbersplat(
      x,
      y,
      name,
      red,
      green,
      blue,
      alpha,
      forcePaused,
      noBirthTime
    );
    if (handle) {
      const obj = this.getObject(handle) as Ubersplat;

      const values: Record<string, unknown> = {};
      values.handle = handle;

      return Object.assign(obj, values);
    }
    return undefined;
  }

  public destroy() {
    DestroyUbersplat(this.handle);
  }

  /**
   * @bug Does nothing.
   */
  public finish() {
    FinishUbersplat(this.handle);
  }

  public render(flag: boolean, always = false) {
    if (always) {
      SetUbersplatRenderAlways(this.handle, flag);
    } else {
      SetUbersplatRender(this.handle, flag);
    }
  }

  /**
   * @bug Does nothing.
   */
  public reset() {
    ResetUbersplat(this.handle);
  }

  public show(flag: boolean) {
    ShowUbersplat(this.handle, flag);
  }

  public static fromHandle(
    handle: ubersplat | undefined
  ): Ubersplat | undefined {
    return handle ? this.getObject(handle) : undefined;
  }
}
