/** @noSelfInFile **/

export class Handle<T extends handle> {

  public get handle(): T {
    return this.handleVar;
  }
  private handleVar: T;
  protected static map: WeakMap<handle, any> = new WeakMap<handle, any>();
  protected static initHandle: handle | undefined;

  protected constructor(initFunc?: (...args: any) => any, initArgs?: any[]) {
    if (Handle.initHandle === undefined && initFunc !== undefined && initArgs !== undefined) {
      this.handleVar = initFunc(...initArgs);
    } else {
      this.handleVar = Handle.initHandle as T;
    }
    Handle.initHandle = undefined;
  }

  protected static get(handle: handle) {
    const obj = this.map.get(handle);
    if (obj !== undefined) {
      return obj;
    }
    Handle.initHandle = handle;
    const newObj = new this();
    this.map.set(handle, newObj);
    return newObj;
  }

}
