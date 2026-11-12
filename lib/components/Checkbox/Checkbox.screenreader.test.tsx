import { virtual } from '@guidepup/virtual-screen-reader';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import { Checkbox } from './Checkbox';

/**
 * Screen reader tests with Guidepup's Virtual Screen Reader. See Accordion.screenreader.test.tsx.
 *
 * Note: Guidepup's press('Space') does not activate a native checkbox in jsdom, so the
 * state change is triggered with virtual.act(), which clicks the current item.
 */
describe('Checkbox screen reader', () => {
  afterEach(async () => {
    await virtual.stop();
  });

  const ControlledCheckbox = () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <Checkbox
        name="terms"
        value="accepted"
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
        label="Hyväksyn ehdot"
        ariaLabel="Unused"
      />
    );
  };

  it('announces the role, label and checked state', async () => {
    const { container } = render(<ControlledCheckbox />);
    await virtual.start({ container });

    expect(await virtual.lastSpokenPhrase()).toBe('checkbox, Hyväksyn ehdot, not checked, not required');
    // The visible <label> follows the input and is read as its own item.
    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('Hyväksyn ehdot');
  });

  it('announces the new state when toggled', async () => {
    const { container } = render(<ControlledCheckbox />);
    await virtual.start({ container });

    await virtual.act();
    await screen.findByRole('checkbox', { checked: true });

    expect(await virtual.spokenPhraseLog()).toEqual([
      'checkbox, Hyväksyn ehdot, not checked, not required',
      'checkbox, Hyväksyn ehdot, checked, not required',
    ]);
  });

  it('uses ariaLabel as the name when there is no visible label', async () => {
    const { container } = render(<Checkbox name="row" value="1" checked={false} ariaLabel="Valitse rivi" />);
    await virtual.start({ container });

    expect(await virtual.lastSpokenPhrase()).toBe('checkbox, Valitse rivi, not checked, not required');
  });

  it('announces the required state with the required text in the label', async () => {
    const { container } = render(
      <Checkbox
        name="terms"
        value="accepted"
        checked={false}
        label="Hyväksyn ehdot"
        ariaLabel=""
        requiredText="pakollinen"
      />,
    );
    await virtual.start({ container });

    expect(await virtual.lastSpokenPhrase()).toBe('checkbox, Hyväksyn ehdot (pakollinen), not checked, required');
  });

  it('announces the disabled state', async () => {
    const { container } = render(
      <Checkbox name="terms" value="accepted" checked disabled label="Ehdot" ariaLabel="" />,
    );
    await virtual.start({ container });

    expect(await virtual.lastSpokenPhrase()).toBe('checkbox, Ehdot, checked, disabled, not required');
  });

  it('announces the indeterminate state as partially checked', async () => {
    // checked={false}: Guidepup reads a native checkbox's `checked` property before the
    // indeterminate state, so checked + indeterminate is announced as "checked" here,
    // whereas browsers expose it as mixed.
    const { container } = render(
      <Checkbox name="all" value="all" checked={false} indeterminate label="Valitse kaikki" ariaLabel="" />,
    );
    await virtual.start({ container });

    expect(await virtual.lastSpokenPhrase()).toBe('checkbox, Valitse kaikki, partially checked, not required');
  });

  it('does not read the decorative check icons', async () => {
    const { container } = render(<ControlledCheckbox />);
    await virtual.start({ container });

    await virtual.next();
    await virtual.next();
    expect(await virtual.spokenPhraseLog()).not.toContain('graphics-document');
  });
});
