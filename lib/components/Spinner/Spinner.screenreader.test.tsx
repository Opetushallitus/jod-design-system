import { virtual } from '@guidepup/virtual-screen-reader';
import { render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Spinner } from './Spinner';

/**
 * Screen reader tests with Guidepup's Virtual Screen Reader. See Accordion.screenreader.test.tsx.
 *
 * By design the Spinner is not a live region: with a label it is an image, without one it
 * is hidden. The component that owns the loading state announces it (see Accordion).
 */
describe('Spinner screen reader', () => {
  afterEach(async () => {
    await virtual.stop();
  });

  it('is read as an image with its label', async () => {
    const { container } = render(
      <div>
        <button>Before</button>
        <Spinner size={24} color="accent" label="Ladataan" />
        <button>After</button>
      </div>,
    );
    await virtual.start({ container });

    await virtual.next();
    await virtual.next();
    expect(await virtual.spokenPhraseLog()).toEqual(['button, Before', 'image, Ladataan', 'button, After']);
  });

  it('is skipped when it has no label', async () => {
    const { container } = render(
      <div>
        <button>Before</button>
        <Spinner size={24} color="accent" />
        <button>After</button>
      </div>,
    );
    await virtual.start({ container });

    await virtual.next();
    expect(await virtual.spokenPhraseLog()).toEqual(['button, Before', 'button, After']);
  });

  it('is not a live region', async () => {
    const { container } = render(<Spinner size={24} color="accent" label="Ladataan" />);
    await virtual.start({ container });

    // Nothing is announced on its own; the phrase is only the image itself.
    expect(await virtual.lastSpokenPhrase()).toBe('image, Ladataan');
  });
});
