import { virtual } from '@guidepup/virtual-screen-reader';
import { render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { PopupList, PopupListItem } from './PopupList';

/**
 * Screen reader tests with Guidepup's Virtual Screen Reader. See Accordion.screenreader.test.tsx.
 *
 * PopupList is only the popup body: it has no trigger or open state of its own, so the
 * trigger's expanded state and focus handling belong to the consuming component.
 */
describe('PopupList screen reader', () => {
  afterEach(async () => {
    await virtual.stop();
  });

  const Demo = () => (
    <PopupList>
      <PopupListItem>
        <a href="/#">Omat sivut</a>
      </PopupListItem>
      <PopupListItem>
        <button>Kirjaudu ulos</button>
      </PopupListItem>
    </PopupList>
  );

  it('reads the interactive items in order', async () => {
    const { container } = render(<Demo />);
    await virtual.start({ container });

    for (let i = 0; i < 8; i++) await virtual.next();
    const items = (await virtual.spokenPhraseLog()).filter((phrase) => /^(link|button),/.test(phrase));
    expect(items).toEqual(['link, Omat sivut', 'button, Kirjaudu ulos']);
  });

  it('is read as a list with the number of options', async () => {
    const { container } = render(<Demo />);
    await virtual.start({ container });

    await virtual.next();
    await virtual.next();
    const log = await virtual.spokenPhraseLog();
    expect(log[0]).toBe('list');
    expect(log).toContain('listitem, level 1, position 1, set size 2');
  });
});
