import { readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

import type { APIRequestContext, Page } from '@playwright/test';

export type IndexEntry = { type: 'story' | 'docs'; id: string; name: string; importPath: string; tags?: string[] };

const ROOT = join(import.meta.dirname, '..');

/**
 * Story files, as Storybook's importPath (`./lib/...`). Test files are collected before
 * Playwright starts Storybook, so they are found on disk; their stories are read from
 * Storybook's index.json at run time with `storiesOf`.
 */
export const storyFiles = readdirSync(join(ROOT, 'lib'), { recursive: true, encoding: 'utf8' })
  .filter((file) => /\.stories\.tsx?$/.test(file))
  .map((file) => `./${relative(ROOT, join(ROOT, 'lib', file))}`)
  .sort();

let index: Record<string, IndexEntry> | undefined;

/** Stories of a story file, skipping those tagged `!test` as Storybook's own test tooling does. */
export const storiesOf = async (request: APIRequestContext, storyFile: string) => {
  index ??= ((await (await request.get('/index.json')).json()) as { entries: Record<string, IndexEntry> }).entries;
  return Object.values(index).filter(
    (entry) => entry.type === 'story' && entry.importPath === storyFile && !entry.tags?.includes('!test'),
  );
};

/** Lets images, fonts and late renders settle: contrast, name and layout checks depend on them. */
export const settle = async (page: Page) => {
  await page.waitForLoadState('networkidle');
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((img) => img.decode().catch(() => {})));
  });
};
