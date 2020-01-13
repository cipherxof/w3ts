/** @noSelfInFile **/

import { Handle } from "./handle";
import { MapPlayer } from "./player";

export class Item extends Handle<item> {

  constructor(itemid: number, x: number, y: number) {
    super(CreateItem, [itemid, x, y]);
  }

  get name() {
    return GetItemName(this.handle);
  }

  set name(value: string) {
    BlzSetItemName(this.handle, value);
  }

  public get typeId() {
    return GetItemTypeId(this.handle);
  }

  public get x() {
    return GetItemX(this.handle);
  }

  public set x(value: number) {
    SetItemPosition(this.handle, value, this.y);
  }

  public get y() {
    return GetItemY(this.handle);
  }

  public set y(value: number) {
    SetItemPosition(this.handle, this.x, value);
  }

  public set dropOnDeath(flag: boolean) {
    SetItemDropOnDeath(this.handle, flag);
  }

  public set droppable(flag: boolean) {
    SetItemDroppable(this.handle, flag);
  }

  public set pawnable(flag: boolean) {
    SetItemPawnable(this.handle, flag);
  }

  public set invulnerable(flag: boolean) {
    SetItemInvulnerable(this.handle, true);
  }

  public get invulnerable() {
    return IsItemInvulnerable(this.handle);
  }

  public get visible() {
    return IsItemVisible(this.handle);
  }

  public set visible(flag: boolean) {
    SetItemVisible(this.handle, flag);
  }

  public get level() {
    return GetItemLevel(this.handle);
  }

  public get type() {
    return GetItemType(this.handle);
  }

  public get charges() {
    return GetItemCharges(this.handle);
  }

  public set charges(value: number) {
    SetItemCharges(this.handle, value);
  }

  public get userData() {
    return GetItemUserData(this.handle);
  }

  public set userData(value: number) {
    SetItemUserData(this.handle, value);
  }

  public destroy() {
    RemoveItem(this.handle);
  }

  public get player() {
    return GetItemPlayer(this.handle);
  }

  public setPosition(x: number, y: number) {
    SetItemPosition(this.handle, x, y);
  }

  public setOwner(whichPlayer: MapPlayer, changeColor: boolean) {
    SetItemPlayer(this.handle, whichPlayer.handle, changeColor);
  }

  public isOwned() {
    return IsItemOwned(this.handle);
  }

  public isPowerup() {
    return IsItemPowerup(this.handle);
  }

  public isSellable() {
    return IsItemSellable(this.handle);
  }

  public isPawnable() {
    return IsItemPawnable(this.handle);
  }

  public setDropId(unitId: number) {
    SetItemDropID(this.handle, unitId);
  }

  public static isIdPowerup(itemId: number) {
    return IsItemIdPowerup(itemId);
  }

  public static isIdSellable(itemId: number) {
    return IsItemIdSellable(itemId);
  }

  public static isIdPawnable(itemId: number) {
    return IsItemIdPawnable(itemId);
  }

  public static fromHandle(handle: item): Item {
    return this.get(handle);
  }

}
