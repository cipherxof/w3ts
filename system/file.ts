/**
 * A system which provides the ability to read and write files. There are no standard IO natives
 * so this system relies on an exploit which ended up being sanctioned by Blizzard, and because of this
 * there are some caveats.
 *
 * - All files are confined to the `Documents\Warcraft III\CustomMapData` folder.
 * - The only allowed file extensions are `.txt` and `.pld`.
 * - Generated files contain boilerplate JASS code.
 * - You cannot delete files but you can empty their contents.
 * @example
 * ```ts
 * // Write to the file
 * File.write("data.txt", "Hello world!");
 *
 * // Read it's contents
 * const contents = File.read("data.txt");
 *
 * // Display the contents
 * if (contents) {
 *  print(contents);
 * }
 * ```
 */
export class File {
  // The ability used to read and write data.
  private static dummyAbility: number = FourCC("Amls");

  // The string limit per Preload call.
  private static preloadLimit = 259;

  private constructor() {}

  /**
   * Character we use for escape sequences. Avoiding `\` since it is
   * automatically escaped by `Preload`.
   */
  private static escapeCharacter = String.fromCharCode(27);
  private static escapedSelf = File.escapeCharacter + File.escapeCharacter;
  private static escapedQuote = File.escapeCharacter + "q";

  /**
   * Escapes the double quote character, which would otherwise bork file
   * reading.
   */
  private static escape(contents: string) {
    contents = string.gsub(contents, File.escapeCharacter, File.escapedSelf)[0];
    contents = string.gsub(contents, '"', File.escapedQuote)[0];
    return contents;
  }

  /**
   * Undos File.escape, returning a string back to its original form.
   */
  private static unescape(contents: string) {
    contents = string.gsub(contents, File.escapedQuote, '"')[0];
    contents = string.gsub(contents, File.escapedSelf, File.escapeCharacter)[0];
    return contents;
  }

  /**
   * Read text from a file inside of the CustomMapData folder.
   * @param filename The name of the file to read.
   * @returns Returns undefined when the file could not be read.
   */
  public static read(filename: string): string | undefined {
    const originalIcon = BlzGetAbilityIcon(this.dummyAbility);
    Preloader(filename);
    const preloadText = BlzGetAbilityIcon(this.dummyAbility);
    BlzSetAbilityIcon(this.dummyAbility, originalIcon);
    if (preloadText !== originalIcon) {
      return File.unescape(preloadText);
    }
  }

  /**
   * Write text to a file with the option to not include boilerplate for reading the file back.
   * @param filename The name of the file to write to. Supported extensions are `.txt` and `.pld`.
   * @param contents The contents to write to the file.
   * @param allowReading If set to true, boilerplate code will be included for reading the file with `File.read`.
   */
  public static writeRaw(filename: string, contents: string, allowReading = false): File {
    PreloadGenClear();
    PreloadGenStart();

    if (allowReading) {
      Preload(`\")\n//! beginusercode\nlocal o=''\nPreload=function(s)o=o..s end\nPreloadEnd=function()end\n//!endusercode\n//`);
      contents = File.escape(contents);
    }

    for (let i = 0; i < contents.length / File.preloadLimit; i++) {
      Preload(`${contents.substr(i * File.preloadLimit, File.preloadLimit)}`);
    }

    if (allowReading) {
      Preload(`\")\n//! beginusercode\nBlzSetAbilityIcon(${this.dummyAbility},o)\n//!endusercode\n//`);
    }

    PreloadGenEnd(filename);

    return this;
  }

  /**
   * Write text to a file inside. All files are placed within the CustomMapData folder.
   * @param filename The name of the file to write to. Supported extensions are `.txt` and `.pld`.
   * @param contents The contents to write to the file.
   */
  public static write(filename: string, contents: string): File {
    return this.writeRaw(filename, contents, true);
  }
}
