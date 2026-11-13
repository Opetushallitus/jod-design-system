import { expect, test } from './fixtures';
import { KNOWN_REFLOW_ISSUES } from './knownReflowIssues';
import { settle, storiesOf, storyFiles } from './stories';
import { gotoStory } from './storybook';

/**
 * WCAG 1.4.10 Reflow: content must fit a 320 CSS px wide viewport (400% zoom on a
 * 1280px screen) without horizontal scrolling. Checked for every story, like a11y.spec.ts.
 *
 * Content that needs two-dimensional layout (e.g. data tables) is exempt from the
 * criterion; list such stories in knownReflowIssues.ts with the reason.
 */

const WIDTH = 320;

// Runs on the chromium project only (see playwright.config.ts).
test.use({ viewport: { width: WIDTH, height: 640 } });

for (const storyFile of storyFiles) {
  test(`${storyFile} stories reflow at ${WIDTH}px`, async ({ page, request }) => {
    const stories = await storiesOf(request, storyFile);
    expect(stories.length, `no stories found for ${storyFile} in index.json`).toBeGreaterThan(0);

    for (const story of stories) {
      await test.step(story.name, async () => {
        await gotoStory(page, story.id);
        await settle(page);

        const overflow = await page.evaluate(() => {
          const viewport = document.documentElement.clientWidth;
          const scrollWidth = document.documentElement.scrollWidth;
          // The innermost elements that stick out on the right, to point at the culprit.
          const culprits = [...document.querySelectorAll<HTMLElement>('#storybook-root *')]
            .filter((el) => el.getBoundingClientRect().right > viewport + 1)
            .filter((el) => ![...el.children].some((child) => child.getBoundingClientRect().right > viewport + 1))
            .slice(0, 3)
            .map((el) => {
              const id = el.dataset.testid ? `[data-testid=${el.dataset.testid}]` : '';
              return `${el.tagName.toLowerCase()}${id} right=${Math.round(el.getBoundingClientRect().right)}`;
            });
          return { scrollWidth, viewport, culprits };
        });

        const overflows = overflow.scrollWidth > overflow.viewport;
        const known = story.id in KNOWN_REFLOW_ISSUES;
        if (known) {
          expect.soft(overflows, `${story.id} reflows now: remove it from KNOWN_REFLOW_ISSUES`).toBe(true);
        } else {
          expect
            .soft(
              overflows ? overflow : null,
              `${story.id} scrolls horizontally at ${WIDTH}px (page ${overflow.scrollWidth}px wide)`,
            )
            .toBeNull();
        }
      });
    }
  });
}
