/** @noSelfInFile **/

export class Handle<T extends handle> {

  readonly handle: T;
  protected static map: WeakMap<handle, any> = new WeakMap<handle, any>();
  private static initHandle: handle | undefined;

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
