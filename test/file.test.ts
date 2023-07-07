import { test, assert } from "vitest";
import * as fs from "fs";
import { webpIsLossless } from "../src/webp-is-lossless";

test("lossless", () => {
  const buf = new Uint8Array(
    fs.readFileSync(__dirname + "/asset/lossless.webp"),
  );
  const res = webpIsLossless(buf);
  assert(res === true);
});
test("lossy", () => {
  const buf = new Uint8Array(
    fs.readFileSync(__dirname + "/asset/lossy-oddchunk.webp"),
  );
  assert(webpIsLossless(buf) === false);
});
test("notwebp", () => {
  const buf = new Uint8Array(fs.readFileSync(__dirname + "/asset/notwebp.png"));
  assert(webpIsLossless(buf) === undefined);
});
