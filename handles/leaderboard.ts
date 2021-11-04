/** @noSelfInFile */

import { Handle } from "./handle";
import { MapPlayer } from "./player";

export class Leaderboard extends Handle<leaderboard> {
  /**
   * @deprecated use `Leaderboard.create` instead.
   */
  constructor() {
    if (Handle.initFromHandle()) {
      super();
      return;
    }
    const handle = CreateLeaderboard();

    if (handle === undefined) {
      error("w3ts failed to create leaderboard handle.", 3);
    }

    super(handle);
  }

  /**
   * Create a Leaderboard object
   * @note Leaderboards initially have 0 rows, 0 columns, and no label.
   * @bug Do not use this in a global initialisation as it crashes the game there.
   */
  public static create(): Leaderboard | undefined {
    const handle = CreateLeaderboard();
    if (handle) {
      const obj = this.getObject(handle) as Leaderboard;

      const values: Record<string, unknown> = {};
      values.handle = handle;

      return Object.assign(obj, values);
    }
    return undefined;
  }

  public addItem(label: string, value: number, p: MapPlayer) {
    LeaderboardAddItem(this.handle, label, value, p.handle);
  }

  public clear() {
    LeaderboardClear(this.handle);
  }

  public destroy() {
    DestroyLeaderboard(this.handle);
  }

  public display(flag = true) {
    LeaderboardDisplay(this.handle, flag);
  }

  public get displayed() {
    return IsLeaderboardDisplayed(this.handle);
  }

  public get itemCount() {
    return LeaderboardGetItemCount(this.handle);
  }

  public set itemCount(count: number) {
    LeaderboardSetSizeByItemCount(this.handle, count);
  }

  public getPlayerIndex(p: MapPlayer) {
    return LeaderboardGetPlayerIndex(this.handle, p.handle);
  }

  public hasPlayerItem(p: MapPlayer) {
    LeaderboardHasPlayerItem(this.handle, p.handle);
  }

  public removeItem(index: number) {
    LeaderboardRemoveItem(this.handle, index);
  }

  public removePlayerItem(p: MapPlayer) {
    LeaderboardRemovePlayerItem(this.handle, p.handle);
  }

  public setItemLabel(item: number, label: string) {
    LeaderboardSetItemLabel(this.handle, item, label);
  }

  public setItemLabelColor(
    item: number,
    red: number,
    green: number,
    blue: number,
    alpha: number
  ) {
    LeaderboardSetItemLabelColor(this.handle, item, red, green, blue, alpha);
  }

  public setItemStyle(
    item: number,
    showLabel = true,
    showValues = true,
    showIcons = true
  ) {
    LeaderboardSetItemStyle(
      this.handle,
      item,
      showLabel,
      showValues,
      showIcons
    );
  }

  public setItemValue(item: number, value: number) {
    LeaderboardSetItemValue(this.handle, item, value);
  }

  public setItemValueColor(
    item: number,
    red: number,
    green: number,
    blue: number,
    alpha: number
  ) {
    LeaderboardSetItemValueColor(this.handle, item, red, green, blue, alpha);
  }

  public setLabelColor(
    red: number,
    green: number,
    blue: number,
    alpha: number
  ) {
    LeaderboardSetLabelColor(this.handle, red, green, blue, alpha);
  }

  public setPlayerBoard(p: MapPlayer) {
    PlayerSetLeaderboard(p.handle, this.handle);
  }

  public setStyle(
    showLabel = true,
    showNames = true,
    showValues = true,
    showIcons = true
  ) {
    LeaderboardSetStyle(
      this.handle,
      showLabel,
      showNames,
      showValues,
      showIcons
    );
  }

  public setValueColor(
    red: number,
    green: number,
    blue: number,
    alpha: number
  ) {
    LeaderboardSetValueColor(this.handle, red, green, blue, alpha);
  }

  public sortByLabel(asc = true) {
    LeaderboardSortItemsByLabel(this.handle, asc);
  }

  public sortByPlayer(asc = true) {
    LeaderboardSortItemsByPlayer(this.handle, asc);
  }

  public sortByValue(asc = true) {
    LeaderboardSortItemsByValue(this.handle, asc);
  }

  public set label(value: string) {
    LeaderboardSetLabel(this.handle, value);
  }

  public get label() {
    return LeaderboardGetLabelText(this.handle) ?? "";
  }

  public static fromHandle(
    handle: leaderboard | undefined
  ): Leaderboard | undefined {
    return handle ? this.getObject(handle) : undefined;
  }

  public static fromPlayer(p: MapPlayer) {
    return this.fromHandle(PlayerGetLeaderboard(p.handle));
  }
}
