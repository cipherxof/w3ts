/** @noSelfInFile **/

const map: WeakMap<handle, any> = new WeakMap<handle, any>();

export class Handle<T extends handle> {

  public readonly handle: T;
  private static initHandle: handle | undefined;

  protected constructor(handle?: T) {
    this.handle = handle === undefined ? Handle.initHandle as T : handle;
    map.set(this.handle, this);
  }

  public get id() {
    return GetHandleId(this.handle);
  }

  public static initFromHandle(): boolean {
    return Handle.initHandle !== undefined;
  }

  protected static getObject(handle: handle) {
    const obj = map.get(handle);
    if (obj !== undefined) {
      return obj;
    }
    Handle.initHandle = handle;
    const newObj = new this();
    Handle.initHandle = undefined;
    return newObj;
  }

}
