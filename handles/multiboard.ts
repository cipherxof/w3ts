/** @noSelfInFile */

import { Handle } from "./handle";

export class MultiboardItem extends Handle<multiboarditem> {
  /**
   * @deprecated use `MultiboardItem.create` instead.
   */
  constructor(board: Multiboard, x: number, y: number) {
    if (Handle.initFromHandle()) {
      super();
      return;
    }
    const handle = MultiboardGetItem(board.handle, x - 1, y - 1);
    if (handle === undefined) {
      error("w3ts failed to create multiboarditem handle.", 3);
    }
    super(handle);
  }

  public static create(
    board: Multiboard,
    x: number,
    y: number
  ) {
    const handle = MultiboardGetItem(board.handle, x - 1, y - 1);
    return this.fromHandle(handle);
  }

  public destroy() {
    MultiboardReleaseItem(this.handle);
  }

  public setIcon(icon: string) {
    MultiboardSetItemIcon(this.handle, icon);
  }

  public setStyle(showValue: boolean, showIcon: boolean) {
    MultiboardSetItemStyle(this.handle, showValue, showIcon);
  }

  public setValue(val: string) {
    MultiboardSetItemValue(this.handle, val);
  }

  public setValueColor(
    red: number,
    green: number,
    blue: number,
    alpha: number
  ) {
    MultiboardSetItemValueColor(this.handle, red, green, blue, alpha);
  }

  public setWidth(width: number) {
    MultiboardSetItemWidth(this.handle, width);
  }
}

export class Multiboard extends Handle<multiboard> {
  /**
   * @deprecated use `Multiboard.create` instead.
   * @bug Do not use this in a global initialisation as it crashes the game there.
   */
  constructor() {
    if (Handle.initFromHandle()) {
      super();
      return;
    }
    const handle = CreateMultiboard();
    if (handle === undefined) {
      error("w3ts failed to create multiboard handle.", 3);
    }
    super(handle);
  }

  /**
   * Create a Multiboard object
   * @bug Do not use this in a global initialisation as it crashes the game there.
   */
  public static create() {
    return this.fromHandle(CreateMultiboard());
  }

  public get columns() {
    return MultiboardGetColumnCount(this.handle);
  }

  public set columns(count: number) {
    MultiboardSetColumnCount(this.handle, count);
  }

  public get displayed() {
    return IsMultiboardDisplayed(this.handle);
  }

  public get rows() {
    return MultiboardGetRowCount(this.handle);
  }

  /**
   * @bug It is only safe to change the row count by one. Use multiple calls for bigger values.
   */
  public set rows(count: number) {
    MultiboardSetRowCount(this.handle, count);
  }

  public set title(label: string) {
    MultiboardSetTitleText(this.handle, label);
  }

  public get title() {
    return MultiboardGetTitleText(this.handle) ?? "";
  }

  public clear() {
    MultiboardClear(this.handle);
  }

  public createItem(x: number, y: number) {
    return MultiboardItem.create(this, x, y);
  }

  public destroy() {
    DestroyMultiboard(this.handle);
  }

  /**
   * @note Multiboards can not be shown at map-init. Use a wait or a zero-timer to display as soon as possible.
   */
  public display(show: boolean) {
    MultiboardDisplay(this.handle, show);
  }

  public minimize(flag: boolean) {
    MultiboardMinimize(this.handle, flag);
  }

  /**
   * @async
   */
  public minimized() {
    return IsMultiboardMinimized(this.handle);
  }

  public setItemsIcons(icon: string) {
    MultiboardSetItemsIcon(this.handle, icon);
  }

  public setItemsStyle(showValues: boolean, showIcons: boolean) {
    MultiboardSetItemsStyle(this.handle, showValues, showIcons);
  }

  public setItemsValue(value: string) {
    MultiboardSetItemsValue(this.handle, value);
  }

  public setItemsValueColor(
    red: number,
    green: number,
    blue: number,
    alpha: number
  ) {
    MultiboardSetItemsValueColor(this.handle, red, green, blue, alpha);
  }

  public setItemsWidth(width: number) {
    MultiboardSetItemsWidth(this.handle, width);
  }

  public setTitleTextColor(
    red: number,
    green: number,
    blue: number,
    alpha: number
  ) {
    MultiboardSetTitleTextColor(this.handle, red, green, blue, alpha);
  }

  /**
   * Meant to unequivocally suspend display of existing and subsequently displayed multiboards.
   */
  public static suppressDisplay(flag: boolean) {
    MultiboardSuppressDisplay(flag);
  }
}
