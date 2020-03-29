/** @noSelfInFile **/

export class Handle<T extends handle> {

  public readonly handle: T;
  private static initHandle: handle | undefined;
  protected static map: WeakMap<handle, any> = new WeakMap<handle, any>();

  protected constructor(handle?: T) {
    this.handle = handle === undefined ? Handle.initHandle as T : handle;
  }

  public get id() {
    return GetHandleId(this.handle);
  }

  public static initFromHandle(): boolean {
    return Handle.initHandle !== undefined;
  }

  protected static getObject(handle: handle) {
    const obj = this.map.get(handle);
    if (obj !== undefined) {
      return obj;
    }
    Handle.initHandle = handle;
    const newObj = new this();
    Handle.initHandle = undefined;
    this.map.set(handle, newObj);
    return newObj;
  }

}
