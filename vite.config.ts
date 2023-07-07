import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "src/webp-is-lossless.ts",
      name: "webpIsLossless",
      formats: ["umd", "es"],
    },
  },
  plugins: [dts()],
});
