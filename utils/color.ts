export class Color {
  readonly alpha: ColorValue;

  public constructor(
    readonly red: ColorValue,
    readonly green: ColorValue,
    readonly blue: ColorValue,
    alpha?: ColorValue
  ) {
    if (alpha) {
      this.alpha = alpha;
    } else {
      this.alpha = 255;
    }
  }

  /** Create a string code for coloring text. */
  public get code() {
    return (
      `|c${toHex(this.alpha)}${toHex(this.red)}` +
      `${toHex(this.green)}${toHex(this.blue)}`
    );
  }

  public equals(other: Color) {
    return (
      this.red === other.red &&
      this.green === other.green &&
      this.blue === other.blue &&
      this.alpha === other.alpha
    );
  }

  private playerColorIndex() {
    let i = 0;
    for (; i < playerColors.length; i++) {
      if (playerColors[i].equals(this)) {
        break;
      }
    }
    return i;
  }

  /**
   * Returns the name of this color, if it is one of other player colors.
   * Otherwise returns 'unknown'.
   */
  public get name() {
    const index = this.playerColorIndex();
    if (index < playerColors.length) {
      return playerColorNames[index];
    }
    return "unknown";
  }

  /**
   * Returns the `playercolor` of this color, if it is one of the player
   * colors. Otherwise, returns `PLAYER_COLOR_RED`.
   */
  public get playerColor() {
    const index = this.playerColorIndex();
    if (index < playerColors.length) {
      return orderedPlayerColors[index];
    }
    return PLAYER_COLOR_RED;
  }

  /**
   * Returns the color between this color and another via linear interpolation.
   * The provided factor should be between 0 and 1. Any color components
   * that are outside of the 0-255 range will be clamped.
   */
  public lerp(other: Color, factor: number) {
    const r = MathRound(this.red * (1 - factor) + other.red * factor);
    const g = MathRound(this.green * (1 - factor) + other.green * factor);
    const b = MathRound(this.blue * (1 - factor) + other.blue * factor);
    const a = MathRound(this.alpha * (1 - factor) + other.alpha * factor);
    return new Color(
      math.max(0, math.min(255, r)) as ColorValue,
      math.max(0, math.min(255, g)) as ColorValue,
      math.max(0, math.min(255, b)) as ColorValue,
      math.max(0, math.min(255, a)) as ColorValue
    );
  }
}

export const color = (
  red: ColorValue,
  green: ColorValue,
  blue: ColorValue,
  alpha?: ColorValue
) => new Color(red, green, blue, alpha);

/**
 * The player colors sorted by index. Does not include
 * neutrals colors.
 */
export const playerColors = [
  color(255, 3, 3),
  color(0, 66, 255),
  color(28, 230, 185),
  color(84, 0, 129),
  color(255, 252, 0),
  color(254, 138, 14),
  color(32, 192, 0),
  color(229, 91, 176),
  color(149, 150, 151),
  color(126, 191, 241),
  color(16, 98, 70),
  color(78, 42, 3),
  color(155, 0, 0),
  color(0, 0, 195),
  color(0, 234, 255),
  color(190, 0, 254),
  color(235, 205, 135),
  color(248, 164, 139),
  color(191, 255, 128),
  color(220, 185, 235),
  color(80, 79, 85),
  color(235, 240, 255),
  color(0, 120, 30),
  color(164, 111, 51),
];

/** The names of players colors sorted by player index. */
export const playerColorNames = [
  "red",
  "blue",
  "teal",
  "purple",
  "yellow",
  "orange",
  "green",
  "pink",
  "gray",
  "light blue",
  "dark green",
  "brown",
  "maroon",
  "navy",
  "turquoise",
  "violet",
  "wheat",
  "peach",
  "mint",
  "lavender",
  "coal",
  "snow",
  "emerald",
  "peanut",
];

/** An ordered list of `playercolor`s, for lookup */
const orderedPlayerColors = [
  PLAYER_COLOR_RED,
  PLAYER_COLOR_BLUE,
  PLAYER_COLOR_CYAN,
  PLAYER_COLOR_PURPLE,
  PLAYER_COLOR_YELLOW,
  PLAYER_COLOR_ORANGE,
  PLAYER_COLOR_GREEN,
  PLAYER_COLOR_PINK,
  PLAYER_COLOR_LIGHT_GRAY,
  PLAYER_COLOR_LIGHT_BLUE,
  PLAYER_COLOR_AQUA,
  PLAYER_COLOR_BROWN,
  PLAYER_COLOR_MAROON,
  PLAYER_COLOR_NAVY,
  PLAYER_COLOR_TURQUOISE,
  PLAYER_COLOR_VIOLET,
  PLAYER_COLOR_WHEAT,
  PLAYER_COLOR_PEACH,
  PLAYER_COLOR_MINT,
  PLAYER_COLOR_LAVENDER,
  PLAYER_COLOR_COAL,
  PLAYER_COLOR_SNOW,
  PLAYER_COLOR_EMERALD,
  PLAYER_COLOR_PEANUT,
];

/**
 * Converts a color value to the hex string, making sure that it is 2
 * characters in length.
 */
function toHex(value: ColorValue) {
  let hex = value.toString(16);
  if (hex.length < 2) {
    hex = `0${hex}`;
  }
  return hex;
}

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>


/**
 * Generate a type that is represent a number ranging from [A, B)
 */
export type NumberRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>


/**
 * The valid values for a color component.
 */
export type ColorValue = NumberRange<0,256>;