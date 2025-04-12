import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  base: '/',
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
  },
  plugins: [glsl()],
});
