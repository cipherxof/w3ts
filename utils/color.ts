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
      this.red == other.red &&
      this.green == other.green &&
      this.blue == other.blue &&
      this.alpha == other.alpha
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
    hex = "0" + hex;
  }
  return hex;
}

/**
 * The valid values for a color component. This is the only way to type an
 * integer range in typescript.
 */
type ColorValue =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59
  | 60
  | 61
  | 62
  | 63
  | 64
  | 65
  | 66
  | 67
  | 68
  | 69
  | 70
  | 71
  | 72
  | 73
  | 74
  | 75
  | 76
  | 77
  | 78
  | 79
  | 80
  | 81
  | 82
  | 83
  | 84
  | 85
  | 86
  | 87
  | 88
  | 89
  | 90
  | 91
  | 92
  | 93
  | 94
  | 95
  | 96
  | 97
  | 98
  | 99
  | 100
  | 101
  | 102
  | 103
  | 104
  | 105
  | 106
  | 107
  | 108
  | 109
  | 110
  | 111
  | 112
  | 113
  | 114
  | 115
  | 116
  | 117
  | 118
  | 119
  | 120
  | 121
  | 122
  | 123
  | 124
  | 125
  | 126
  | 127
  | 128
  | 129
  | 130
  | 131
  | 132
  | 133
  | 134
  | 135
  | 136
  | 137
  | 138
  | 139
  | 140
  | 141
  | 142
  | 143
  | 144
  | 145
  | 146
  | 147
  | 148
  | 149
  | 150
  | 151
  | 152
  | 153
  | 154
  | 155
  | 156
  | 157
  | 158
  | 159
  | 160
  | 161
  | 162
  | 163
  | 164
  | 165
  | 166
  | 167
  | 168
  | 169
  | 170
  | 171
  | 172
  | 173
  | 174
  | 175
  | 176
  | 177
  | 178
  | 179
  | 180
  | 181
  | 182
  | 183
  | 184
  | 185
  | 186
  | 187
  | 188
  | 189
  | 190
  | 191
  | 192
  | 193
  | 194
  | 195
  | 196
  | 197
  | 198
  | 199
  | 200
  | 201
  | 202
  | 203
  | 204
  | 205
  | 206
  | 207
  | 208
  | 209
  | 210
  | 211
  | 212
  | 213
  | 214
  | 215
  | 216
  | 217
  | 218
  | 219
  | 220
  | 221
  | 222
  | 223
  | 224
  | 225
  | 226
  | 227
  | 228
  | 229
  | 230
  | 231
  | 232
  | 233
  | 234
  | 235
  | 236
  | 237
  | 238
  | 239
  | 240
  | 241
  | 242
  | 243
  | 244
  | 245
  | 246
  | 247
  | 248
  | 249
  | 250
  | 251
  | 252
  | 253
  | 254
  | 255;
