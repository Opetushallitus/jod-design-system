import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

import type { Page } from '@playwright/test';

/**
 * Guidepup's Virtual Screen Reader running inside the page, so it reads the real
 * rendered DOM with CSS, layout and browser focus handling. The jsdom screen reader
 * tests (`*.screenreader.test.tsx`) cannot see CSS: use these for content hidden or
 * shown by CSS, real focus moves (e.g. <dialog>.showModal()) and floating elements.
 *
 * Each method calls the same-named method of the reader in the page.
 */
export type ScreenReader = {
  /** Starts the reader on the element matching `selector` (default: the story root). */
  start: (selector?: string) => Promise<void>;
  stop: () => Promise<void>;
  next: () => Promise<void>;
  previous: () => Promise<void>;
  act: () => Promise<void>;
  press: (key: string) => Promise<void>;
  lastSpokenPhrase: () => Promise<string>;
  spokenPhraseLog: () => Promise<string[]>;
  clearSpokenPhraseLog: () => Promise<void>;
};

const require = createRequire(import.meta.url);
// The ESM browser build is self-contained (no imports), so it can be loaded from a blob URL.
const browserBuild = readFileSync(require.resolve('@guidepup/virtual-screen-reader/browser.js'), 'utf8');

type VirtualInPage = Record<string, (...args: unknown[]) => Promise<unknown>>;

export const createScreenReader = (page: Page): ScreenReader => {
  const call = <T>(method: string, ...args: unknown[]) =>
    page.evaluate(
      ([m, a]) => (window as unknown as { __virtual: VirtualInPage }).__virtual[m as string](...(a as unknown[])),
      [method, args] as const,
    ) as Promise<T>;

  return {
    start: async (selector = '#storybook-root') => {
      await page.evaluate(
        async ([source, sel]) => {
          const w = window as unknown as { __virtual?: VirtualInPage };
          if (!w.__virtual) {
            const url = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
            w.__virtual = (await import(/* @vite-ignore */ url)).virtual;
          }
          const container = document.querySelector(sel);
          if (!container) throw new Error(`Screen reader container ${sel} not found`);
          await w.__virtual!.start({ container });
        },
        [browserBuild, selector] as const,
      );
    },
    stop: () => call('stop'),
    next: () => call('next'),
    previous: () => call('previous'),
    act: () => call('act'),
    press: (key) => call('press', key),
    lastSpokenPhrase: () => call('lastSpokenPhrase'),
    spokenPhraseLog: () => call('spokenPhraseLog'),
    clearSpokenPhraseLog: () => call('clearSpokenPhraseLog'),
  };
};
