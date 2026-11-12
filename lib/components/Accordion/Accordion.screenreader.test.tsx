import { virtual } from '@guidepup/virtual-screen-reader';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Accordion } from './Accordion';

/**
 * Screen reader tests with Guidepup's Virtual Screen Reader: it walks the accessibility
 * tree like a screen reader and logs what would be announced. This verifies names,
 * roles, states and live regions as a user hears them, which axe does not.
 *
 * Note: jsdom has no Tailwind CSS, so content hidden only by CSS classes would still be
 * announced here. Accordion removes closed content from the DOM, so that does not apply.
 */
describe('Accordion screen reader', () => {
  afterEach(async () => {
    await virtual.stop();
  });

  it('announces the title, role and expanded state', async () => {
    const { container } = render(<Accordion title="Title">Content</Accordion>);
    await virtual.start({ container });

    expect(await virtual.lastSpokenPhrase()).toBe('button, Title, expanded');

    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('Content');
  });

  it('announces the new state when toggled', async () => {
    // animated={false}: closed content is removed at once instead of after the transition.
    const { container } = render(
      <Accordion title="Title" animated={false}>
        Content
      </Accordion>,
    );
    await virtual.start({ container });

    await virtual.act();
    await screen.findByRole('button', { expanded: false });

    // The reader re-announces the focused button when its state changes.
    expect(await virtual.spokenPhraseLog()).toEqual(['button, Title, expanded', 'button, Title, not expanded']);
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('announces the loading text while fetching data', async () => {
    let resolveFetch = () => {};
    const fetchData = () =>
      new Promise<void>((resolve) => {
        resolveFetch = resolve;
      });

    const { container } = render(
      <Accordion title="Title" fetchData={fetchData} loadingText="Ladataan" initialState={false}>
        Content
      </Accordion>,
    );
    await virtual.start({ container });

    await virtual.act();
    await screen.findByText('Ladataan');

    // role="status" is a polite live region: the update is announced without moving the
    // cursor, once the reader's mutation observer has picked it up.
    await vi.waitFor(async () => expect(await virtual.spokenPhraseLog()).toContain('polite: Ladataan'));

    resolveFetch();
    await screen.findByText('Content');
  });
});
