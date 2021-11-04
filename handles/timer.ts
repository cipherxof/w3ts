/** @noSelfInFile */

import { Handle } from "./handle";

export class Timer extends Handle<timer> {
  /** @deprecated use `Timer.create` instead. */
  constructor() {
    if (Handle.initFromHandle()) {
      super();
      return;
    }
    const handle = CreateTimer();
    if (handle === undefined) {
      error("w3ts failed to create timer handle.", 3);
    }
    super(handle);
  }

  public static create(): Timer {
    const handle = CreateTimer();
    const obj = this.getObject(handle) as Timer;

    const values: Record<string, unknown> = {};
    values.handle = handle;

    return Object.assign(obj, values);
  }

  public get elapsed(): number {
    return TimerGetElapsed(this.handle);
  }

  /**
   * @bug This might not return the correct value if the timer was paused and restarted at one point. See http://www.wc3c.net/showthread.php?t=95756.
   */
  public get remaining(): number {
    return TimerGetRemaining(this.handle);
  }

  public get timeout(): number {
    return TimerGetTimeout(this.handle);
  }

  public destroy() {
    DestroyTimer(this.handle);
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

  public start(timeout: number, periodic: boolean, handlerFunc: () => void) {
    TimerStart(this.handle, timeout, periodic, handlerFunc);
    return this;
  }

  /**
   * @bug Might crash the game if called when there is no expired timer.
   */
  public static fromExpired() {
    return this.fromHandle(GetExpiredTimer());
  }

  public static fromHandle(handle: timer | undefined): Timer | undefined {
    return handle ? this.getObject(handle) : undefined;
  }
}
