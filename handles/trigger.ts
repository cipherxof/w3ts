/** @noSelfInFile **/

import { Dialog, DialogButton } from "./dialog";
import { Frame } from "./frame";
import { Handle } from "./handle";
import { MapPlayer } from "./player";
import { Unit } from "./unit";
import { Widget } from "./widget";

export class Trigger extends Handle<trigger> {

  constructor() {
    if (Handle.initFromHandle()) {
      super();
    } else {
      super(CreateTrigger());
    }
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

  public get evalCount() {
    return GetTriggerEvalCount(this.handle);
  }

  public static get eventId() {
    return GetTriggerEventId();
  }

  public get execCount() {
    return GetTriggerExecCount(this.handle);
  }

  public set waitOnSleeps(flag: boolean) {
    TriggerWaitOnSleeps(this.handle, flag);
  }

  public get waitOnSleeps() {
    return IsTriggerWaitOnSleeps(this.handle);
  }

  public addAction(actionFunc: () => void) {
    return TriggerAddAction(this.handle, actionFunc);
  }

  public addCondition(condition: boolexpr | (() => boolean)) {
    return TriggerAddCondition(this.handle, condition);
  }

  public destroy() {
    DestroyTrigger(this.handle);
  }

  public eval() {
    return TriggerEvaluate(this.handle);
  }

  public exec() {
    return TriggerExecute(this.handle);
  }

  public registerAnyUnitEvent(whichPlayerUnitEvent: playerunitevent) {
    return TriggerRegisterAnyUnitEventBJ(this.handle, whichPlayerUnitEvent);
  }

  public registerCommandEvent(whichAbility: number, order: string) {
    return TriggerRegisterCommandEvent(this.handle, whichAbility, order);
  }

  public registerDeathEvent(whichWidget: Widget) {
    return TriggerRegisterDeathEvent(this.handle, whichWidget.handle);
  }

  public registerDialogButtonEvent(whichButton: DialogButton) {
    return TriggerRegisterDialogButtonEvent(this.handle, whichButton.handle);
  }

  public registerDialogEvent(whichDialog: Dialog) {
    return TriggerRegisterDialogEvent(this.handle, whichDialog.handle);
  }

  public registerEnterRegion(whichRegion: region, filter: boolexpr | (() => boolean) | null) {
    return TriggerRegisterEnterRegion(this.handle, whichRegion, filter);
  }

  public registerFilterUnitEvent(whichUnit: unit, whichEvent: unitevent, filter: boolexpr | (() => boolean) | null) {
    return TriggerRegisterFilterUnitEvent(this.handle, whichUnit, whichEvent, filter);
  }

  public registerGameEvent(whichGameEvent: gameevent) {
    return TriggerRegisterGameEvent(this.handle, whichGameEvent);
  }

  public registerGameStateEvent(whichState: gamestate, opcode: limitop, limitval: number) {
    return TriggerRegisterGameStateEvent(this.handle, whichState, opcode, limitval);
  }

  public registerLeaveRegion(whichRegion: region, filter: boolexpr | (() => boolean) | null) {
    return TriggerRegisterLeaveRegion(this.handle, whichRegion, filter);
  }

  public registerPlayerAllianceChange(whichPlayer: MapPlayer, whichAlliance: alliancetype) {
    return TriggerRegisterPlayerAllianceChange(this.handle, whichPlayer.handle, whichAlliance);
  }

  public registerPlayerChatEvent(whichPlayer: MapPlayer, chatMessageToDetect: string, exactMatchOnly: boolean) {
    return TriggerRegisterPlayerChatEvent(this.handle, whichPlayer.handle, chatMessageToDetect, exactMatchOnly);
  }

  public registerPlayerEvent(whichPlayer: MapPlayer, whichPlayerEvent: playerevent) {
    return TriggerRegisterPlayerEvent(this.handle, whichPlayer.handle, whichPlayerEvent);
  }

  public registerPlayerKeyEvent(whichPlayer: MapPlayer, whichKey: oskeytype, metaKey: number, fireOnKeyDown: boolean) {
    return BlzTriggerRegisterPlayerKeyEvent(this.handle, whichPlayer.handle, whichKey, metaKey, fireOnKeyDown);
  }

  public registerPlayerMouseEvent(whichPlayer: MapPlayer, whichMouseEvent: number) {
    return TriggerRegisterPlayerMouseEventBJ(this.handle, whichPlayer.handle, whichMouseEvent);
  }

  public registerPlayerStateEvent(whichPlayer: MapPlayer, whichState: playerstate, opcode: limitop, limitval: number) {
    return TriggerRegisterPlayerStateEvent(this.handle, whichPlayer.handle, whichState, opcode, limitval);
  }

  public registerPlayerSyncEvent(whichPlayer: MapPlayer, prefix: string, fromServer: boolean) {
    return BlzTriggerRegisterPlayerSyncEvent(this.handle, whichPlayer.handle, prefix, fromServer);
  }

  public registerPlayerUnitEvent(whichPlayer: MapPlayer, whichPlayerUnitEvent: playerunitevent, filter: boolexpr | (() => boolean) | null) {
    return TriggerRegisterPlayerUnitEvent(this.handle, whichPlayer.handle, whichPlayerUnitEvent, filter);
  }

  // Creates it's own timer and triggers when it expires
  public registerTimerEvent(timeout: number, periodic: boolean) {
    return TriggerRegisterTimerEvent(this.handle, timeout, periodic);
  }

  // Triggers when the timer you tell it about expires
  public registerTimerExpireEvent(t: timer) {
    return TriggerRegisterTimerExpireEvent(this.handle, t);
  }

  public registerTrackableHitEvent(whichTrackable: trackable) {
    return TriggerRegisterTrackableHitEvent(this.handle, whichTrackable);
  }

  public registerTrackableTrackEvent(whichTrackable: trackable) {
    return TriggerRegisterTrackableTrackEvent(this.handle, whichTrackable);
  }

  public registerUnitEvent(whichUnit: Unit, whichEvent: unitevent) {
    return TriggerRegisterUnitEvent(this.handle, whichUnit.handle, whichEvent);
  }

  public registerUnitInRage(whichUnit: unit, range: number, filter: boolexpr | (() => boolean) | null) {
    return TriggerRegisterUnitInRange(this.handle, whichUnit, range, filter);
  }

  public registerUnitStateEvent(whichUnit: Unit, whichState: unitstate, opcode: limitop, limitval: number) {
    return TriggerRegisterUnitStateEvent(this.handle, whichUnit.handle, whichState, opcode, limitval);
  }

  public registerUpgradeCommandEvent(whichUpgrade: number) {
    return TriggerRegisterUpgradeCommandEvent(this.handle, whichUpgrade);
  }

  public registerVariableEvent(varName: string, opcode: limitop, limitval: number) {
    return TriggerRegisterVariableEvent(this.handle, varName, opcode, limitval);
  }

  public removeAction(whichAction: triggeraction) {
    return TriggerRemoveAction(this.handle, whichAction);
  }

  public removeActions() {
    return TriggerClearActions(this.handle);
  }

  public removeCondition(whichCondition: triggercondition) {
    return TriggerRemoveCondition(this.handle, whichCondition);
  }

  public removeConditions() {
    return TriggerClearConditions(this.handle);
  }

  public reset() {
    ResetTrigger(this.handle);
  }

  public triggerRegisterFrameEvent(frame: Frame, eventId: frameeventtype) {
    return BlzTriggerRegisterFrameEvent(this.handle, frame.handle, eventId);
  }

  public static fromEvent() {
    return this.fromHandle(GetTriggeringTrigger());
  }

  public static fromHandle(handle: trigger): Trigger {
    return this.getObject(handle);
  }

}
