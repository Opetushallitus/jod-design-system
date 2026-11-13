import AxeBuilder from '@axe-core/playwright';
import { test as base } from '@playwright/test';

import { createScreenReader, type ScreenReader } from './screenReader';

/** WCAG 2.2 level A and AA rules, which is what the JOD services are required to meet. */
export const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

/**
 * Floating UI's focus guards around a portaled popup with focusable content (e.g. a tooltip with a link). They are
 * focusable but aria-hidden, which axe reports as `aria-hidden-focus`, yet they only pass focus on to the popup or back
 * to the page, so screen reader users never land on them. Leave them out of axe scans.
 */
export const FOCUS_GUARDS = '[data-floating-ui-focus-guard]';

type Fixtures = {
  /**
   * Returns a fresh axe builder scoped to the rendered story (#storybook-root), so
   * Storybook's own preview markup is not audited. Chain `.exclude()`, `.disableRules()`
   * etc. as needed, then call `.analyze()`.
   *
   * It runs in a real browser, so rules that depend on layout and computed styles
   * (e.g. color-contrast) are checked too, which jsdom cannot do.
   */
  makeAxeBuilder: () => AxeBuilder;
  /** Guidepup's Virtual Screen Reader in the page. Call `start()` after `gotoStory`. */
  screenReader: ScreenReader;
};

export const test = base.extend<Fixtures>({
  makeAxeBuilder: async ({ page }, use) => {
    await use(() => new AxeBuilder({ page }).include('#storybook-root').exclude(FOCUS_GUARDS).withTags(WCAG_TAGS));
  },
  screenReader: async ({ page }, use) => {
    await use(createScreenReader(page));
  },
});

export { expect } from '@playwright/test';
