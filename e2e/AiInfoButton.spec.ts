import { expect, test } from './fixtures';
import { gotoStory } from './storybook';

// The tooltip of WithComponent holds a link, so keyboard users must be able to reach it. The open tooltip is
// checked with axe, and as a region named by the button, in a11yStates.spec.ts.
const STORY = 'components-buttons-aiinfobutton--with-component';
const NAME = 'Tekoälyn avulla generoitu sisältö';

test.describe('AiInfoButton', () => {
  test('reaches the link in the tooltip with Tab and returns to the button with Escape', async ({ page }) => {
    // Known issue, also on main: the tooltip is portaled to the end of the body, so in Chrome and Firefox Tab from a
    // focused button goes to the next element on the page instead of into the tooltip, which then closes. Fixing it
    // needs a design decision, e.g. rendering the content next to the button or a disclosure instead of a tooltip.
    // Remove test.fail() when fixed.
    test.fail();
    await gotoStory(page, STORY);
    // An element after the button, as on a real page: the tooltip is portaled to the end of the body, so without
    // preserving the tab order, Tab would go to this element and skip the tooltip.
    await page.evaluate(() => {
      const after = document.createElement('button');
      after.textContent = 'After';
      document.querySelector('#storybook-root')?.append(after);
    });
    const button = page.getByRole('button', { name: NAME });

    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('region', { name: NAME })).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: /Tekoälyä ja Osaamispolku/ })).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(button).toBeFocused();
  });

  test('keeps the open tooltip in the tab order with focus guards', async ({ page }) => {
    // Safari does not focus a button on click. Floating UI's focus guards let Tab move from the clicked button into
    // the tooltip there, so that its link can be reached; without them focus drops to the body.
    await gotoStory(page, STORY);
    await page.getByRole('button', { name: NAME }).click();
    await expect(page.getByRole('region', { name: NAME })).toBeVisible();
    await expect(page.locator('[data-floating-ui-focus-guard]').first()).toBeAttached();
  });
});
