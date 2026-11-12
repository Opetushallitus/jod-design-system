import { virtual } from '@guidepup/virtual-screen-reader';
import { render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { InputField } from './InputField';

/**
 * Screen reader tests with Guidepup's Virtual Screen Reader. See Accordion.screenreader.test.tsx.
 */
describe('InputField screen reader', () => {
  afterEach(async () => {
    await virtual.stop();
  });

  const noop = () => undefined;

  it('announces the label, role, value and default states', async () => {
    const { container } = render(<InputField label="Nimi" value="Matti" onChange={noop} />);
    await virtual.start({ container });

    expect(await virtual.lastSpokenPhrase()).toBe('Nimi');
    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('textbox, Nimi, Matti, not invalid, not required');
  });

  it('announces the placeholder when the label is hidden', async () => {
    const { container } = render(<InputField hideLabel placeholder="Hae" onChange={noop} />);
    await virtual.start({ container });

    expect(await virtual.lastSpokenPhrase()).toBe('textbox, not invalid, placeholder Hae, not required');
  });

  it('reads the help and error texts as the field description with required and invalid states', async () => {
    const { container } = render(
      <InputField
        label="Nimi"
        placeholder="Kirjoita"
        requiredText="pakollinen"
        help="Ohje"
        errorMessage="Virhe"
        onChange={noop}
      />,
    );
    await virtual.start({ container });

    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe(
      'textbox, Nimi (pakollinen), Ohje Virhe, invalid, placeholder Kirjoita, required',
    );

    // The help text and the error alert follow the field in reading order.
    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('Ohje');
    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('alert');
    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('Virhe');
  });
});
