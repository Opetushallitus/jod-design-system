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

    await virtual.next();
    expect(await virtual.spokenPhraseLog()).toEqual(['link, Omat sivut', 'button, Kirjaudu ulos']);
  });

  // Known issue: the options are plain <div>s, so the popup is not exposed as a list and
  // the user does not hear how many options there are or where they are in it. Only the
  // bare items are read: ["link, Omat sivut", "button, Kirjaudu ulos"]. PopupList and
  // PopupListItem should render a list (e.g. <ul>/<li>). Remove `.fails` when fixed.
  it.fails('is read as a list with the number of options', async () => {
    const { container } = render(<Demo />);
    await virtual.start({ container });

    await virtual.next();
    await virtual.next();
    const log = await virtual.spokenPhraseLog();
    expect(log[0]).toBe('list');
    expect(log).toContain('listitem, level 1, position 1, set size 2');
  });
});
