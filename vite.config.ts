import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  base: "",
  build: {
    outDir: "docs",
    emptyOutDir: true,
    copyPublicDir: true,
    rollupOptions: {
      input: {
        index: "index.html",
      },
      output: {
        entryFileNames: "[name].min.js",
        assetFileNames: "[name].min.[ext]",
        chunkFileNames: ({ name, isEntry, moduleIds, facadeModuleId }) => {
          return "[name].min.js";
        },
        manualChunks: (id) => {
          if (id.includes("slider.ts")) return "slider";
          if (id.includes("slider.style.scss")) return "slider";
        },
      },
    },
  },
  server: {
    //Use a "Debounce" via HMR (Advanced)
    host: "0.0.0.0",
    watch: {
      // Wait for the file to be "stable" (no changes) for 3s before triggering
      awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 100,
      },
    },
  },
});
