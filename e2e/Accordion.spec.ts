import { expect, test } from './fixtures';
import { gotoStory } from './storybook';

const STORY = 'components-content-accordion';

test.describe('Accordion', () => {
  test('is open by default and closes and reopens on click', async ({ page }) => {
    await gotoStory(page, `${STORY}--default`);

    const trigger = page.getByRole('button', { name: 'Title' });
    const content = page.getByText('Content', { exact: true });

    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(content).toBeVisible();

    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(content).toBeHidden();

    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(content).toBeVisible();
  });

  test('can be toggled with the keyboard', async ({ page }) => {
    await gotoStory(page, `${STORY}--gray-closed-by-default`);

    const trigger = page.getByRole('button', { name: 'Title' });
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByText('Content', { exact: true })).toBeVisible();

    await page.keyboard.press('Space');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  test('swaps collapsed content and expanded content', async ({ page }) => {
    await gotoStory(page, `${STORY}--collapsed-content`);

    const trigger = page.getByRole('button', { name: 'Accordion title' });
    const expanded = page.getByText('Accordion expanded content');
    const collapsed = page.getByText('Collapsed content');

    await expect(expanded).toBeVisible();
    await expect(collapsed).toBeHidden();

    await trigger.click();
    await expect(expanded).toBeHidden();
    await expect(collapsed).toBeVisible();
  });

  test('shows a spinner and a status message while fetching data', async ({ page }) => {
    // The story's fetchData resolves after 5 s; the spinner must be visible meanwhile.
    await gotoStory(page, `${STORY}--with-async`);

    const trigger = page.getByRole('button', { name: 'Title' });
    await trigger.click();

    await expect(page.getByTestId('spinner')).toBeVisible();
    await expect(page.getByRole('status')).toHaveText('Ladataan');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await expect(trigger).toHaveAttribute('aria-expanded', 'true', { timeout: 10_000 });
    await expect(page.getByTestId('spinner')).toBeHidden();
    await expect(page.getByText('Content', { exact: true })).toBeVisible();
  });

  test('opens nested accordions independently', async ({ page }) => {
    await gotoStory(page, `${STORY}--nested`);

    await page.getByRole('button', { name: 'Accordion title', exact: true }).click();
    await expect(page.getByText('Level 1')).toBeVisible();
    await expect(page.getByText('Level 2')).toBeHidden();

    await page.getByRole('button', { name: 'Nested Accordion title' }).click();
    await expect(page.getByText('Level 2')).toBeVisible();
    await expect(page.getByText('Level 3')).toBeHidden();
  });

  test.describe('accessibility', () => {
    const stories = [
      'default',
      'title-component',
      'with-underline',
      'gray-closed-by-default',
      'collapsed-content',
      'no-ellipsis',
    ];

    for (const story of stories) {
      test(`${story} has no axe violations when open and closed`, async ({ page, makeAxeBuilder }) => {
        await gotoStory(page, `${STORY}--${story}`);
        expect((await makeAxeBuilder().analyze()).violations).toEqual([]);

        // Audit the other state too: the visible content differs between open and closed.
        // Toggle with the keyboard so the audit sees the resting state, not the hover state
        // a mouse click would leave behind.
        await page.getByRole('button').first().press('Enter');
        expect((await makeAxeBuilder().analyze()).violations).toEqual([]);
      });
    }

    test('gray-closed-by-default title has sufficient contrast on hover', async ({ page, makeAxeBuilder }) => {
      // Known issue: the hover color (accent #006db3) on the gray-2 background (#e4e6ec)
      // has a contrast of 4.38:1, below the WCAG AA minimum of 4.5:1. Marked as an expected
      // failure so CI stays green; once the color is fixed this test starts passing, which
      // Playwright reports as a failure. Remove test.fail() then.
      test.fail();
      // Tailwind v4 applies hover styles only under @media (hover: hover), so touch devices
      // never show the hover color and the issue does not exist there.
      test.skip(test.info().project.name === 'mobile', 'Hover styles do not apply on touch devices');

      await gotoStory(page, `${STORY}--gray-closed-by-default`);
      await page.getByRole('button', { name: 'Title' }).hover();

      const { violations } = await makeAxeBuilder().withRules(['color-contrast']).analyze();
      expect(violations).toEqual([]);
    });
  });
});
