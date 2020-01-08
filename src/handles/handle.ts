/** @noSelfInFile **/

export class Handle<T extends handle> {

  public get handle(): T {
    return this.handleVar;
  }
  private handleVar: T;
  protected static initHandle: any | undefined;
  protected static map: WeakMap<handle, any> = new WeakMap<handle, any>();

  protected constructor(initFunc: (...args: any) => any, initArgs: any[]) {
    if (Handle.initHandle === undefined) {
      this.handleVar = initFunc(...initArgs);
    } else {
      this.handleVar = Handle.initHandle as T;
    }
    Handle.initHandle = undefined;
  }

  public static fromHandle(handle: handle) {
    const obj = this.map.get(handle);
    if (obj !== undefined) {
      return obj;
    }
    this.setDefaultHandle(handle);
    const newObj = new Handle(() => undefined, []);
    this.map.set(handle, newObj);
    return newObj;
  }

  protected static setDefaultHandle(handle: handle) {
    Handle.initHandle = handle;
  }

}
