import { virtual } from '@guidepup/virtual-screen-reader';
import { render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { PathProgress, type PathProgressStep } from './PathProgress';

/**
 * Screen reader tests with Guidepup's Virtual Screen Reader. See Accordion.screenreader.test.tsx.
 *
 * PathProgress has no current step prop, so only the step order and the completed state
 * are tested.
 */
describe('PathProgress screen reader', () => {
  afterEach(async () => {
    await virtual.stop();
  });

  const steps: PathProgressStep[] = [
    { circleComponent: <span>1</span>, label: 'First', content: <p>Content 1</p>, isCompleted: true },
    { circleComponent: <span>2</span>, label: 'Second', content: <p>Content 2</p> },
  ];

  const readAll = async () => {
    for (let i = 0; i < 14; i++) await virtual.next();
    return virtual.spokenPhraseLog();
  };

  it('reads the steps as a list in order with their number, label and content', async () => {
    const { container } = render(<PathProgress steps={steps} />);
    await virtual.start({ container });

    expect(await readAll()).toEqual([
      'list',
      'listitem, level 1, position 1, set size 2',
      '1',
      'First',
      'paragraph',
      'Content 1',
      'end of paragraph',
      'end of listitem, level 1, position 1, set size 2',
      'listitem, level 1, position 2, set size 2',
      '2',
      'Second',
      'paragraph',
      'Content 2',
      'end of paragraph',
      'end of listitem, level 1, position 2, set size 2',
    ]);
  });

  it('announces the steps as a list with the step count', async () => {
    const { container } = render(<PathProgress steps={steps} />);
    await virtual.start({ container });

    const log = await readAll();
    expect(log[0]).toMatch(/^list/);
    expect(log).toContainEqual(expect.stringContaining('set size 2'));
  });

  it('announces which steps are completed', async () => {
    const { container } = render(<PathProgress steps={steps} completedText="Completed" />);
    await virtual.start({ container });

    const log = await readAll();
    expect(log.slice(0, 5).join(' ')).toMatch(/completed/i);
  });
});
