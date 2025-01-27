import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  server: {
    port: 5173,
    open: true,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  css: {
    postcss: './postcss.config.js'
  },
  publicDir: 'public',
  base: './'
})
