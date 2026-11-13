import { expect, test } from './fixtures';
import { gotoStory } from './storybook';

test.describe('Modal', () => {
  test('keeps focus on the scroll area when its content stops overflowing', async ({ page }) => {
    // Short enough for the content of the story to overflow.
    await page.setViewportSize({ width: 1280, height: 500 });
    await gotoStory(page, 'components-popups-modal--default');
    await page.getByRole('button', { name: 'Open Modal example' }).click();
    const scrollArea = page.getByTestId('modal-scroll');
    // A scrolling area is focusable, so that keyboard users can scroll it.
    await expect(scrollArea).toHaveAttribute('tabindex', '0');
    await scrollArea.focus();

    // The content stops overflowing while the area has focus, e.g. when the content gets shorter.
    await scrollArea.evaluate((element) => {
      for (const child of element.children) {
        (child as HTMLElement).style.display = 'none';
      }
    });
    await expect.poll(() => scrollArea.evaluate((element) => element.scrollHeight > element.clientHeight)).toBe(false);
    await expect(scrollArea).toBeFocused();

    // Once focus leaves it, the area is no longer focusable.
    await page.getByRole('dialog').getByRole('button').first().focus();
    await expect(scrollArea).not.toHaveAttribute('tabindex');
  });
});
