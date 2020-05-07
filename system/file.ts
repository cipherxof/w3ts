export class File {

  // The ability used to read and write data.
  private static dummyAbility: number = FourCC("Amls");

  // The string limit per Preload call.
  private static preloadLimit = 259;

  private constructor() { }

  /**
  * Read text from a file.
  * @param filename Filename of the file.
  */
  public static read(filename: string): string | undefined {
    const originalIcon = BlzGetAbilityIcon(this.dummyAbility);
    Preloader(filename);
    const preloadText = BlzGetAbilityIcon(this.dummyAbility);
    BlzSetAbilityIcon(this.dummyAbility, originalIcon);
    if (preloadText !== originalIcon) {
      return preloadText;
    }
  }

  /**
   * Write text to a file with the option to not include boilerplate for reading the file back.
   * @param filename Filename of the file.
   * @param contents Contents to write to the file.
   */
  public static writeRaw(filename: string, contents: string, allowReading = false): File {
    PreloadGenClear();
    PreloadGenStart();

    if (allowReading) {
      Preload(`\")\n//! beginusercode\nlocal o=''\nPreload=function(s)o=o..s end\nPreloadEnd=function()end\n//!endusercode\n//`);
    }

    for (let i = 0; i < (contents.length / File.preloadLimit); i++) {
      Preload(`${contents.substr(i * File.preloadLimit, File.preloadLimit)}`);
    }

    if (allowReading) {
      Preload(`\")\n//! beginusercode\nBlzSetAbilityIcon(${this.dummyAbility},o)\n//!endusercode\n//`);
    }

    PreloadGenEnd(filename);

    return this;
  }

  /**
   * Write text to a file.
   * @param filename Filename of the file.
   * @param contents Contents to write to the file.
   */
  public static write(filename: string, contents: string): File {
    return this.writeRaw(filename, contents, true);
  }
}
