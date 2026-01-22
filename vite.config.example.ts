import {defineConfig} from "vite";
import path from "node:path"

const baseDir = __dirname + '/src/'

export default defineConfig({
    // root: 'src',       // source folder
    // base: '/build/',         // public path for built assets
    base: '',
    build: {
        outDir: '/home/ahmedaitattman/webdev/www/site1/public',
        // empty output dir when build
        emptyOutDir: false,
        copyPublicDir: false,
        rollupOptions: {
            input: {
                // ts files :
                // HttpSearchBox: "src/js/modules/HttpSearchBox.ts",
                // slider: 'src/js/slider/slider.ts',
                // LoadProducts: 'src/js/LoadProducts.ts',
                global: 'src/js/global.ts',
                "global.init": 'src/js/global.init.ts',
                "js/main": 'src/main.ts',
                // LoadRelatedProducts: 'src/js/LoadRelatedProducts.ts',
                // css files :
                "js/slider/slider": 'src/js/slider/slider.scss',
                "assets/css/global": 'src/assets/css/global.scss',
            },
            output: {
                // entryFileNames: '[name].min.js',
                entryFileNames: ({facadeModuleId, name, isEntry, moduleIds}) => {
                    const relativePath = facadeModuleId.split('/src/')[1]?.replace(/\\/g, '/')
                    const filePath = relativePath ? path.dirname(relativePath) : ''
                    if (filePath && filePath !== '..' && filePath !== '.')
                        return filePath + '/[name].min.js'
                    return '[name].min.js'
                },
                assetFileNames: '[name].min.[ext]',
                chunkFileNames: ({name, isEntry, moduleIds, facadeModuleId}) => {
                    const relativePath = facadeModuleId?.split('/src/')[1]?.replace(/\\/g, '/') || ""
                    const filePath = relativePath ? path.dirname(relativePath) : ''
                    if (filePath && filePath !== '..' && filePath !== '.')
                        return filePath + '/[name].min.js'
                    return 'js/[name].min.js'
                }
            }
        }
    },
    server: {
        port: 5173,
        // host: true,
        hot: true
    }
})
