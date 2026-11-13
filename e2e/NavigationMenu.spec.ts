import { expect, test } from './fixtures';
import { gotoStory } from './storybook';

const STORY = 'components-navigation-navigationmenu--default';

test.describe('NavigationMenu', () => {
  test('returns focus to the opening button when closed', async ({ page }) => {
    await gotoStory(page, STORY);
    const openButton = page.getByRole('button', { name: 'Open menu' });
    await openButton.click();
    await page.getByRole('button', { name: 'Sulje valikko' }).click();
    await expect(page.getByRole('dialog')).toBeHidden();

    await expect(openButton).toBeFocused({ timeout: 1000 });
  });
});
