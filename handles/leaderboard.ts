/** @noSelfInFile **/

import { Handle } from "./handle";
import { MapPlayer } from "./player";

export class Leaderboard extends Handle<leaderboard> {

  constructor() {
    if (Handle.initFromHandle()) {
      super();
    } else {
      super(CreateLeaderboard());
    }
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

  public display(flag: boolean = true) {
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

  public setItemLabelColor(item: number, red: number, green: number, blue: number, alpha: number) {
    LeaderboardSetItemLabelColor(this.handle, item, red, green, blue, alpha);
  }

  public setItemStyle(item: number, showLabel: boolean = true, showValues: boolean = true, showIcons: boolean = true) {
    LeaderboardSetItemStyle(this.handle, item, showLabel, showValues, showIcons);
  }

  public setItemValue(item: number, value: number) {
    LeaderboardSetItemValue(this.handle, item, value);
  }

  public setItemValueColor(item: number, red: number, green: number, blue: number, alpha: number) {
    LeaderboardSetItemValueColor(this.handle, item, red, green, blue, alpha);
  }

  public setLabelColor(red: number, green: number, blue: number, alpha: number) {
    LeaderboardSetLabelColor(this.handle, red, green, blue, alpha);
  }

  public setPlayerBoard(p: MapPlayer) {
    PlayerSetLeaderboard(p.handle, this.handle);
  }

  public setStyle(showLabel: boolean = true, showNames: boolean = true, showValues: boolean = true, showIcons: boolean = true) {
    LeaderboardSetStyle(this.handle, showLabel, showNames, showValues, showIcons);
  }

  public setValueColor(red: number, green: number, blue: number, alpha: number) {
    LeaderboardSetValueColor(this.handle, red, green, blue, alpha);
  }

  public sortByLabel(asc: boolean = true) {
    LeaderboardSortItemsByLabel(this.handle, asc);
  }

  public sortByPlayer(asc: boolean = true) {
    LeaderboardSortItemsByPlayer(this.handle, asc);
  }

  public sortByValue(asc: boolean = true) {
    LeaderboardSortItemsByValue(this.handle, asc);
  }

  public set label(value: string) {
    LeaderboardSetLabel(this.handle, value);
  }

  public get label() {
    return LeaderboardGetLabelText(this.handle);
  }

  public static fromHandle(handle: leaderboard): Leaderboard {
    return this.getObject(handle);
  }

  public static fromPlayer(p: MapPlayer) {
    return this.fromHandle(PlayerGetLeaderboard(p.handle));
  }
}
