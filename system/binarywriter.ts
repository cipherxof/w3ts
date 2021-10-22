/**
 * Packs primitive types into a binary string.
 *
 * @example
 * ```ts
 * // Write the values
 * const writer = new BinaryWriter();
 * writer.writeUInt8(5);
 * writer.writeUInt8(32);
 * writer.writeUInt8(78);
 * writer.writeUInt8(200);
 * writer.writeUInt32(12345678);
 * writer.writeString("hello");
 * writer.writeUInt16(45000);
 *
 * // Read the values
 * const binaryString = writer.toString();
 * const reader = new BinaryReader(binaryString);
 * const values: any[] = [];
 *
 * values[0] = reader.readUInt8(); // 5
 * values[1] = reader.readUInt8(); // 32
 * values[2] = reader.readUInt8(); // 78
 * values[3] = reader.readUInt8(); // 200
 * values[4] = reader.readUInt32(); // 12345678
 * values[5] = reader.readString(); // hello
 * values[6] = reader.readUInt16(); // 45000
 * ```
 */
export class BinaryWriter {
  public readonly values: (string | number)[] = [];

  private fmj = ">";

  public toString() {
    return string.pack(this.fmj, ...this.values);
  }

  public writeDouble(value: number) {
    this.fmj += "d";
    this.values.push(value);
  }

  public writeFloat(value: number) {
    this.fmj += "f";
    this.values.push(value);
  }

  public writeInt16(value: number) {
    this.fmj += "h";
    this.values.push(value);
  }

  public writeInt32(value: number) {
    this.fmj += "i4";
    this.values.push(value);
  }

  public writeInt8(value: number) {
    this.fmj += "b";
    this.values.push(value);
  }

  public writeString(value: string) {
    this.fmj += "z";
    this.values.push(value);
  }

  public writeUInt16(value: number) {
    this.fmj += "H";
    this.values.push(value);
  }

  public writeUInt32(value: number) {
    this.fmj += "I4";
    this.values.push(value);
  }

  public writeUInt8(value: number) {
    this.fmj += "B";
    this.values.push(value);
  }
}
