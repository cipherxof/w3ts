export class BinaryWriter {
  private data = "";

  public writeUInt8(value: number) {
    this.data += string.pack(">B", value);
  }

  public writeUInt16(value: number) {
    this.data += string.pack(">H", value);
  }

  public writeUInt32(value: number) {
    this.data += string.pack(">I4", value);
  }

  public writeInt8(value: number) {
    this.data += string.pack(">b", value);
  }

  public writeInt16(value: number) {
    this.data += string.pack(">h", value);
  }

  public writeInt32(value: number) {
    this.data += string.pack(">i4", value);
  }

  public writeFloat(value: number) {
    this.data += string.pack(">f", value);
  }

  public writeDouble(value: number) {
    this.data += string.pack(">d", value);
  }

  public writeString(value: string) {
    this.data += string.pack(">z", value);
  }

  public get length() {
    return this.data.length;
  }

  public toString() {
    return this.data;
  }
}