/** @noSelfInFile */

import { Handle } from "./handle";
import { MapPlayer } from "./player";
import { Point } from "./point";
import { Widget } from "./widget";

export class Item extends Widget {
  public declare readonly handle: item;

  /**
   * @deprecated use `Item.create` instead.
   * @param itemId The rawcode of the item.
   * @param x The x-coordinate of the item
   * @param y The y-coordinate of the item
   * @param skinId  The skin ID of the item.
   */
  constructor(itemId: number, x: number, y: number, skinId?: number) {
    if (Handle.initFromHandle()) {
      super();
      return;
    }

    const handle =
      skinId === undefined
        ? CreateItem(itemId, x, y)
        : BlzCreateItemWithSkin(itemId, x, y, skinId);

    if (handle === undefined) {
      error("w3ts failed to create item handle.", 3);
    }

    super(handle);
  }

  /**
   * Creates an item object at the specified coordinates.
   * @param itemId The rawcode of the item.
   * @param x The x-coordinate of the item
   * @param y The y-coordinate of the item
   * @param skinId  The skin ID of the item.
   */
  public static create(
    itemId: number,
    x: number,
    y: number,
    skinId?: number
  ): Item | undefined {
    const handle =
      skinId === undefined
        ? CreateItem(itemId, x, y)
        : BlzCreateItemWithSkin(itemId, x, y, skinId);
    if (handle) {
      const obj = this.getObject(handle) as Item;

      const values: Record<string, unknown> = {};
      values.handle = handle;

      return Object.assign(obj, values);
    }
    return undefined;
  }

  public get charges() {
    return GetItemCharges(this.handle);
  }

  public set charges(value: number) {
    SetItemCharges(this.handle, value);
  }

  public set invulnerable(flag: boolean) {
    SetItemInvulnerable(this.handle, true);
  }

  public get invulnerable() {
    return IsItemInvulnerable(this.handle);
  }

  public get level() {
    return GetItemLevel(this.handle);
  }

  /**
   * @async
   */
  get description() {
    return BlzGetItemDescription(this.handle) ?? "";
  }

  set description(description: string) {
    BlzSetItemDescription(this.handle, description);
  }

  /**
   * @async
   */
  get extendedTooltip() {
    return BlzGetItemExtendedTooltip(this.handle) ?? "";
  }

  set extendedTooltip(tooltip: string) {
    BlzSetItemExtendedTooltip(this.handle, tooltip);
  }

  /**
   * @async
   */
  get icon() {
    return BlzGetItemIconPath(this.handle) ?? "";
  }

  set icon(path: string) {
    BlzSetItemIconPath(this.handle, path);
  }

  /**
   * @async
   */
  get name() {
    return GetItemName(this.handle) ?? "";
  }

  set name(value: string) {
    BlzSetItemName(this.handle, value);
  }

  /**
   * @async
   */
  get tooltip() {
    return BlzGetItemTooltip(this.handle) ?? "";
  }

  set tooltip(tooltip: string) {
    BlzSetItemTooltip(this.handle, tooltip);
  }

  public get pawnable() {
    return IsItemPawnable(this.handle);
  }

  public set pawnable(flag: boolean) {
    SetItemPawnable(this.handle, flag);
  }

  public get player() {
    return GetItemPlayer(this.handle);
  }

  public get type() {
    return GetItemType(this.handle);
  }

  public get typeId() {
    return GetItemTypeId(this.handle);
  }

  public get userData() {
    return GetItemUserData(this.handle);
  }

  public set userData(value: number) {
    SetItemUserData(this.handle, value);
  }

  public get visible() {
    return IsItemVisible(this.handle);
  }

  public set visible(flag: boolean) {
    SetItemVisible(this.handle, flag);
  }

  public get skin() {
    return BlzGetItemSkin(this.handle);
  }

  public set skin(skinId: number) {
    BlzSetItemSkin(this.handle, skinId);
  }

  public override get x() {
    return GetItemX(this.handle);
  }

  public override set x(value: number) {
    SetItemPosition(this.handle, value, this.y);
  }

  public override get y() {
    return GetItemY(this.handle);
  }

  public override set y(value: number) {
    SetItemPosition(this.handle, this.x, value);
  }

  public addAbility(abilCode: number) {
    BlzItemAddAbility(this.handle, abilCode);
  }

  public getAbility(abilCode: number) {
    return BlzGetItemAbility(this.handle, abilCode);
  }

  public getAbilityByIndex(index: number) {
    return BlzGetItemAbilityByIndex(this.handle, index);
  }

  public removeAbility(abilCode: number) {
    BlzItemRemoveAbility(this.handle, abilCode);
  }

  public destroy() {
    RemoveItem(this.handle);
  }

  public getField(
    field: itembooleanfield | itemintegerfield | itemrealfield | itemstringfield
  ) {
    const fieldType = field.toString().substr(0, field.toString().indexOf(":"));

    switch (fieldType) {
      case "unitbooleanfield":
        return BlzGetItemBooleanField(this.handle, field as itembooleanfield);
      case "unitintegerfield":
        return BlzGetItemIntegerField(this.handle, field as itemintegerfield);
      case "unitrealfield":
        return BlzGetItemRealField(this.handle, field as itemrealfield);
      case "unitstringfield":
        return BlzGetItemStringField(this.handle, field as itemstringfield);
      default:
        return 0;
    }
  }

  public isOwned() {
    return IsItemOwned(this.handle);
  }

  public isPawnable() {
    return IsItemPawnable(this.handle);
  }

  public isPowerup() {
    return IsItemPowerup(this.handle);
  }

  public isSellable() {
    return IsItemSellable(this.handle);
  }

  public setDropId(unitId: number) {
    SetItemDropID(this.handle, unitId);
  }

  public setDropOnDeath(flag: boolean) {
    SetItemDropOnDeath(this.handle, flag);
  }

  public setDroppable(flag: boolean) {
    SetItemDroppable(this.handle, flag);
  }

  public setField(
    field:
      | itembooleanfield
      | itemintegerfield
      | itemrealfield
      | itemstringfield,
    value: boolean | number | string
  ) {
    const fieldType = field.toString().substr(0, field.toString().indexOf(":"));

    if (fieldType === "unitbooleanfield" && typeof value === "boolean") {
      return BlzSetItemBooleanField(
        this.handle,
        field as itembooleanfield,
        value
      );
    }
    if (fieldType === "unitintegerfield" && typeof value === "number") {
      return BlzSetItemIntegerField(
        this.handle,
        field as itemintegerfield,
        value
      );
    }
    if (fieldType === "unitrealfield" && typeof value === "number") {
      return BlzSetItemRealField(this.handle, field as itemrealfield, value);
    }
    if (fieldType === "unitstringfield" && typeof value === "string") {
      return BlzSetItemStringField(
        this.handle,
        field as itemstringfield,
        value
      );
    }

    return false;
  }

  public setOwner(whichPlayer: MapPlayer, changeColor: boolean) {
    SetItemPlayer(this.handle, whichPlayer.handle, changeColor);
  }

  public setPoint(whichPoint: Point) {
    SetItemPosition(this.handle, whichPoint.x, whichPoint.y);
  }

  public setPosition(x: number, y: number) {
    SetItemPosition(this.handle, x, y);
  }

  public static override fromEvent() {
    return this.fromHandle(GetManipulatedItem());
  }

  public static override fromHandle(
    handle: item | undefined
  ): Item | undefined {
    return handle ? this.getObject(handle) : undefined;
  }

  public static isIdPawnable(itemId: number) {
    return IsItemIdPawnable(itemId);
  }

  public static isIdPowerup(itemId: number) {
    return IsItemIdPowerup(itemId);
  }

  public static isIdSellable(itemId: number) {
    return IsItemIdSellable(itemId);
  }
}
