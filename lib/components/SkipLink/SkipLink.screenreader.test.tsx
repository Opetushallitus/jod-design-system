import { virtual } from '@guidepup/virtual-screen-reader';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { SkipLink } from './SkipLink';

/**
 * Screen reader tests with Guidepup's Virtual Screen Reader. See Accordion.screenreader.test.tsx.
 *
 * Note: jsdom does not navigate to a fragment, so activating the link does not move focus
 * here. The tests check the link's name and that its target exists in the document.
 * Moving focus to the target is browser behavior and belongs in an e2e test.
 *
 * jsdom has no CSS either, so the link is read even though it is moved off screen until it
 * gets focus. That matches real screen readers: the link is visually hidden, not aria-hidden.
 */
describe('SkipLink screen reader', () => {
  afterEach(async () => {
    await virtual.stop();
  });

  const Demo = () => (
    <div>
      <SkipLink label="Siirry sisältöön" hash="#main" />
      <nav>
        <a href="/muu">Muu sivu</a>
      </nav>
      <main id="main" tabIndex={-1}>
        <h1>Otsikko</h1>
      </main>
    </div>
  );

  it('is the first item read on the page', async () => {
    const { container } = render(<Demo />);
    await virtual.start({ container });

    expect(await virtual.lastSpokenPhrase()).toBe('link, Siirry sisältöön');
  });

  it('points to an existing target', async () => {
    const { container } = render(<Demo />);
    await virtual.start({ container });

    const link = screen.getByRole('link', { name: 'Siirry sisältöön' });
    expect(link).toHaveAttribute('href', '#main');
    expect(document.getElementById('main')).toBe(screen.getByRole('main'));
  });
});
