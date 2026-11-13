import { virtual } from '@guidepup/virtual-screen-reader';
import { render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Combobox } from './Combobox';

/**
 * Screen reader tests with Guidepup's Virtual Screen Reader. See Accordion.screenreader.test.tsx.
 */
describe('Combobox screen reader', () => {
  afterEach(async () => {
    await virtual.stop();
  });

  const options = [
    { value: 'fi', label: 'Suomi' },
    { value: 'sv', label: 'Svenska' },
    { value: 'en', label: 'English' },
  ];

  it('announces the label, selected value and collapsed state', async () => {
    const { container } = render(<Combobox label="Kieli" options={options} placeholder="Valitse" />);
    await virtual.start({ container });

    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe(
      'combobox, Kieli, Suomi, has popup listbox, not expanded, autocomplete in list, not invalid, not required',
    );

    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('button, Kieli, not expanded, has popup listbox');
  });

  it('announces the active option while browsing with arrow keys and the new value after selecting', async () => {
    const { container } = render(<Combobox label="Kieli" options={options} placeholder="Valitse" />);
    await virtual.start({ container });
    await virtual.next();

    await virtual.press('ArrowDown');
    expect(await virtual.lastSpokenPhrase()).toContain('expanded, active descendant Suomi');

    await virtual.press('ArrowDown');
    expect(await virtual.lastSpokenPhrase()).toContain('expanded, active descendant Svenska');

    await virtual.press('Enter');
    expect(await virtual.lastSpokenPhrase()).toBe(
      'combobox, Kieli, Svenska, has popup listbox, not expanded, autocomplete in list, not invalid, not required',
    );
  });

  it('announces required and invalid state', async () => {
    const { container } = render(
      <Combobox label="Kieli" options={options} placeholder="Valitse" requiredText="pakollinen" errorMessage="Virhe" />,
    );
    await virtual.start({ container });

    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe(
      'combobox, Kieli (pakollinen), Suomi, Virhe, has popup listbox, not expanded, autocomplete in list, invalid, required',
    );
  });

  it('reads the help and error texts as the field description', async () => {
    const { container } = render(
      <Combobox label="Kieli" options={options} placeholder="Valitse" help="Ohje" errorMessage="Virhe" />,
    );
    await virtual.start({ container });

    await virtual.next();
    const phrase = await virtual.lastSpokenPhrase();
    expect(phrase).toContain('Ohje');
    expect(phrase).toContain('Virhe');
  });
});
