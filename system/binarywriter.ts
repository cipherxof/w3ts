export class BinaryWriter {

  public readonly values: any[] = [];
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
