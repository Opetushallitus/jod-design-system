import { virtual } from '@guidepup/virtual-screen-reader';
import { render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Select } from './Select';

/**
 * Screen reader tests with Guidepup's Virtual Screen Reader. See Accordion.screenreader.test.tsx.
 *
 * The button gets aria-labelledby="<label> <button>", so browsers name it "Kieli Svenska".
 * Guidepup's name computation (dom-accessibility-api) skips the self-reference and names it
 * only "Kieli", so these tests read the selected value as the button content instead.
 *
 * The options are rendered next to the button, but the reader is started on document.body
 * in case Headless UI moves them to a portal.
 */
describe('Select screen reader', () => {
  afterEach(async () => {
    await virtual.stop();
  });

  const options = [
    { value: 'fi', label: 'Suomi' },
    { value: 'sv', label: 'Svenska' },
    { value: 'en', label: 'English' },
  ];

  it('announces the label, role, collapsed state and selected value', async () => {
    render(<Select label="Kieli" options={options} placeholder="Valitse" selected="sv" />);
    await virtual.start({ container: document.body });

    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('Kieli');
    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('button, Kieli, not expanded, has popup listbox');
    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('Svenska');
  });

  it('announces the placeholder when nothing is selected', async () => {
    render(<Select label="Kieli" options={options} placeholder="Valitse" />);
    await virtual.start({ container: document.body });

    await virtual.next();
    await virtual.next();
    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('Valitse');
  });

  it('announces the expanded state and the active option while browsing with arrow keys', async () => {
    render(<Select label="Kieli" options={options} placeholder="Valitse" selected="fi" />);
    await virtual.start({ container: document.body });
    await virtual.next();
    await virtual.next();

    // ArrowDown opens the listbox and moves focus to the selected option.
    await virtual.press('ArrowDown');
    expect(await virtual.lastSpokenPhrase()).toBe('listbox, Kieli, orientated vertically, active descendant Suomi');

    await virtual.press('ArrowDown');
    expect(await virtual.lastSpokenPhrase()).toBe('listbox, Kieli, orientated vertically, active descendant Svenska');

    // The button before the listbox is now expanded.
    await virtual.previous();
    expect(await virtual.lastSpokenPhrase()).toBe('end of button, Kieli, 1 control, expanded, has popup listbox');

    // The options expose their selected state. The caret icon is read in between, so
    // only the option phrases are checked.
    await virtual.next();
    await virtual.next();
    await virtual.next();
    await virtual.next();
    await virtual.next();
    await virtual.next();
    await virtual.next();
    await virtual.next();
    const log = await virtual.spokenPhraseLog();
    expect(log).toContain('option, Suomi, selected, position 1, set size 3');
    expect(log).toContain('option, Svenska, not selected, position 2, set size 3');
  });

  it('announces the new value and collapsed state after selecting with Enter', async () => {
    render(<Select label="Kieli" options={options} placeholder="Valitse" selected="fi" />);
    await virtual.start({ container: document.body });
    await virtual.next();
    await virtual.next();

    await virtual.press('ArrowDown');
    await virtual.press('ArrowDown');
    await virtual.press('Enter');
    expect(await virtual.lastSpokenPhrase()).toBe('button, Kieli, not expanded, has popup listbox');
    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('Svenska');
  });

  it('reads the help and error texts as the field description', async () => {
    render(<Select label="Kieli" options={options} placeholder="Valitse" help="Ohje" errorMessage="Virhe" />);
    await virtual.start({ container: document.body });

    await virtual.next();
    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('button, Kieli, Ohje Virhe, not expanded, has popup listbox');
  });

  // Known issue: the invalid state is not announced. The error sets aria-invalid on the
  // ListboxButton, but the button role does not support aria-invalid, so it is ignored.
  // The error text is still read as the description. A role that supports aria-invalid
  // (e.g. combobox) is needed. Remove `.fails` when fixed.
  it.fails('announces the invalid state', async () => {
    render(<Select label="Kieli" options={options} placeholder="Valitse" errorMessage="Virhe" />);
    await virtual.start({ container: document.body });

    await virtual.next();
    await virtual.next();
    const phrase = await virtual.lastSpokenPhrase();
    expect(phrase).toContain('Virhe');
    expect(phrase).toMatch(/(^|, )invalid(,|$)/);
  });
});
