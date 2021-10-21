/**
 * Reads primitive types from a packed binary string.
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
export class BinaryReader {
  public readonly data: string;

  private pos = 1;

  constructor(binaryString: string) {
    this.data = binaryString;
  }

  public read(fmt: string, size: number) {
    const unpacked = string.unpack(fmt, this.data, this.pos);
    this.pos += size;
    if (unpacked.length <= 0) {
      return 0;
    }
    return unpacked[0];
  }

  public readDouble(): number {
    return this.read(">d", 4);
  }

  public readFloat(): number {
    return this.read(">f", 4);
  }

  public readInt16(): number {
    return this.read(">h", 2);
  }

  public readInt32(): number {
    return this.read(">i4", 4);
  }

  public readInt8(): number {
    return this.read(">b", 1);
  }

  public readString(): string {
    const value: string = this.read(">z", 0);
    this.pos += value.length + 1;
    return value;
  }

  public readUInt16(): number {
    return this.read(">H", 2);
  }

  public readUInt32(): number {
    return this.read(">I4", 4);
  }

  public readUInt8(): number {
    return this.read(">B", 1);
  }
}
