import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "docs",
    lib: {
      entry: "./src/slider.ts",
      //   global name: window.Slider
      name: "Slider",
    },
    rollupOptions: {
      output: {
        format: "iife", // pure global, everything inlined
        name: "Slider",
        entryFileNames: "slider.min.js",
      },
    },
    minify: "esbuild",
    sourcemap: false,
    emptyOutDir: false, // important: don't delete the demo files
  },
});
