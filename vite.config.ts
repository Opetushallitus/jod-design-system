import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({ include: ['lib'], exclude: ['lib/**/*.stories.{ts,tsx}'], rollupTypes: true }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  build: {
    sourcemap: true,
    lib: {
      fileName: 'main',
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es'],
    },
    rolldownOptions: {
      external: ['react', 'react/jsx-runtime'],
    },
  },
});
