import { Handle } from "./handle";

export class QuestItem extends Handle<questitem> {

  constructor(whichQuest: Quest) {
    super(Handle.initFromHandle() ? undefined : QuestCreateItem(whichQuest.handle));
  }

  public set description(description: string) {
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

  public set description(description: string) {
    QuestSetDescription(this.handle, description);
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

  public set icon(iconPath: string) {
    QuestSetIconPath(this.handle, iconPath);
  }

  public get required() {
    return IsQuestRequired(this.handle);
  }

  public set required(required: boolean) {
    QuestSetRequired(this.handle, required);
  }

  public set title(title: string) {
    QuestSetTitle(this.handle, title);
  }

  public addItem(description: string) {
    const item = new QuestItem(this);

    item.description = description;

    return item;
  }

  public destroy() {
    DestroyQuest(this.handle);
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
