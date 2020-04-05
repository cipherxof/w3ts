export class BinaryReader {

  public readonly data: string;
  private pos: number = 1;

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
