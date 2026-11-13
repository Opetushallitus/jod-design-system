import { virtual } from '@guidepup/virtual-screen-reader';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import { Toggle } from './Toggle';

/**
 * Screen reader tests with Guidepup's Virtual Screen Reader. See Accordion.screenreader.test.tsx.
 *
 * Note: Guidepup's press('Space') does not trigger a click on a button in jsdom, so the
 * state change is triggered with virtual.act(), which clicks the current item.
 */
describe('Toggle screen reader', () => {
  afterEach(async () => {
    await virtual.stop();
  });

  const ControlledToggle = () => {
    const [checked, setChecked] = React.useState(false);
    return <Toggle ariaLabel="Ilmoitukset" checked={checked} onChange={setChecked} serviceVariant="yksilo" />;
  };

  it('announces the role, name and checked state', async () => {
    const { container } = render(<ControlledToggle />);
    await virtual.start({ container });

    expect(await virtual.lastSpokenPhrase()).toBe('switch, Ilmoitukset, not checked');
  });

  it('announces the new state when toggled', async () => {
    const { container } = render(<ControlledToggle />);
    await virtual.start({ container });

    await virtual.act();
    await screen.findByRole('switch', { checked: true });

    expect(await virtual.spokenPhraseLog()).toEqual([
      'switch, Ilmoitukset, not checked',
      'switch, Ilmoitukset, checked',
    ]);
  });

  it('announces the disabled state', async () => {
    const { container } = render(
      <Toggle ariaLabel="Ilmoitukset" checked disabled onChange={() => {}} serviceVariant="yksilo" />,
    );
    await virtual.start({ container });

    expect(await virtual.lastSpokenPhrase()).toBe('switch, Ilmoitukset, checked, disabled');
  });

  it('reads the name from ariaLabelledBy and the description from ariaDescribedBy', async () => {
    const { container } = render(
      <div>
        <span id="toggle-label">Sähköposti-ilmoitukset</span>
        <p id="toggle-help">Saat viestin, kun tila muuttuu</p>
        <Toggle
          ariaLabelledBy="toggle-label"
          ariaDescribedBy="toggle-help"
          checked={false}
          onChange={() => {}}
          serviceVariant="yksilo"
        />
      </div>,
    );
    await virtual.start({ container });

    // Label text, then the paragraph (start, text, end), then the switch.
    for (let i = 0; i < 4; i++) {
      await virtual.next();
    }
    expect(await virtual.lastSpokenPhrase()).toBe(
      'switch, Sähköposti-ilmoitukset, Saat viestin, kun tila muuttuu, not checked',
    );
  });
});
