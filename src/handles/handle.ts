/** @noSelfInFile **/


export class Handle<T extends handle> {
  protected _handle: T;
  protected static initHandle: any | undefined;
  protected static map: WeakMap<handle, any> = new WeakMap<handle, any>();

  protected constructor(initFunc: (...args: any) => any, initArgs: any[]) {
    if (Handle.initHandle === undefined) {
      this._handle = initFunc(...initArgs);
    } else {
      this._handle = Handle.initHandle as T;
    }
    Handle.initHandle = undefined;
  }

  protected static setDefaultHandle(handle: handle) {
    Handle.initHandle = handle;
  }

  public static fromHandle(handle: handle) {
    const obj = this.map.get(handle);
    if (obj !== undefined) {
      return obj;
    }
    this.setDefaultHandle(handle);
    const newObj = new Handle(() => { }, []);
    this.map.set(handle, newObj);
    return newObj;
  }

  public get handle(): T {
    return this._handle;
  }

}