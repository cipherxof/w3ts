/** @noSelfInFile */

const map = new WeakMap<handle, Handle<handle>>();

export class Handle<T extends handle> {
  private static initHandle: handle | undefined;

  constructor(public readonly handle = Handle.initHandle as T) {
    map.set(this.handle, this);
  }

  /**
   * Get the unique ID of the handle. The ID is recycled once you destroy the object.
   * @returns The unique ID of a handle object.
   */
  public get id() {
    return GetHandleId(this.handle);
  }

  protected static initFromHandle(): boolean {
    return Handle.initHandle !== undefined;
  }

  static fromHandle<C extends Handle<handle>>(
    this: new (...args: any[]) => C,
    handle: (C extends Handle<infer H> ? H : never) | undefined,
    values?: Partial<C>
  ) {
    if (handle === undefined) {
      return undefined;
    }
    let obj = map.get(handle) as C;
    if (obj === undefined) {
      Handle.initHandle = handle;
      obj = new this();
      Handle.initHandle = undefined;
    } else {
      Object.assign(obj, { handle });
    }
    if (values) {
      Object.assign(obj, values);
    }
    return obj;
  }
}
