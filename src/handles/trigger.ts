/** @noSelfInFile **/

import { Handle } from "./handle";
import { MapPlayer } from "./player";

export class Trigger extends Handle<trigger> {

  constructor() {
    super(CreateTrigger, []);
  }

  public static fromHandle(handle: trigger): Trigger {
    this.setDefaultHandle(handle);
    return new Trigger();
  }

  public destroy() {
    DestroyTrigger(this.handle);
  }

  public reset() {
    ResetTrigger(this.handle);
  }

  public set enabled(flag: boolean) {
    if (flag) {
      EnableTrigger(this.handle);
    } else {
      DisableTrigger(this.handle);
    }
  }

  public get enabled() {
    return IsTriggerEnabled(this.handle);
  }

  public set waitOnSleeps(flag: boolean) {
    TriggerWaitOnSleeps(this.handle, flag);
  }

  public get waitOnSleeps() {
    return IsTriggerWaitOnSleeps(this.handle);
  }

  public static fromEvent() {
    return Trigger.fromHandle(GetTriggeringTrigger());
  }

  public static getEventId() {
    return GetTriggerEventId();
  }

  public getEvalCount() {
    return GetTriggerEvalCount(this.handle);
  }

  public getExecCount() {
    return GetTriggerExecCount(this.handle);
  }

  public registerVariableEvent(varName: string, opcode: limitop, limitval: number) {
    return TriggerRegisterVariableEvent(this.handle, varName, opcode, limitval);
  }

  // Creates it's own timer and triggers when it expires
  public registerTimerEvent(timeout: number, periodic: boolean) {
    return TriggerRegisterTimerEvent(this.handle, timeout, periodic);
  }

  // Triggers when the timer you tell it about expires
  public registerTimerExpireEvent(t: timer) {
    return TriggerRegisterTimerExpireEvent(this.handle, t);
  }

  public registerGameStateEvent(whichState: gamestate, opcode: limitop, limitval: number) {
    return TriggerRegisterGameStateEvent(this.handle, whichState, opcode, limitval);
  }

  public registerDialogEvent(whichDialog: dialog) {
    return TriggerRegisterDialogEvent(this.handle, whichDialog);
  }

  public registerDialogButtonEvent(whichButton: button) {
    return TriggerRegisterDialogButtonEvent(this.handle, whichButton);
  }

  public registerPlayerEvent(whichPlayer: MapPlayer, whichPlayerEvent: playerevent) {
    return TriggerRegisterPlayerEvent(this.handle, whichPlayer.handle, whichPlayerEvent);
  }

  public registerPlayerUnitEvent(whichPlayer: MapPlayer, whichPlayerUnitEvent: playerunitevent, filter: boolexpr | null) {
    return TriggerRegisterPlayerUnitEvent(this.handle, whichPlayer.handle, whichPlayerUnitEvent, filter);
  }

  public registerAnyUnitEventBJ(whichPlayerUnitEvent: playerunitevent) {
    return TriggerRegisterAnyUnitEventBJ(this.handle, whichPlayerUnitEvent);
  }

  public registerPlayerMouseEvent(whichPlayer: MapPlayer, whichMouseEvent: number) {
    return TriggerRegisterPlayerMouseEventBJ(this.handle, whichPlayer.handle, whichMouseEvent);
  }

  public registerPlayerKeyEvent(whichPlayer: MapPlayer, whichKey: oskeytype, metaKey: number, fireOnKeyDown: boolean) {
    return BlzTriggerRegisterPlayerKeyEvent(this.handle, whichPlayer.handle, whichKey, metaKey, fireOnKeyDown);
  }

  public addAction(actionFunc: () => void) {
    return TriggerAddAction(this.handle, actionFunc);
  }

  public removeAction(whichAction: triggeraction) {
    return TriggerRemoveAction(this.handle, whichAction);
  }

  public removeActions() {
    return TriggerClearActions(this.handle);
  }

  public addCondition(condition: boolexpr) {
    return TriggerAddCondition(this.handle, condition);
  }

  public removeCondition(whichCondition: triggercondition) {
    return TriggerRemoveCondition(this.handle, whichCondition);
  }

  public removeConditions() {
    return TriggerClearConditions(this.handle);
  }

  public eval() {
    return TriggerEvaluate(this.handle);
  }

  public exec() {
    return TriggerExecute(this.handle);
  }

}
