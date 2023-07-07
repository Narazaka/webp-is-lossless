export type Input = Uint8Array;

type CompareInput = Uint8Array | number[];

const compare = (a: CompareInput, b: CompareInput) => {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

function getReader<T extends Uint8Array>(input: T) {
  return {
    offset: 0,
    input,
    skip(n: number) {
      this.offset += n;
    },
    read(n: number) {
      const res = this.input.slice(this.offset, this.offset + n);
      this.offset += n;
      return res as T;
    },
  };
}

const VP8_ = [0x56, 0x50, 0x38, 0x20]; // "VP8 "
const VP8L = [0x56, 0x50, 0x38, 0x4c]; // "VP8L"

export function webpIsLossless(input: Input) {
  const reader = getReader(input);
  reader.skip(12);
  while (true) {
    const signature = reader.read(4);
    if (signature.byteLength < 4) return undefined;
    if (compare(signature, VP8_)) return false;
    if (compare(signature, VP8L)) return true;
    const sizeBuffer = reader.read(4);
    const size = new DataView(
      sizeBuffer instanceof ArrayBuffer ? sizeBuffer : sizeBuffer.buffer,
    ).getUint32(0, true);
    // padding
    reader.skip(size % 2 === 0 ? size : size + 1);
  }
}
