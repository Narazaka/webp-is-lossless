# webp-is-lossless

check WebP is lossless or not

## Install

```sh
npm i webp-is-lossless
```

## Usage

```typescript
import { webpIsLossless } from "webp-is-lossless";

function showIsLossless(file) {
  const reader = new FileReader();

  reader.readAsArrayBuffer(file);

  reader.onload = function () {
    const isLossless = webpIsLossless(new Uint8Array(reader.result));
    console.log(isLossless);
  };
}
```

## License

[Zlib license](LICENSE)
