import type { Page } from '@playwright/test';

/**
 * Opens a single story in Storybook's preview iframe, without the Storybook UI around it.
 *
 * The story id is the kebab-cased story title plus the export name, e.g. the `Default`
 * export of `Components/Content/Accordion` is `components-content-accordion--default`.
 * It is also shown in the Storybook URL (`?path=/story/<id>`).
 */
export const gotoStory = async (page: Page, storyId: string, args?: Record<string, string | number | boolean>) => {
  const params = new URLSearchParams({
    id: storyId,
    viewMode: 'story',
    // Stops @storybook/addon-a11y from running axe automatically on render. Otherwise it
    // races with our own @axe-core/playwright scans ("Axe is already running").
    globals: 'a11y.manual:!true',
  });
  if (args) {
    // Storybook's URL args format: `key:value;key2:value2`
    params.set(
      'args',
      Object.entries(args)
        .map(([key, value]) => `${key}:${String(value)}`)
        .join(';'),
    );
  }
  await page.goto(`/iframe.html?${params.toString()}`);
  // Wait until Storybook has finished rendering the story. The sb-show-main class on
  // <body> is set before React has committed the story, and a story may legitimately
  // render nothing, so waiting for either is not enough. currentRender.phase is internal
  // to Storybook's preview; sb-show-errordisplay is set if rendering failed.
  await page.waitForFunction(() => {
    const preview = (window as { __STORYBOOK_PREVIEW__?: { currentRender?: { phase?: string } } })
      .__STORYBOOK_PREVIEW__;
    return (
      ['finished', 'completed'].includes(preview?.currentRender?.phase ?? '') ||
      document.body.classList.contains('sb-show-errordisplay')
    );
  });
  if (await page.locator('body.sb-show-errordisplay').count()) {
    throw new Error(`Story ${storyId} failed to render: ${await page.locator('#error-message').innerText()}`);
  }
};
