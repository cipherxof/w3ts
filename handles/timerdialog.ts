import { Handle } from "./handle";
import { Timer } from "./timer";

export class TimerDialog extends Handle<timerdialog> {

  constructor(t: Timer) {
    super(Handle.initFromHandle() ? undefined : CreateTimerDialog(t.handle));
  }

  public destroy() {
    DestroyTimerDialog(this.handle);
  }

  public setTitle(title: string) {
    TimerDialogSetTitle(this.handle, title);
  }

  public setSpeed(speedMultFactor: number) {
    TimerDialogSetSpeed(this.handle, speedMultFactor);
  }

  public get display() {
    return IsTimerDialogDisplayed(this.handle);
  }

  public set display(display: boolean) {
    TimerDialogDisplay(this.handle, display);
  }

  public setTimeRemaining(value: number) {
    TimerDialogSetRealTimeRemaining(this.handle, value);
  }

  public static fromHandle(handle: timerdialog): TimerDialog {
    return this.getObject(handle);
  }

}
