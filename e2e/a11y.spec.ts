import type { Result } from 'axe-core';

import { expect, test } from './fixtures';
import { KNOWN_VIOLATIONS } from './knownA11yViolations';
import { settle, storiesOf, storyFiles } from './stories';
import { gotoStory } from './storybook';

/**
 * Runs axe on every story, in a real browser. A new story is covered automatically.
 *
 * There is one test per story file, so a component's stories share a test and the
 * report reads per component. Each story is a step with a soft assertion, so all of a
 * component's violations are reported at once instead of stopping at the first.
 *
 * Stories tagged `!test` are skipped, as in Storybook's own test tooling. Known
 * violations are listed in knownA11yViolations.ts.
 */

const formatViolations = (violations: Result[]) =>
  violations.map((v) => `${v.id} (${v.impact}): ${v.help}\n  ${v.nodes.map((n) => n.target.join(' ')).join('\n  ')}`);

for (const storyFile of storyFiles) {
  test(`${storyFile} stories have no axe violations`, async ({ page, makeAxeBuilder, request }) => {
    const stories = await storiesOf(request, storyFile);
    expect(stories.length, `no stories found for ${storyFile} in index.json`).toBeGreaterThan(0);

    for (const story of stories) {
      await test.step(story.name, async () => {
        await gotoStory(page, story.id);
        await settle(page);
        const known = KNOWN_VIOLATIONS[story.id] ?? [];
        const { violations } = await makeAxeBuilder().analyze();

        const unexpected = violations.filter((v) => !known.includes(v.id));
        expect.soft(formatViolations(unexpected), `axe violations in ${story.id}`).toEqual([]);

        // A known violation that no longer occurs has been fixed: drop it from the list.
        const fixed = known.filter((rule) => !violations.some((v) => v.id === rule));
        expect.soft(fixed, `fixed violations to remove from KNOWN_VIOLATIONS['${story.id}']`).toEqual([]);
      });
    }
  });
}
