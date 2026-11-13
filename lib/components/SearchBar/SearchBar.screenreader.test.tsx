import { virtual } from '@guidepup/virtual-screen-reader';
import { render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { SearchBar } from './SearchBar';

/**
 * Screen reader tests with Guidepup's Virtual Screen Reader. See Accordion.screenreader.test.tsx.
 *
 * SearchBar has no result or loading announcement of its own; the consuming page owns the
 * results and must announce them. The only live region is the error message (role="alert"),
 * which is inserted together with its text. The Virtual Screen Reader does not announce a
 * live region inserted with its content, so these tests check that the error is read as
 * the input's description instead.
 */
describe('SearchBar screen reader', () => {
  afterEach(async () => {
    await virtual.stop();
  });

  const renderSearchBar = (props: { value?: string; errorMessage?: string } = {}) =>
    render(
      <SearchBar
        value={props.value ?? ''}
        onChange={() => {}}
        onSubmit={() => {}}
        placeholder="Hae"
        ariaLabel="Hae palvelusta"
        searchLabel="Hae"
        clearLabel="Tyhjennä"
        errorMessage={props.errorMessage}
      />,
    );

  it('announces the search form, the input label and the button names', async () => {
    const { container } = renderSearchBar();
    await virtual.start({ container });

    await virtual.next();
    await virtual.next();
    await virtual.next();
    // The submit button contains an icon and text, so the reader then steps into its content
    // ("Hae", "end of button, Hae"); only the button itself is asserted here.
    expect(await virtual.spokenPhraseLog()).toEqual([
      'form',
      'textbox, Hae palvelusta, not invalid, placeholder Hae',
      'button, Tyhjennä, disabled',
      'button, Hae',
    ]);
  });

  it('enables the clear button when there is a value', async () => {
    const { container } = renderSearchBar({ value: 'opettaja' });
    await virtual.start({ container });

    await virtual.next();
    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('button, Tyhjennä');
  });

  it('reads the error message as the description of an invalid input', async () => {
    const { container } = renderSearchBar({ errorMessage: 'Virhe' });
    await virtual.start({ container });

    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('textbox, Hae palvelusta, Virhe, invalid, placeholder Hae');
  });
});
