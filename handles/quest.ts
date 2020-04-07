/** @noSelfInFile **/

import { Handle } from "./handle";

export class QuestItem extends Handle<questitem> {

  constructor(whichQuest: Quest) {
    if (Handle.initFromHandle()) {
      super();
    } else {
      super(QuestCreateItem(whichQuest.handle));
    }
  }

  public setDescription(description: string) {
    QuestItemSetDescription(this.handle, description);
  }

  public get completed() {
    return IsQuestItemCompleted(this.handle);
  }

  public set completed(completed: boolean) {
    QuestItemSetCompleted(this.handle, completed);
  }
}

export class Quest extends Handle<quest> {

  constructor() {
    super(Handle.initFromHandle() ? undefined : CreateQuest());
  }

  public get completed() {
    return IsQuestCompleted(this.handle);
  }

  public set completed(completed: boolean) {
    QuestSetCompleted(this.handle, completed);
  }

  public get discovered() {
    return IsQuestDiscovered(this.handle);
  }

  public set discovered(discovered: boolean) {
    QuestSetDiscovered(this.handle, discovered);
  }

  public get enabled() {
    return IsQuestEnabled(this.handle);
  }

  public set enabled(enabled: boolean) {
    QuestSetEnabled(this.handle, enabled);
  }

  public get failed() {
    return IsQuestFailed(this.handle);
  }

  public set failed(failed: boolean) {
    QuestSetFailed(this.handle, failed);
  }

  public get required() {
    return IsQuestRequired(this.handle);
  }

  public set required(required: boolean) {
    QuestSetRequired(this.handle, required);
  }

  public addItem(description: string) {
    const questItem = new QuestItem(this);

    questItem.setDescription(description);

    return questItem;
  }

  public destroy() {
    DestroyQuest(this.handle);
  }

  public setDescription(description: string) {
    QuestSetDescription(this.handle, description);
  }

  public setIcon(iconPath: string) {
    QuestSetIconPath(this.handle, iconPath);
  }

  public setTitle(title: string) {
    QuestSetTitle(this.handle, title);
  }

  public static flashQuestDialogButton() {
    FlashQuestDialogButton();
  }

  public static forceQuestDialogUpdate() {
    ForceQuestDialogUpdate();
  }

  public static fromHandle(handle: quest): Quest {
    return this.getObject(handle);
  }

}
