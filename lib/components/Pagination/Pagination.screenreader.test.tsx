import { virtual } from '@guidepup/virtual-screen-reader';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import { Pagination, type PaginationProps } from './Pagination';

/**
 * Screen reader tests with Guidepup's Virtual Screen Reader. See Accordion.screenreader.test.tsx.
 */
describe('Pagination screen reader', () => {
  afterEach(async () => {
    await virtual.stop();
  });

  const translations: PaginationProps['translations'] = {
    prevTriggerLabel: 'Previous page',
    nextTriggerLabel: 'Next page',
    itemLabel: ({ page }) => `Page ${page}`,
  };

  // 50 items with a page size of 10 gives 5 pages, all shown without an ellipsis.
  const Demo = ({ labels = translations }: { labels?: PaginationProps['translations'] }) => {
    const [page, setPage] = React.useState(1);
    return (
      <Pagination
        totalItems={50}
        pageSize={10}
        siblingCount={1}
        currentPage={page}
        ariaLabel="Pagination"
        translations={labels}
        onPageChange={(details) => setPage(details.page)}
      />
    );
  };

  const moveTo = async (phrase: string) => {
    for (let i = 0; i < 40; i++) {
      await virtual.next();
      if ((await virtual.lastSpokenPhrase()) === phrase) return;
    }
    throw new Error(`The reader did not reach "${phrase}"`);
  };

  it('announces the navigation landmark, the page buttons and the current page', async () => {
    const { container } = render(<Demo />);
    await virtual.start({ container });

    for (let i = 0; i < 17; i++) await virtual.next();
    expect(await virtual.spokenPhraseLog()).toEqual([
      'navigation, Pagination',
      'button, Previous page, disabled',
      'button, Page 1, current page',
      '1',
      'end of button, Page 1, current page',
      'button, Page 2',
      '2',
      'end of button, Page 2',
      'button, Page 3',
      '3',
      'end of button, Page 3',
      'button, Page 4',
      '4',
      'end of button, Page 4',
      'button, Page 5',
      '5',
      'end of button, Page 5',
      'button, Next page',
    ]);
  });

  it('moves the current page to page 2 after activating the next button', async () => {
    const { container } = render(<Demo />);
    await virtual.start({ container });

    await moveTo('button, Next page');
    await virtual.act();
    await screen.findByRole('button', { name: 'Page 2', current: 'page' });

    // Nothing is announced on the change itself (there is no live region and focus stays
    // on the next button), but the new state is read when the user browses back.
    expect(await virtual.lastSpokenPhrase()).toBe('button, Next page');

    // Restart the reader to browse the updated pagination from the top.
    await virtual.stop();
    await virtual.start({ container });
    await moveTo('button, Page 1');
    await moveTo('button, Page 2, current page');
    expect(await virtual.spokenPhraseLog()).toContain('button, Previous page');
    expect(await virtual.spokenPhraseLog()).not.toContain('button, Previous page, disabled');
  });

  // Known issue: Pagination passes `totalItems` to `itemLabel` as `totalPages`, so a
  // label like "Page 1 of {totalPages}" is read as "Page 1 of 50" instead of
  // "Page 1 of 5". Remove `.fails` when fixed.
  it.fails('passes the number of pages to the item label', async () => {
    const { container } = render(
      <Demo labels={{ ...translations, itemLabel: ({ page, totalPages }) => `Page ${page} of ${totalPages}` }} />,
    );
    await virtual.start({ container });

    await virtual.next();
    await virtual.next();
    expect(await virtual.lastSpokenPhrase()).toBe('button, Page 1 of 5, current page');
  });
});
