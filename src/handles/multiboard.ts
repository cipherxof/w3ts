/** @noSelfInFile **/

import { Handle } from "./handle";

export class MultiboardItem extends Handle<multiboarditem> {

  constructor(board: Multiboard, x: number, y: number) {
    super(Handle.initFromHandle() ? undefined : MultiboardGetItem(board.handle, x -1, y -1));
  }

  public destroy() {
    MultiboardReleaseItem(this.handle);
  }

  public setStyle(showValue: boolean, showIcon: boolean) {
    MultiboardSetItemStyle(this.handle, showValue, showIcon);
  }

  public set value(val: string) {
    MultiboardSetItemValue(this.handle, val);
  }

  public setValueColor(red: number, green: number, blue: number, alpha: number) {
    MultiboardSetItemValueColor(this.handle, red, green, blue, alpha);
  }
  
  public set width(width: number) {
    MultiboardSetItemWidth(this.handle, width);
  }
  
  public set icon(icon: string) {
    MultiboardSetItemIcon(this.handle, icon);
  }

  public static fromHandle(handle: multiboarditem): MultiboardItem {
    return this.getObject(handle);
  }
}

export class Multiboard extends Handle<multiboard> {

  constructor() {
    super(Handle.initFromHandle() ? undefined : CreateMultiboard());
  }

  public destroy() {
    DestroyMultiboard(this.handle);
  }

  public display(show: boolean) {
    MultiboardDisplay(this.handle, show);
  }

  public get displayed() {
    return IsMultiboardDisplayed(this.handle);
  }

  public minimize(flag: boolean) {
    MultiboardMinimize(this.handle, flag);
  }

  public minimized() {
    return IsMultiboardMinimized(this.handle);
  }

  public clear() {
    MultiboardClear(this.handle);
  }

  public set titleText(label: string) {
    MultiboardSetTitleText(this.handle, label);
  }

  public get titleText() {
    return MultiboardGetTitleText(this.handle);
  }

  public setTitleTextColor(red: number, green: number, blue: number, alpha: number) {
    MultiboardSetTitleTextColor(this.handle, red, green, blue, alpha);
  }

  public get rowCount() {
    return MultiboardGetRowCount(this.handle);
  }

  public get columnCount() {
    return MultiboardGetColumnCount(this.handle);
  }

  public set columnCount(count: number) {
    MultiboardSetColumnCount(this.handle, count);
  }

  public set rowCount(count: number) {
    MultiboardSetRowCount(this.handle, count);
  }

  public setItemsStyle(showValues: boolean, showIcons: boolean) {
    MultiboardSetItemsStyle(this.handle, showValues, showIcons);
  }

  public setItemsValue(value: string) {
    MultiboardSetItemsValue(this.handle, value);
  }
  
  public setItemsValueColor(red: number, green: number, blue: number, alpha: number) {
    MultiboardSetItemsValueColor(this.handle, red, green, blue, alpha);
  }

  public setItemsWidth(width: number) {
    MultiboardSetItemsWidth(this.handle, width);
  }
  
  public setItemsIcons(icon: string) {
    MultiboardSetItemsIcon(this.handle, icon);
  }
  
  public getItem(x: number, y: number) {
    return new MultiboardItem(this, x, y);
  }

  public static suppressDisplay(flag: boolean) {
    MultiboardSuppressDisplay(flag);
  }

  public static fromHandle(handle: multiboard): Multiboard {
    return this.getObject(handle);
  }
}
