/** @noSelfInFile **/

import { Handle } from "./handle";

export class Frame extends Handle<framehandle> {

  constructor(name: string, owner: Frame, priority: number, createContext: number) {
    super(BlzCreateFrame, [name, owner.handle, priority, createContext]);
  }

  public static fromHandle(handle: framehandle): Frame {
    return this.get(handle);
  }

}
