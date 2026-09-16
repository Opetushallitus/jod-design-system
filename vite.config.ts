/// <reference types="vitest/config" />
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')) as {
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
};

/**
 * Every runtime dependency is external. Consumers install them transitively from this
 * package's dependencies/peerDependencies, so they get a single deduplicated copy and
 * can tree-shake it themselves — which is impossible once it is inlined here.
 */
const externalPackages = [...Object.keys(pkg.dependencies ?? {}), ...Object.keys(pkg.peerDependencies ?? {})];

/** Externalizes both the bare specifier and any subpath: `motion` and `motion/react`. */
const external = (id: string) => externalPackages.some((name) => id === name || id.startsWith(`${name}/`));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      include: ['lib'],
      // Everything that only Storybook, the docs pages or the tests consume: it has no
      // runtime counterpart in dist, so a declaration for it would be a dangling file.
      exclude: [
        'lib/**/*.stories.{ts,tsx}',
        'lib/**/*.test.{ts,tsx}',
        'lib/storybook.ts',
        'lib/docs/**',
        'lib/components/NavigationMenu/commonStoriesData.tsx',
        'lib/components/NavigationMenu/storyDummyLinks.tsx',
        'lib/components/CookieConsent/CookieConsentTestUtils.tsx',
      ],
      entryRoot: 'lib',
      // Emits one .d.ts per module, mirroring the preserveModules JS layout. The
      // alternative, bundling everything into a single main.d.ts via API Extractor,
      // added ~1.6s to every build — and `dev` is `vite build -w`, so that cost is
      // paid on each save. Note this emits extensionless relative specifiers, which
      // require consumers to resolve modules as a bundler does, not as node16/nodenext.
      bundleTypes: false,
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  build: {
    sourcemap: true,
    lib: {
      // Keeps the emitted stylesheet at dist/main.css, which five consumers import by path.
      cssFileName: 'main',
      // `icons` is a second entry so the barrel survives tree-shaking and the
      // `./icons` subpath export has a real file to point at.
      entry: {
        main: resolve(__dirname, 'lib/main.ts'),
        'icons/index': resolve(__dirname, 'lib/icons/index.ts'),
      },
      formats: ['es'],
    },
    rolldownOptions: {
      external,
      output: {
        preserveModules: true,
        preserveModulesRoot: resolve(__dirname, 'lib'),
        // Required: Vite's lib-mode default entryFileNames is a function that would
        // name every preserved module main.js.
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
      },
    },
  },
});
