import { virtual } from '@guidepup/virtual-screen-reader';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Datepicker } from './Datepicker';
import { getDatepickerTranslations } from './DatepickerTranslations';

// focus-trap needs layout to find tabbable nodes, which jsdom does not have. See Datepicker.test.tsx.
vi.mock('./DatePickerFocusTrap', () => ({
  DatepickerFocusTrap: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

/**
 * Screen reader tests with Guidepup's Virtual Screen Reader. See Accordion.screenreader.test.tsx.
 *
 * The calendar is rendered in a portal, so the reader is started on document.body.
 */
describe('Datepicker screen reader', () => {
  afterEach(async () => {
    await virtual.stop();
  });

  const noop = () => undefined;

  const translations = getDatepickerTranslations(
    {
      day: { next: 'Next month', view: 'Month view', prev: 'Previous month' },
      month: { next: 'Next year', view: 'Year view', prev: 'Previous year' },
      year: { next: 'Next decade', view: 'Day view', prev: 'Previous decade' },
    },
    (state) => `Choose ${state.valueText}`,
    (open) => (open ? 'Close calendar' : 'Open calendar'),
    {
      datepicker: 'Date picker',
      calendarMonth: 'Calendar month view',
      calendarYear: 'Calendar year view',
      calendarDecade: 'Calendar decade view',
    },
  );

  it('announces the label and value of the input and the calendar button', async () => {
    render(<Datepicker label="Päivä" value="2024-05-01" onChange={noop} translations={translations} />);
    await virtual.start({ container: document.body });

    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('Päivä');
    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('textbox, Päivä, 1.5.2024, not required');
    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('button, Open calendar, 1 control, not expanded, has popup grid');
  });

  it('reads the help and error texts as the input description with required and invalid states', async () => {
    render(
      <Datepicker
        label="Päivä"
        placeholder="pp.kk.vvvv"
        requiredText="pakollinen"
        help="Ohje"
        errorMessage="Virhe"
        onChange={noop}
        translations={translations}
      />,
    );
    await virtual.start({ container: document.body });

    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('Päivä (pakollinen)');
    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe(
      'textbox, Päivä (pakollinen), Ohje Virhe, invalid, placeholder pp.kk.vvvv, required',
    );
    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('button, Open calendar, 1 control, not expanded, has popup grid');
  });

  it('moves focus to the selected day when the calendar is opened and back on Escape', async () => {
    render(<Datepicker label="Päivä" value="2024-05-01" onChange={noop} translations={translations} />);
    await virtual.start({ container: document.body });
    await virtual.next();
    await virtual.next();
    await virtual.next();

    await virtual.act();
    await waitFor(() => expect(screen.getByTestId('trigger')).toHaveAttribute('aria-expanded', 'true'));

    await waitFor(async () =>
      expect(await virtual.lastSpokenPhrase()).toBe('button, Choose keskiviikkona 1. toukokuuta 2024'),
    );

    // Escape closes the calendar and returns focus to the calendar button.
    await virtual.press('Escape');
    await waitFor(async () =>
      expect(await virtual.lastSpokenPhrase()).toBe('button, Open calendar, 1 control, not expanded, has popup grid'),
    );
  });
});
