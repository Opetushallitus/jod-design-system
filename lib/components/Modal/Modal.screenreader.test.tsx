import { virtual } from '@guidepup/virtual-screen-reader';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import { Modal } from './Modal';

/**
 * Screen reader tests with Guidepup's Virtual Screen Reader. See Accordion.screenreader.test.tsx.
 *
 * The dialog is rendered in a portal, so the reader is started on document.body.
 */
describe('Modal screen reader', () => {
  afterEach(async () => {
    await virtual.stop();
  });

  const Demo = () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div>
        <button onClick={() => setOpen(true)}>Open</button>
        <Modal
          name="Settings"
          open={open}
          onClose={() => setOpen(false)}
          content={<p>Modal body</p>}
          footer={<button onClick={() => setOpen(false)}>Close</button>}
        />
      </div>
    );
  };

  it('announces the dialog by name when opened and reads its content', async () => {
    render(<Demo />);
    await virtual.start({ container: document.body });

    await virtual.next();
    await virtual.act();
    await screen.findByRole('dialog');

    await waitFor(async () => expect(await virtual.lastSpokenPhrase()).toBe('dialog, Settings, modal'));

    for (let i = 0; i < 5; i++) {
      await virtual.next();
    }
    expect((await virtual.spokenPhraseLog()).slice(-6)).toEqual([
      'dialog, Settings, modal',
      'paragraph',
      'Modal body',
      'end of paragraph',
      'button, Close',
      'end of dialog, Settings, modal',
    ]);
  });

  it('returns focus to the opening button when closed', async () => {
    render(<Demo />);
    await virtual.start({ container: document.body });

    await virtual.next();
    await virtual.act();
    await screen.findByRole('dialog');

    // Move to the Close button and activate it.
    for (let i = 0; i < 4; i++) {
      await virtual.next();
    }
    expect(await virtual.lastSpokenPhrase()).toBe('button, Close');
    await virtual.act();

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(async () => expect(await virtual.lastSpokenPhrase()).toBe('button, Open'));
    expect(screen.getByRole('button', { name: 'Open' })).toHaveFocus();
  });
});
