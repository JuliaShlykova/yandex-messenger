import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },  
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true
  },
  root: resolve(__dirname, 'src'),
  publicDir: "assets"
})
