/** @noSelfInFile **/

import { Handle } from "./handle";

export class Timer extends Handle<timer> {

  constructor() {
    super(CreateTimer, []);
  }

  static fromHandle(handle: timer): Timer {
    this.setDefaultHandle(handle);
    return new Timer();
  }

  public start(timeout: number, periodic: boolean, handlerFunc: () => void) {
    TimerStart(this.handle, timeout, periodic, handlerFunc);
    return this;
  }

  public pause() {
    PauseTimer(this.handle);
    return this;
  }

  public resume() {
    ResumeTimer(this.handle);
    return this;
  }

  public destroy() {
    DestroyTimer(this.handle);
    return this;
  }

  public getElapsed(): number {
    return TimerGetElapsed(this.handle);
  }

  public getRemaining(): number {
    return TimerGetRemaining(this.handle);
  }

  public getTimeout(): number {
    return TimerGetTimeout(this.handle);
  }

  public static fromExpired(): Timer {
    return this.fromHandle(GetExpiredTimer());
  }
}
