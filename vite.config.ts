import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Ensures relative asset paths for GitHub Pages and subfolder hosting
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
