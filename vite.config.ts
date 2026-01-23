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
        "index": "index.html",
      },
      output: {
        entryFileNames: '[name].min.js',
        assetFileNames: '[name].min.[ext]',
        chunkFileNames: ({name, isEntry, moduleIds, facadeModuleId}) => {
                            return '[name].min.js'
                        },
        manualChunks: (id) => {
          if( id.includes('slider.ts'))
            return 'slider'
          if( id.includes('slider.style.scss'))
            return 'slider'
        }
      }
    }
  }
});
