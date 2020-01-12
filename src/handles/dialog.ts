/** @noSelfInFile **/

import { Handle } from "./handle";

// native DialogCreate                 takes nothing returns dialog
// native DialogDestroy                takes dialog whichDialog returns nothing
// native DialogClear                  takes dialog whichDialog returns nothing
// native DialogSetMessage             takes dialog whichDialog, string messageText returns nothing
// native DialogAddButton              takes dialog whichDialog, string buttonText, integer hotkey returns button
// native DialogAddQuitButton          takes dialog whichDialog, boolean doScoreScreen, string buttonText, integer hotkey returns button
// native DialogDisplay                takes player whichPlayer, dialog whichDialog, boolean flag returns nothing

export class DialogButton extends Handle<button> {
  dialog: Dialog;

  constructor(whichDialog: Dialog, text: string, hotkey: number, quit: boolean = false, score: boolean = false) {
    if (! quit) {
      super(DialogAddButton, [whichDialog.handle, text, hotkey]);
    } else {
      super(DialogAddQuitButton, [whichDialog.handle, score, text, hotkey]);
    }
    this.dialog = whichDialog;
  }
}

export class Dialog extends Handle<dialog> {

  constructor() {
    super(DialogCreate, []);
  }

  public destroy() {
    DialogDestroy(this.handle);
  }

  public clear() {
    DialogClear(this.handle);
  }
  
  public display(whichPlayer: player, flag: boolean) {
    DialogDisplay(whichPlayer, this.handle, flag);
  }

  public set message(whichMessage: string) {
    DialogSetMessage(this.handle, whichMessage);
  }

  public static fromHandle(handle: dialog): Dialog {
    return this.get(handle);
  }
}
