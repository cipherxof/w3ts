/** @noSelfInFile */

import { Handle } from "./handle";

export class QuestItem extends Handle<questitem> {
  public readonly quest?: Quest;

  /** @deprecated use `QuestItem.create` instead. */
  constructor(whichQuest: Quest) {
    if (Handle.initFromHandle()) {
      super();
      return;
    }
    const handle = QuestCreateItem(whichQuest.handle);
    if (handle === undefined) {
      error("w3ts failed to create questitem handle.", 3);
    }
    super(handle);
    this.quest = whichQuest;
  }

  public static create(whichQuest: Quest): QuestItem | undefined {
    const handle = QuestCreateItem(whichQuest.handle);
    if (handle) {
      const obj = this.getObject(handle) as QuestItem;

      const values: Record<string, unknown> = {};
      values.handle = handle;
      values.quest = whichQuest;

      return Object.assign(obj, values);
    }
    return undefined;
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
  /**
   * @deprecated use `Quest.create` instead.
   * @bug Do not use this in a global initialisation as it crashes the game there.
   */
  constructor() {
    if (Handle.initFromHandle()) {
      super();
      return;
    }
    const handle = CreateQuest();
    if (handle === undefined) {
      error("w3ts failed to create quest handle.", 3);
    }
    super(handle);
  }

  /**
   * @bug Do not use this in a global initialisation as it crashes the game there.
   */
  public static create(): Quest | undefined {
    const handle = CreateQuest();
    if (handle) {
      const obj = this.getObject(handle) as Quest;

      const values: Record<string, unknown> = {};
      values.handle = handle;

      return Object.assign(obj, values);
    }
    return undefined;
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
    const questItem = QuestItem.create(this);

    questItem?.setDescription(description);

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

  public static fromHandle(handle: quest | undefined): Quest | undefined {
    return handle ? this.getObject(handle) : undefined;
  }
}
