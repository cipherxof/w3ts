/** @noSelfInFile */

import { Handle } from "./handle";
import { MapPlayer } from "./player";

export class DialogButton extends Handle<button> {
  constructor(
    whichDialog: Dialog,
    text: string,
    hotkey = 0,
    quit = false,
    score = false
  ) {
    if (Handle.initFromHandle()) {
      super();
    } else if (quit === false) {
      super(DialogAddButton(whichDialog.handle, text, hotkey));
    } else {
      super(DialogAddQuitButton(whichDialog.handle, score, text, hotkey));
    }
  }

  public static fromEvent() {
    return this.fromHandle(GetClickedButton());
  }

  public static fromHandle(
    handle: button | undefined
  ): DialogButton | undefined {
    return handle ? this.getObject(handle) : undefined;
  }
}

export class Dialog extends Handle<dialog> {
  constructor() {
    super(Handle.initFromHandle() ? undefined : DialogCreate());
  }

  public addButton(text: string, hotkey = 0, quit = false, score = false) {
    return new DialogButton(this, text, hotkey, quit, score);
  }

  public clear() {
    DialogClear(this.handle);
  }

  public destroy() {
    DialogDestroy(this.handle);
  }

  /**
   * @note Dialogs can not be shown at map-init. Use a wait or a zero-timer to display as soon as possible.
   */
  public display(whichPlayer: MapPlayer, flag: boolean) {
    DialogDisplay(whichPlayer.handle, this.handle, flag);
  }

  public setMessage(whichMessage: string) {
    DialogSetMessage(this.handle, whichMessage);
  }

  public static fromEvent() {
    return this.fromHandle(GetClickedDialog());
  }

  public static fromHandle(handle: dialog | undefined): Dialog | undefined {
    return handle ? this.getObject(handle) : undefined;
  }
}
