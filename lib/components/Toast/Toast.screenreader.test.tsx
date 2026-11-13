import { virtual } from '@guidepup/virtual-screen-reader';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Toast } from './Toast';

/**
 * Screen reader tests with Guidepup's Virtual Screen Reader. See Accordion.screenreader.test.tsx.
 *
 * Note: the Virtual Screen Reader announces changes inside a live region that is already
 * in the DOM, but not a live region that is inserted with its content. Real screen
 * readers handle an inserted role="alert" inconsistently too, so these tests cover the
 * reliable pattern: the toast stays mounted and its text changes.
 */
describe('Toast screen reader', () => {
  afterEach(async () => {
    await virtual.stop();
  });

  it('is read as an alert with its text', async () => {
    const { container } = render(<Toast text="Saved" />);
    await virtual.start({ container });

    expect(await virtual.lastSpokenPhrase()).toBe('alert');
    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('Saved');
  });

  it('does not read the decorative icon', async () => {
    const { container } = render(<Toast text="Saved" />);
    await virtual.start({ container });

    await virtual.next();
    await virtual.next();
    expect(await virtual.spokenPhraseLog()).toEqual(['alert', 'Saved', 'end of alert']);
  });

  it('announces a new text assertively without moving the cursor', async () => {
    const Demo = () => {
      const [text, setText] = React.useState('');
      return (
        <div>
          <button onClick={() => setText('Saved')}>Save</button>
          <Toast text={text} />
        </div>
      );
    };
    const { container } = render(<Demo />);
    await virtual.start({ container });

    await virtual.act();
    await screen.findByText('Saved');

    await vi.waitFor(async () => expect(await virtual.spokenPhraseLog()).toContain('assertive: Saved'));
    // The cursor stays on the button that triggered the toast.
    expect(await virtual.itemText()).toBe('Save');
  });
});
