import { expect, test } from './fixtures';
import { gotoStory } from './storybook';

/**
 * Screen reader tests in a real browser, with Guidepup's Virtual Screen Reader.
 *
 * Most screen reader tests are jsdom unit tests (`*.screenreader.test.tsx`). These cover
 * what jsdom cannot: content hidden or shown by CSS, real focus handling (<dialog>,
 * fragment links) and floating elements.
 */

test.describe('NavigationMenu', () => {
  const STORY = 'components-navigation-navigationmenu--default';

  test('moves focus into the menu dialog and reads its landmarks', async ({ page, screenReader }) => {
    await gotoStory(page, STORY, { ariaLabel: 'Main menu' });
    await screenReader.start();

    await screenReader.next();
    expect(await screenReader.lastSpokenPhrase()).toBe('button, Open menu');
    await screenReader.act();

    // showModal() moves focus into the dialog, which jsdom does not do.
    const dialog = page.getByRole('dialog', { name: 'Main menu' });
    await expect(dialog).toBeVisible();
    expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);

    for (let i = 0; i < 4; i++) {
      await screenReader.next();
    }
    expect(await screenReader.spokenPhraseLog()).toEqual(
      expect.arrayContaining(['dialog, Main menu', 'button, Sulje valikko']),
    );
  });

  test('reads the visually hidden external link text as part of the link name', async ({ page, screenReader }) => {
    await gotoStory(page, STORY);
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await screenReader.start('dialog');

    for (let i = 0; i < 4; i++) {
      await screenReader.next();
    }
    // With real CSS the hidden text is a separate word ("...portaali Linkki..."); in
    // jsdom it runs together with the label.
    expect(await screenReader.spokenPhraseLog()).toContain(
      'link, Osaamispolkuportaali Linkki johtaa palvelun ulkopuolelle',
    );
  });

  test('returns focus to the opening button when closed', async ({ page }) => {
    // Known issue: the component renders null when closed, so the <dialog> is removed
    // without dialog.close() and focus falls back to <body>. Screen reader users lose
    // their place. Remove test.fail() when fixed.
    test.fail();
    await gotoStory(page, STORY);
    const openButton = page.getByRole('button', { name: 'Open menu' });
    await openButton.click();
    await page.getByRole('button', { name: 'Sulje valikko' }).click();
    await expect(page.getByRole('dialog')).toBeHidden();

    await expect(openButton).toBeFocused({ timeout: 1000 });
  });
});

test.describe('Tooltip', () => {
  test('reads the tooltip text as the trigger description, without the focus guards', async ({
    page,
    screenReader,
  }) => {
    // The Default story renders the tooltip open.
    await gotoStory(page, 'components-popups-tooltip--default');
    await screenReader.start();

    for (let i = 0; i < 3; i++) {
      await screenReader.next();
    }
    // Floating UI's focus guards are aria-hidden in a real browser, so the reader stays
    // on the trigger instead of reading empty buttons (as it does in jsdom).
    const log = await screenReader.spokenPhraseLog();
    expect(new Set(log)).toEqual(
      new Set(['button, Trigger, Lorem ipsum dolor sit amet, no vis verear commodo., expanded']),
    );
  });

  test('opens on keyboard focus and reads the tooltip text', async ({ page, screenReader }) => {
    await gotoStory(page, 'components-popups-tooltip--focus-or-hover');
    await screenReader.start();

    await page.keyboard.press('Tab');
    await expect(page.locator('#storybook-root button[aria-expanded="true"]')).toBeFocused();
    await expect
      .poll(() => screenReader.lastSpokenPhrase())
      .toContain('This is a very informative Tooltip for an important label, expanded');
  });

  test('icon-only trigger has an accessible name', async ({ page, screenReader }) => {
    // Known issue: the icon-only trigger in the FocusOrHover story has no accessible
    // name, so only its description is read (axe: button-name). Remove test.fail() when fixed.
    test.fail();
    await gotoStory(page, 'components-popups-tooltip--focus-or-hover');
    await screenReader.start();

    await page.keyboard.press('Tab');
    await expect(page.locator('#storybook-root button[aria-expanded="true"]')).toBeFocused();
    await expect.poll(() => screenReader.lastSpokenPhrase()).toMatch(/^button, [^,]+, This is a very informative/);
  });
});

test.describe('Accordion', () => {
  // Run the real close transition instead of the reduced-motion shortcut.
  test.use({ reducedMotion: 'no-preference' });

  test('does not read the content after closing', async ({ page, screenReader }) => {
    await gotoStory(page, 'components-content-accordion--default');
    await screenReader.start();

    expect(await screenReader.lastSpokenPhrase()).toBe('button, Title, expanded');
    await screenReader.act();
    await expect(page.getByText('Content')).toBeHidden();

    await screenReader.next();
    expect(await screenReader.spokenPhraseLog()).not.toContain('Content');
  });
});

test.describe('CSS-hidden content', () => {
  test('Select with a hidden label is still named by it', async ({ page, screenReader }) => {
    await gotoStory(page, 'components-forms-select--hidden-label');
    await expect(page.getByText('Language', { exact: true })).toBeHidden();
    await screenReader.start();

    // The reader starts on the first item, the button.
    expect(await screenReader.lastSpokenPhrase()).toBe('button, Language, not expanded, has popup listbox');
  });

  test('WizardProgress reads its visually hidden step texts', async ({ page, screenReader }) => {
    await gotoStory(page, 'components-misc-wizardprogress--default');
    await screenReader.start();

    for (let i = 0; i < 4; i++) {
      await screenReader.next();
    }
    expect(await screenReader.spokenPhraseLog()).toContain('Vaihe: 1, Valmis.');
  });

  test('SkipLink is off screen until focused, then visible and read', async ({ page, screenReader }) => {
    await gotoStory(page, 'components-navigation-skiplink--default');
    const link = page.getByRole('link', { name: 'Skip to main content' });
    expect((await link.boundingBox())!.x).toBeLessThan(0);

    await page.keyboard.press('Tab');
    await expect(link).toBeFocused();
    await expect(link).toBeInViewport();

    await screenReader.start();
    await screenReader.next();
    expect(await screenReader.spokenPhraseLog()).toContain('link, Skip to main content');
  });
});
