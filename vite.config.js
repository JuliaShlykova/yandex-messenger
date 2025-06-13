import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  // plugins: [handlebars()],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  publicDir: './static',
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
          index: resolve(__dirname,'./src/index.html'),
          login: resolve(__dirname, './src/pages/login/index.html'),
          signup: resolve(__dirname, './src/pages/signup/index.html'),
          chat: resolve(__dirname, './src/pages/chat/index.html'),
          profile: resolve(__dirname, './src/pages/profile/index.html'),
          404: resolve(__dirname, './src/pages/404/index.html'),
          500: resolve(__dirname, './src/pages/500/index.html'),
      }
    }
  },
})