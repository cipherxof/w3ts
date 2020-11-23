import { Point } from "../handles/point";

/** Converts Degrees to Radians */
const DEGTORAD = 0.017453293;
/** Converts Radians to Degrees */
const RADTODEG = 57.295779513;

/**
 * Angle encapsulates an angle, abstracting the usage of degrees and radians.
 * */
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

  // asDirection returns a unit length Vec2 in the direction of this angle,
  // parallel to the ground plane.
  asDirection() {
    return new Vec2(this.cos, this.sin);
  }
}

export const degrees = Angle.fromDegrees;
export const radians = Angle.fromRadians;
export const randomAngle = Angle.random;

export class Vec2 {
  constructor(readonly x: number, readonly y: number) {}

  public get terrainZ() {
    const temp = new Point(this.x, this.y);
    const z = temp.z;
    temp.destroy();
    return z;
  }

  public add(other: Vec2) {
    return new Vec2(this.x + other.x, this.y + other.y);
  }

  public sub(other: Vec2) {
    return new Vec2(this.x - other.x, this.y - other.y);
  }

  public scale(factor: number) {
    return new Vec2(this.x * factor, this.y * factor);
  }

  public mul(other: Vec2) {
    return new Vec2(this.x * other.x, this.y * other.y);
  }

  public dot(other: Vec2) {
    return this.x * other.x + this.y * other.y;
  }

  public get length() {
    return SquareRoot(this.lengthSq);
  }

  public get lengthSq() {
    return this.x * this.x + this.y * this.y;
  }

  public get norm() {
    const len = this.length;
    if (len > 0) {
      return new Vec2(this.x / len, this.y / len);
    }
    return new Vec2(this.x, this.y);
  }

  // rotate rotates this vector around the Z axis (up from the ground).
  public rotate(angle: Angle): Vec2 {
    const cos = angle.cos;
    const sin = angle.sin;

    const px = this.x * cos - this.y * sin;
    const py = this.x * sin + this.y * cos;
    return new Vec2(px, py);
  }

  public angleTo(other: Vec2): Angle {
    // Weird implementation note: this method causes map start failures when
    // not in the same file in as the Angle class.
    const dir = this.normalizedPointerTo(other);
    return Angle.fromRadians(Atan2(dir.y, dir.x));
  }

  // normalizedPointerTo returns a normalized vector in the direction of the
  // target. When the target and this vector are equal, return a vector
  // pointing right.
  public normalizedPointerTo(other: Vec2): Vec2 {
    let v = other.sub(this).norm;
    if (v.length == 0) {
      return new Vec2(1, 0);
    }
    return v;
  }

  public moveTowards(other: Vec2, dist: number) {
    return this.add(this.normalizedPointerTo(other).scale(dist));
  }

  public polarOffset(angle: Angle, dist: number) {
    return this.add(angle.asDirection().scale(dist));
  }

  public distanceTo(other: Vec2) {
    return other.sub(this).length;
  }

  public distanceToSq(other: Vec2) {
    return other.sub(this).lengthSq;
  }

  public inRange(other: Vec2, radius: number): boolean {
    return this.distanceToSq(other) < radius * radius;
  }

  public toString() {
    return "(" + this.x.toString() + ", " + this.y.toString() + ")";
  }
}

export const vec2 = (x: number, y: number) => new Vec2(x, y);
