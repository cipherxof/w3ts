/** @noSelfInFile **/

export class Handle<T extends handle> {
  protected _handle: T;
  protected static initHandle: any | undefined;

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

  public get handle(): T {
    return this._handle;
  }

}