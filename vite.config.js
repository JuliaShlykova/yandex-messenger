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
  },
  root: resolve(__dirname, 'src')
})
