/** @noSelfInFile **/

import { Handle } from "./handle";
import { Rectangle } from "./rect";

export class WeatherEffect extends Handle<weathereffect> {
  /**
   * Adds a weather effect.
   * @param where The rect to apply the WeatherEffect to.
   * @param effectID Which effect to apply.
   * @note To understand more about weather effects nature, I advise to read
   * Ammorth's article about weather effects: http://www.wc3c.net/showthread.php?t=91176.
   * @note To get an idea on how to add your own weather effects, you may read
   * CryoniC's article about custom weather effects: http://www.wc3c.net/showthread.php?t=67949.
   */
  constructor(where: Rectangle, effectID: number) {
    if (Handle.initFromHandle()) {
      super();
    } else {
      super(AddWeatherEffect(where.handle, effectID));
    }
  }

  public destroy() {
    RemoveWeatherEffect(this.handle);
  }

  public enable(flag: boolean) {
    EnableWeatherEffect(this.handle, flag);
  }

  public static fromHandle(handle: weathereffect): WeatherEffect {
    return this.getObject(handle);
  }
}
