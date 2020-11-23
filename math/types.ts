import { Point } from "../handles/point";

// Converts Degrees to Radians
const DEGTORAD = 0.017453293;
// Converts Radians to Degrees
const RADTODEG = 57.295779513;

/**
 *  Encapsulates an angle, abstracting the usage of degrees and radians.
 */
export class Angle {
  protected constructor(private readonly rads: number) {}

  public static fromDegrees(degrees: number) {
    return new Angle(degrees * DEGTORAD);
  }

  public static fromRadians(radians: number) {
    return new Angle(radians);
  }

  public static random() {
    return new Angle(GetRandomReal(0, math.pi * 2));
  }

  public get degrees() {
    return this.rads * RADTODEG;
  }

  public get radians() {
    return this.rads;
  }

  public get cos() {
    return Cos(this.rads);
  }

  public get sin() {
    return Sin(this.rads);
  }

  public add(other: Angle) {
    return new Angle(this.radians + other.radians);
  }

  // returns a unit length Vec2 in the direction of this angle,
  // parallel to the ground plane.
  public asDirection() {
    return new Vec2(this.cos, this.sin);
  }
}

export const degrees = Angle.fromDegrees;
export const radians = Angle.fromRadians;
export const randomAngle = Angle.random;

export class Vec2 {
  public constructor(readonly x: number, readonly y: number) {}

  public withZ(z: number) {
    return new Vec3(this.x, this.y, z);
  }

  public withTerrainZ() {
    return new Vec3(this.x, this.y, this.terrainZ);
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
    return this;
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

  // returns a normalized vector in the direction of the
  // target. When the target and this vector are equal, return a vector
  // pointing right.
  public normalizedPointerTo(other: Vec2): Vec2 {
    const v = other.sub(this).norm;
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

  private static terrainPoint: Point = new Point(0, 0);
  public get terrainZ() {
    Vec2.terrainPoint.setPosition(this.x, this.y);
    return Vec2.terrainPoint.z;
  }

  public toString() {
    return "(" + this.x.toString() + ", " + this.y.toString() + ")";
  }
}

export class Vec3 {
  public constructor(
    readonly x: number,
    readonly y: number,
    readonly z: number
  ) {}

  public toVec2() {
    return new Vec2(this.x, this.y);
  }

  public add(other: Vec3): Vec3 {
    return new Vec3(this.x + other.x, this.y + other.y, this.z + other.z);
  }

  public sub(other: Vec3): Vec3 {
    return new Vec3(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  public scale(factor: number): Vec3 {
    return new Vec3(this.x * factor, this.y * factor, this.z * factor);
  }

  public mul(other: Vec3): Vec3 {
    return new Vec3(this.x * other.x, this.y * other.y, this.z * other.z);
  }

  public dot(other: Vec3): number {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }

  public cross(other: Vec3) {
    return new Vec3(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x
    );
  }

  public get length(): number {
    return SquareRoot(this.lengthSq);
  }

  public get lengthSq(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  public get norm(): Vec3 {
    const len = this.length;
    if (len > 0) {
      return new Vec3(this.x / len, this.y / len, this.z / len);
    }
    return this;
  }

  // returns a normalized vector in the direction of the
  // target. When the target and origin vector are equal, returns the x-axis
  // unit vector.
  public normalizedPointerTo(other: Vec3) {
    const v = other.sub(this).norm;
    if (v.length == 0) {
      return new Vec3(1, 0, 0);
    }
    return v;
  }

  public distanceTo(other: Vec3) {
    return other.sub(this).length;
  }

  public distanceToSq(other: Vec3) {
    return other.sub(this).lengthSq;
  }

  public polarProject(dist: number, angleGround: Angle, angleAir: Angle) {
    return new Vec3(
      this.x + dist * angleGround.cos * angleAir.sin,
      this.y + dist * angleGround.sin * angleAir.sin,
      this.z + dist * angleAir.cos
    );
  }

  public moveTowards(other: Vec3, dist: number) {
    return this.add(this.normalizedPointerTo(other).scale(dist));
  }

  public toString() {
    return (
      "(" +
      this.x.toString() +
      ", " +
      this.y.toString() +
      ", " +
      this.z.toString() +
      ")"
    );
  }
}

export const vec2 = (x: number, y: number) => new Vec2(x, y);
export const vec3 = (x: number, y: number, z: number) => new Vec3(x, y, z);
