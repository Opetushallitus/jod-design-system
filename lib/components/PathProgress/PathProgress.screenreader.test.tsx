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
    for (let i = 0; i < 9; i++) await virtual.next();
    return virtual.spokenPhraseLog();
  };

  it('reads the steps in order with their number, label and content', async () => {
    const { container } = render(<PathProgress steps={steps} />);
    await virtual.start({ container });

    expect(await readAll()).toEqual([
      '1',
      'First',
      'paragraph',
      'Content 1',
      'end of paragraph',
      '2',
      'Second',
      'paragraph',
      'Content 2',
      'end of paragraph',
    ]);
  });

  // Known issue: the steps are plain divs, so the reader does not announce them as a list
  // and the user does not hear how many steps the path has. An <ol> with <li> steps would
  // give "list" and "listitem, ..., set size 2". Remove `.fails` when fixed.
  it.fails('announces the steps as a list with the step count', async () => {
    const { container } = render(<PathProgress steps={steps} />);
    await virtual.start({ container });

    const log = await readAll();
    expect(log[0]).toMatch(/^list/);
    expect(log).toContainEqual(expect.stringContaining('set size 2'));
  });

  // Known issue: `isCompleted` only changes the circle's colours, so the completed state is
  // not conveyed to a screen reader (both steps above are read the same way). It needs
  // a text alternative, e.g. a visually hidden "completed". Remove `.fails` when fixed.
  it.fails('announces which steps are completed', async () => {
    const { container } = render(<PathProgress steps={steps} />);
    await virtual.start({ container });

    const log = await readAll();
    expect(log.slice(0, 5).join(' ')).toMatch(/completed/i);
  });
});
