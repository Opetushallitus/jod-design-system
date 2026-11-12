import { virtual } from '@guidepup/virtual-screen-reader';
import { render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { WizardProgress } from './WizardProgress';

/**
 * Screen reader tests with Guidepup's Virtual Screen Reader. See Accordion.screenreader.test.tsx.
 *
 * Note: the step number and its visually hidden texts are separate spans, so the reader
 * reads them as separate phrases ("Step:", "2", ", current."). Real screen readers often
 * do the same in browse mode.
 */
describe('WizardProgress screen reader', () => {
  afterEach(async () => {
    await virtual.stop();
  });

  const renderWizard = (currentStep: number) => (
    <WizardProgress
      steps={4}
      currentStep={currentStep}
      completedText="completed"
      currentText="current"
      stepText="Step"
      labelText="Progress"
    />
  );

  const readAll = async () => {
    for (let i = 0; i < 17; i++) await virtual.next();
    return virtual.spokenPhraseLog();
  };

  it('announces a labelled list of steps with completed and current state', async () => {
    const { container } = render(renderWizard(2));
    await virtual.start({ container });

    const log = await readAll();
    expect(log[0]).toBe('list, Progress');
    // The completed step's checkmark icon has role="presentation", so only its text is read.
    expect(log[2]).toBe('Step: 1, completed.');
    expect(log).toEqual(
      expect.arrayContaining([
        'listitem, level 1, current item, position 2, set size 4',
        ', current.',
        'end of list, Progress',
      ]),
    );
    expect(log).not.toContain('graphics-document');
    // Only one step is current. The other steps have aria-current="false", which Guidepup
    // reads as "not current item"; real screen readers usually say nothing for it, so that
    // phrase is not asserted.
    expect(log.filter((phrase) => phrase.startsWith('listitem') && phrase.includes(', current item,'))).toHaveLength(1);
  });

  it('announces the next step as current after moving forward', async () => {
    const { container, rerender } = render(renderWizard(2));
    rerender(renderWizard(3));
    await virtual.start({ container });

    const log = await readAll();
    expect(log).toEqual(
      expect.arrayContaining([
        'Step: 1, completed.',
        'Step: 2, completed.',
        'listitem, level 1, current item, position 3, set size 4',
      ]),
    );
    expect(log).not.toContain('listitem, level 1, current item, position 2, set size 4');
  });
});
