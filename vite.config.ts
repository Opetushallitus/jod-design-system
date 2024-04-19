/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from './tailwind.config';

const fullConfig = resolveConfig(tailwindConfig);

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __SCREENS__: fullConfig.theme.screens,
  },
  plugins: [
    react(),
    libInjectCss(),
    dts({ include: ['lib'], exclude: ['lib/**/*.stories.{ts,tsx}'], rollupTypes: true }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  build: {
    sourcemap: true,
    copyPublicDir: false,
    lib: {
      fileName: 'main',
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
    },
  },
});
