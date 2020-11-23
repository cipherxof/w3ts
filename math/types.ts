/** Converts Degrees to Radians */
const DEGTORAD = 0.017453293;
/** Converts Radians to Degrees */
const RADTODEG = 57.295779513;

export class Angle {
  protected constructor(private readonly rads: number) {}

  static fromDegrees(degrees: number) {
    return new Angle(degrees * DEGTORAD);
  }

  static fromRadians(radians: number) {
    return new Angle(radians);
  }

  static random() {
    return new Angle(GetRandomReal(0, math.pi * 2));
  }

  get degrees() {
    return this.rads * RADTODEG;
  }

  get radians() {
    return this.rads;
  }

  get cos() {
    return Cos(this.rads);
  }

  get sin() {
    return Sin(this.rads);
  }

  add(other: Angle) {
    return new Angle(this.radians + other.radians);
  }
}

export const degress = Angle.fromDegrees;
export const radians = Angle.fromRadians;
export const randomAngle = Angle.random;
