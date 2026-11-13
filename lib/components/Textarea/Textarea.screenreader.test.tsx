import { virtual } from '@guidepup/virtual-screen-reader';
import { render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Textarea } from './Textarea';

/**
 * Screen reader tests with Guidepup's Virtual Screen Reader. See Accordion.screenreader.test.tsx.
 */
describe('Textarea screen reader', () => {
  afterEach(async () => {
    await virtual.stop();
  });

  const noop = () => undefined;

  it('announces the label, role and value', async () => {
    const { container } = render(<Textarea label="Kuvaus" value="Teksti" onChange={noop} />);
    await virtual.start({ container });

    expect(await virtual.lastSpokenPhrase()).toBe('Kuvaus');
    await virtual.next();
    // Guidepup does not include a textarea's value in the textbox phrase like it does for
    // an input. It reads the value as the textarea's child text instead.
    expect(await virtual.lastSpokenPhrase()).toBe('textbox, Kuvaus, not invalid, not required');
    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('Teksti');
  });

  it('announces the placeholder when the label is hidden', async () => {
    const { container } = render(<Textarea hideLabel placeholder="Kuvaus" onChange={noop} />);
    await virtual.start({ container });

    expect(await virtual.lastSpokenPhrase()).toBe('textbox, not invalid, placeholder Kuvaus, not required');
  });

  it('reads the help and error texts as the field description with invalid state', async () => {
    const { container } = render(<Textarea label="Kuvaus" help="Ohje" errorMessage="Virhe" onChange={noop} />);
    await virtual.start({ container });

    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('textbox, Kuvaus, Ohje Virhe, invalid, not required');

    // The help text and the error alert follow the field in reading order.
    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('Ohje');
    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('alert');
    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('Virhe');
  });

  it('announces the required state', async () => {
    const { container } = render(<Textarea label="Kuvaus" requiredText="pakollinen" onChange={noop} />);
    await virtual.start({ container });

    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('textbox, Kuvaus (pakollinen), not invalid, required');
  });
});
