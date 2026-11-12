import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';

import { expect, test, WCAG_TAGS } from './fixtures';
import { settle } from './stories';
import { gotoStory } from './storybook';

/**
 * Runs axe on states reached through interaction: open popups, dialogs and menus.
 * a11y.spec.ts only sees each story as it first renders.
 *
 * The whole page is scanned, not just #storybook-root, because popups and dialogs render
 * in portals.
 */

type State = {
  name: string;
  story: string;
  open: (page: Page) => Promise<void>;
  /** Known axe rule violations in this state, until fixed. */
  known?: string[];
};

// Headless UI's dialog element itself has no size (its panel is fixed-positioned
// inside it), so wait for content in the dialog to be visible instead.
const expectDialogOpen = (page: Page) => expect(page.getByRole('dialog').getByRole('button').first()).toBeVisible();

const STATES: State[] = [
  {
    name: 'Select with the listbox open',
    story: 'components-forms-select--default',
    open: async (page) => {
      await page.getByRole('button', { name: 'Language' }).click();
      await expect(page.getByRole('listbox')).toBeVisible();
    },
  },
  {
    name: 'Combobox with the listbox open',
    story: 'components-forms-combobox--default',
    open: async (page) => {
      await page.getByRole('button', { name: 'Choose language' }).click();
      await expect(page.getByRole('listbox')).toBeVisible();
    },
  },
  {
    name: 'Datepicker with the calendar open',
    story: 'components-forms-datepicker--default',
    open: async (page) => {
      await page.getByRole('button', { name: 'Avaa kalenteri' }).click();
      await expect(page.getByRole('grid')).toBeVisible();
    },
    // Days of the adjacent months have too low contrast, and the month/year view button's
    // accessible name does not contain its visible text.
    known: ['color-contrast', 'label-content-name-mismatch'],
  },
  {
    name: 'Modal open',
    story: 'components-popups-modal--default',
    open: async (page) => {
      await page.getByRole('button', { name: 'Open Modal example' }).click();
      await expectDialogOpen(page);
    },
    // The scrolling content area (and side panel) cannot be reached with the keyboard
    // when it holds no focusable element, so keyboard users cannot scroll it.
    known: ['scrollable-region-focusable'],
  },
  {
    name: 'ConfirmDialog open',
    story: 'components-popups-confirmdialog--normal',
    open: async (page) => {
      await page.getByRole('button', { name: 'Open ConfirmDialog example' }).click();
      await expectDialogOpen(page);
    },
  },
  {
    name: 'Destructive ConfirmDialog open',
    story: 'components-popups-confirmdialog--destructive',
    open: async (page) => {
      await page.getByRole('button', { name: 'Open ConfirmDialog example' }).click();
      await expectDialogOpen(page);
    },
  },
  {
    name: 'Tooltip open on keyboard focus',
    story: 'components-popups-tooltip--focus-or-hover',
    open: async (page) => {
      await page.keyboard.press('Tab');
      await expect(page.locator('#storybook-root button[aria-expanded="true"]')).toBeFocused();
    },
    // Same as the story's known violations: icon-only trigger without a name, and
    // Floating UI's focus guards (aria-hidden, focusable).
    known: ['button-name', 'aria-hidden-focus'],
  },
  {
    name: 'NavigationMenu open',
    story: 'components-navigation-navigationmenu--default',
    open: async (page) => {
      await page.getByRole('button', { name: 'Open menu' }).click();
      await expect(page.getByRole('dialog')).toBeVisible();
    },
  },
];

for (const state of STATES) {
  test(`${state.name} has no axe violations`, async ({ page }) => {
    await gotoStory(page, state.story);
    await settle(page);
    await state.open(page);

    const known = state.known ?? [];
    const { violations } = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();

    const unexpected = violations.filter((v) => !known.includes(v.id));
    expect
      .soft(
        unexpected.map(
          (v) => `${v.id} (${v.impact}): ${v.help}\n  ${v.nodes.map((n) => n.target.join(' ')).join('\n  ')}`,
        ),
      )
      .toEqual([]);

    // A known violation that no longer occurs has been fixed: drop it from `known`.
    expect
      .soft(
        known.filter((rule) => !violations.some((v) => v.id === rule)),
        'fixed violations',
      )
      .toEqual([]);
  });
}
