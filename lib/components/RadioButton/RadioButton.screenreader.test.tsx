import { virtual } from '@guidepup/virtual-screen-reader';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { RadioButton } from './RadioButton';
import { RadioButtonGroup } from './RadioButtonGroup';

/**
 * Screen reader tests with Guidepup's Virtual Screen Reader. See Accordion.screenreader.test.tsx.
 *
 * Note: jsdom has no CSS, so a label hidden with hideLabel (Tailwind ds:hidden) is still
 * read here. It stays the group's accessible name through aria-labelledby either way.
 */
describe('RadioButton screen reader', () => {
  afterEach(async () => {
    await virtual.stop();
  });

  const Group = ({ requiredText }: { requiredText?: string }) => {
    const [value, setValue] = React.useState('a');
    return (
      <RadioButtonGroup label="Kieli" value={value} onChange={setValue} requiredText={requiredText}>
        <RadioButton label="Suomi" value="a" />
        <RadioButton label="Svenska" value="b" />
        <RadioButton label="English" value="c" disabled />
      </RadioButtonGroup>
    );
  };

  it('announces the group name and each radio with its state and position', async () => {
    const { container } = render(<Group />);
    await virtual.start({ container });

    expect(await virtual.lastSpokenPhrase()).toBe('radiogroup, Kieli, not required');
    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('Kieli');
    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('radio, Suomi, checked, position 1, set size 3');
  });

  it('announces the required state of the group', async () => {
    const { container } = render(<Group requiredText="pakollinen" />);
    await virtual.start({ container });

    expect(await virtual.lastSpokenPhrase()).toBe('radiogroup, Kieli (pakollinen), required');
  });

  it('announces the disabled state', async () => {
    const { container } = render(<Group />);
    await virtual.start({ container });

    // Walk to the last radio; each radio also reads its label text.
    await vi.waitFor(async () => {
      await virtual.next();
      expect(await virtual.lastSpokenPhrase()).toBe('radio, English, not checked, disabled, position 3, set size 3');
    });
  });

  it('announces the newly checked radio after moving with arrow keys', async () => {
    const { container } = render(<Group />);
    await virtual.start({ container });
    await virtual.next();
    await virtual.next();

    await virtual.press('ArrowDown');
    await screen.findByRole('radio', { name: 'Svenska', checked: true });

    expect(await virtual.lastSpokenPhrase()).toBe('radio, Svenska, checked, position 2, set size 3');
  });

  it('does not read the decorative radio icons', async () => {
    const { container } = render(<Group />);
    await virtual.start({ container });

    for (let i = 0; i < 6; i++) {
      await virtual.next();
    }
    expect(await virtual.spokenPhraseLog()).not.toContain('graphics-document');
  });
});
