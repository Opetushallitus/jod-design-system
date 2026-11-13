import type { Result } from 'axe-core';

import { expect, test } from './fixtures';
import { settle, storiesOf, storyFiles } from './stories';
import { gotoStory } from './storybook';

/**
 * Runs axe on every story, in a real browser. A new story is covered automatically.
 *
 * There is one test per story file, so a component's stories share a test and the
 * report reads per component. Each story is a step with a soft assertion, so all of a
 * component's violations are reported at once instead of stopping at the first.
 *
 * Stories tagged `!test` are skipped, as in Storybook's own test tooling.
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
        const { violations } = await makeAxeBuilder().analyze();
        expect.soft(formatViolations(violations), `axe violations in ${story.id}`).toEqual([]);
      });
    }
  });
}
