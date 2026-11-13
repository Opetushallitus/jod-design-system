import { virtual } from '@guidepup/virtual-screen-reader';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { NavigationMenu } from './NavigationMenu';
import type { LinkComponent } from './types';

/**
 * Screen reader tests with Guidepup's Virtual Screen Reader. See Accordion.screenreader.test.tsx.
 *
 * The menu is a <dialog>, so the reader is started on document.body. jsdom has no
 * HTMLDialogElement.showModal()/close(), so they are stubbed like in NavigationMenu.test.tsx.
 * Because of the stub the dialog is not announced as "modal" here, and opening it does not
 * move focus into it (a real showModal() would), so the tests browse into the dialog.
 *
 * Note: jsdom has no CSS, so the visually hidden "opens in a new window" text of the portal
 * link is joined to the label without a space ("EtusivuAvautuu uuteen ikkunaan"). Browsers
 * separate them, so that phrase is only checked with toContain.
 */
describe('NavigationMenu screen reader', () => {
  beforeAll(() => {
    if (!HTMLDialogElement.prototype.showModal) {
      HTMLDialogElement.prototype.showModal = function () {
        this.open = true;
      };
    }
    if (!HTMLDialogElement.prototype.close) {
      HTMLDialogElement.prototype.close = function () {
        this.open = false;
      };
    }
  });

  afterEach(async () => {
    await virtual.stop();
  });

  const Link = ({ children, ...rest }: LinkComponent) => (
    <a href="/#" {...rest}>
      {children}
    </a>
  );

  const Demo = () => {
    const [open, setOpen] = React.useState(false);
    const onClose = React.useCallback(() => setOpen(false), []);
    return (
      <div>
        <button onClick={() => setOpen(true)}>Valikko</button>
        <NavigationMenu
          open={open}
          onClose={onClose}
          ariaLabel="Päävalikko"
          navigationAriaLabel="Päänavigaatio"
          ariaCloseMenu="Sulje valikko"
          portalLinkLabel="Etusivu"
          portalLinkComponent={Link}
          openSubMenuLabel="Avaa alivalikko"
          menuSection={{
            title: 'Osiot',
            linkItems: [
              { label: 'Profiili', linkComponent: Link, selected: true },
              { label: 'Kartoita', linkComponent: Link, childItems: [{ label: 'Osaamiset', linkComponent: Link }] },
              { label: 'Ryhmä', childItems: [{ label: 'Alakohta', linkComponent: Link }] },
            ],
          }}
          languageSelectionItems={[
            { label: 'Suomi', value: 'fi', linkComponent: Link },
            { label: 'English', value: 'en', linkComponent: Link },
          ]}
          languageSelectionTitle="Kieli"
          selectedLanguage="fi"
          serviceVariant="yksilo"
          externalLinkIconAriaLabel="Avautuu uuteen ikkunaan"
        />
      </div>
    );
  };

  /** Renders the demo and opens the menu with the reader. */
  const openMenu = async () => {
    render(<Demo />);
    await virtual.start({ container: document.body });
    await virtual.next();
    await virtual.act();
    await screen.findByRole('dialog');
  };

  /** Moves the reader forward until the given phrase is spoken. */
  const moveTo = async (phrase: string) => {
    for (let i = 0; i < 60; i++) {
      await virtual.next();
      if ((await virtual.lastSpokenPhrase()) === phrase) {
        return;
      }
    }
    throw new Error(`Phrase not found: ${phrase}`);
  };

  it('reads the dialog, navigation landmark and close button by name', async () => {
    await openMenu();

    // The reader enters the dialog twice ("dialog, Päävalikko" is spoken two times in a row),
    // so the steps are matched by phrase rather than by count.
    await moveTo('dialog, Päävalikko');
    await moveTo('navigation, Päänavigaatio');
    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('button, Sulje valikko');
    await virtual.next();
    const portalLink = await virtual.lastSpokenPhrase();
    expect(portalLink).toContain('link, Etusivu');
    expect(portalLink).toContain('Avautuu uuteen ikkunaan');
  });

  it('reads the menu as a titled list and marks the current page and language', async () => {
    await openMenu();

    await moveTo('heading, Osiot, level 2');
    await virtual.next();
    await virtual.next();
    await virtual.next();
    expect((await virtual.spokenPhraseLog()).slice(-3)).toEqual([
      'list',
      'listitem, level 1, position 1, set size 3',
      'link, Profiili, current item',
    ]);

    await moveTo('heading, Kieli, level 2');
    await moveTo('link, Suomi, current item');
  });

  it('announces the submenu toggle state and moves focus into the opened submenu', async () => {
    await openMenu();

    await moveTo('link, Kartoita');
    await moveTo('button, Avaa alivalikko Kartoita, not expanded');
    await virtual.act();

    const link = await screen.findByRole('link', { name: 'Osaamiset' });
    await waitFor(() => expect(link).toHaveFocus());
    await waitFor(async () => expect(await virtual.lastSpokenPhrase()).toBe('link, Osaamiset'));
    expect(screen.getByRole('button', { name: 'Avaa alivalikko Kartoita' })).toHaveAttribute('aria-expanded', 'true');
  });

  // When a menu item has no link, the whole item is a button. Its accessible name starts
  // with the visible text (WCAG 2.5.3 Label in Name), followed by openSubMenuLabel.
  it('names a submenu button by its visible label', async () => {
    await openMenu();

    await moveTo('listitem, level 1, position 3, set size 3');
    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('button, Ryhmä Avaa alivalikko, not expanded');
  });

  it('does not read the decorative caret icon', async () => {
    await openMenu();

    await moveTo('listitem, level 1, position 3, set size 3');
    for (let i = 0; i < 3; i++) {
      await virtual.next();
    }
    expect(await virtual.spokenPhraseLog()).not.toContain('graphics-document');
  });

  it('returns focus to the opening button when closed', async () => {
    await openMenu();

    await moveTo('button, Sulje valikko');
    await virtual.act();
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());

    await waitFor(() => expect(screen.getByRole('button', { name: 'Valikko' })).toHaveFocus());
  });
});
