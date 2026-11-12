import { virtual } from '@guidepup/virtual-screen-reader';
import { act, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { JodInfo } from '../../icons';
import { Tooltip } from './Tooltip';
import { TooltipContent } from './TooltipContent';
import { TooltipTrigger } from './TooltipTrigger';

/**
 * Screen reader tests with Guidepup's Virtual Screen Reader. See Accordion.screenreader.test.tsx.
 *
 * The tooltip is rendered in a Floating UI portal, so the reader is started on document.body.
 * The tooltip element itself is aria-hidden: its text reaches the user as the trigger's
 * description through aria-describedby, not by browsing to it.
 *
 * Note: Floating UI adds focus guard elements around the open tooltip. In jsdom (whose
 * navigator.vendor looks like Safari) they get role="button", so browsing past the trigger
 * reads a few empty "button" items. The tests do not walk past the trigger for that reason.
 */
describe('Tooltip screen reader', () => {
  afterEach(async () => {
    await virtual.stop();
  });

  const TextTrigger = () => (
    <div>
      <button>Before</button>
      <Tooltip>
        <TooltipTrigger>Trigger</TooltipTrigger>
        <TooltipContent>Tip text</TooltipContent>
      </Tooltip>
    </div>
  );

  it('announces the trigger as a collapsed button', async () => {
    render(<TextTrigger />);
    await virtual.start({ container: document.body });

    await virtual.next();
    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('button, Trigger, not expanded');
  });

  it('announces the expanded state and the tooltip text as the description when activated', async () => {
    render(<TextTrigger />);
    await virtual.start({ container: document.body });

    await virtual.next();
    await virtual.next();
    await virtual.act();
    const tooltip = await screen.findByRole('tooltip', { hidden: true });

    // The reader re-announces the focused button when its state changes.
    await waitFor(async () => expect(await virtual.lastSpokenPhrase()).toBe('button, Trigger, Tip text, expanded'));
    expect(screen.getByRole('button', { name: 'Trigger' })).toHaveAttribute('aria-describedby', tooltip.id);
  });

  it('opens on focus and reads the tooltip text as the description', async () => {
    render(
      <div>
        <button>Before</button>
        <Tooltip>
          <TooltipTrigger ariaLabel="Info">i</TooltipTrigger>
          <TooltipContent>Tip text</TooltipContent>
        </Tooltip>
      </div>,
    );
    await virtual.start({ container: document.body });

    // Focus the trigger directly: virtual.press('Tab') dispatches extra key events that
    // close the tooltip again right after it opened, which a real Tab does not do.
    act(() => screen.getByRole('button', { name: 'Info' }).focus());
    await screen.findByRole('tooltip', { hidden: true });

    await waitFor(async () => expect(await virtual.lastSpokenPhrase()).toBe('button, Info, Tip text, expanded'));
  });

  it('announces the collapsed state and keeps focus on the trigger when closed with Escape', async () => {
    render(<TextTrigger />);
    await virtual.start({ container: document.body });

    await virtual.next();
    await virtual.next();
    await virtual.act();
    await screen.findByRole('tooltip', { hidden: true });

    await virtual.press('Escape');
    await waitFor(() => expect(screen.queryByRole('tooltip', { hidden: true })).not.toBeInTheDocument());

    await waitFor(async () => expect(await virtual.lastSpokenPhrase()).toBe('button, Trigger, not expanded'));
    expect(screen.getByRole('button', { name: 'Trigger' })).toHaveFocus();
  });

  // Known issue: an icon-only trigger (the "focus or hover" story) has no accessible name,
  // so it is read as just "button, not expanded". axe reports the same as `button-name`.
  // TooltipTrigger does not require ariaLabel and the icon has no title. Remove `.fails` when fixed.
  it.fails('names an icon-only trigger', async () => {
    render(
      <div>
        <span>Important label</span>
        <Tooltip>
          <TooltipTrigger toggleOnClick>
            <JodInfo />
          </TooltipTrigger>
          <TooltipContent>Info</TooltipContent>
        </Tooltip>
      </div>,
    );
    await virtual.start({ container: document.body });

    await virtual.next();
    await virtual.next();
    // Expected: "button, <name>, not expanded". Actual: "button, not expanded".
    expect(await virtual.lastSpokenPhrase()).toMatch(/^button, [^,]+, not expanded$/);
  });
});
