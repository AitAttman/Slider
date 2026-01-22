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
        // "slider": "src/slider.ts",
        "index": "index.html",
      },
      output: {
        entryFileNames: '[name].min.js',
        assetFileNames: '[name].min.[ext]',
        chunkFileNames: ({name, isEntry, moduleIds, facadeModuleId}) => {
          console.log( 'name ', name)
          console.log( 'isEntry ', isEntry)
                            return '[name].min.js'
                        },
        manualChunks: (id) => {
          console.log( 'id ', id )
          if( id.includes('slider.ts'))
            return 'slider'
          if( id.includes('style.scss'))
            return 'style'
        }
      }
    }
  }
});
