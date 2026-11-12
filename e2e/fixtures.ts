import AxeBuilder from '@axe-core/playwright';
import { test as base } from '@playwright/test';

import { createScreenReader, type ScreenReader } from './screenReader';

/** WCAG 2.2 level A and AA rules, which is what the JOD services are required to meet. */
export const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

type Fixtures = {
  /**
   * Returns a fresh axe builder scoped to the rendered story (#storybook-root), so
   * Storybook's own preview markup is not audited. Chain `.exclude()`, `.disableRules()`
   * etc. as needed, then call `.analyze()`.
   *
   * Unlike jest-axe in the jsdom unit tests, this runs in a real browser, so rules that
   * depend on layout and computed styles (e.g. color-contrast) are checked too.
   */
  makeAxeBuilder: () => AxeBuilder;
  /** Guidepup's Virtual Screen Reader in the page. Call `start()` after `gotoStory`. */
  screenReader: ScreenReader;
};

export const test = base.extend<Fixtures>({
  makeAxeBuilder: async ({ page }, use) => {
    await use(() => new AxeBuilder({ page }).include('#storybook-root').withTags(WCAG_TAGS));
  },
  screenReader: async ({ page }, use) => {
    await use(createScreenReader(page));
  },
});

export { expect } from '@playwright/test';
