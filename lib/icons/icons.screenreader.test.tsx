import { virtual } from '@guidepup/virtual-screen-reader';
import { render } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import { ActionButton } from '../components/ActionButton/ActionButton';
import { Button } from '../components/Button/Button';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { IconButton } from '../components/IconButton/IconButton';
import { Note } from '../components/Note/Note';
import { Pagination } from '../components/Pagination/Pagination';
import { Tag } from '../components/Tag/Tag';
import { JodAdd } from './JodAdd';

/**
 * Screen reader tests with Guidepup's Virtual Screen Reader. See
 * components/Accordion/Accordion.screenreader.test.tsx.
 *
 * The icon components (SvgWrapper.tsx) render an <svg> without aria-hidden, so a
 * decorative icon is read as "graphics-document" unless the component hides it. These
 * tests check what components that use icons decoratively leak. Toast is covered in
 * Toast.screenreader.test.tsx.
 *
 * Note: an icon inside a <button> is not read, because the children of a button are
 * presentational in ARIA. Icons inside links and plain elements are read.
 */
describe('Decorative icons screen reader', () => {
  afterEach(async () => {
    await virtual.stop();
  });

  /** Reads the whole component once and returns what was spoken. */
  const readAll = async (element: React.ReactElement) => {
    const { container } = render(element);
    await virtual.start({ container });
    for (let i = 0; i < 50; i++) {
      await virtual.next();
      const log = await virtual.spokenPhraseLog();
      // Stop when the reader wraps around to the first phrase.
      if (log.length > 1 && log.at(-1) === log[0]) return log.slice(0, -1);
    }
    return virtual.spokenPhraseLog();
  };

  it('Button with an icon does not read the icon', async () => {
    const log = await readAll(<Button label="Add" icon={<JodAdd />} iconSide="left" onClick={() => {}} />);
    expect(log).toEqual(['button, Add', 'Add', 'end of button, Add']);
  });

  // Known issue: Button rendered as a link (linkComponent) reads its icon as
  // "graphics-document", because unlike a button a link does not make its children
  // presentational and the icon has no aria-hidden. Remove `.fails` when fixed.
  it.fails('Button rendered as a link does not read the icon', async () => {
    const LinkComponent = ({
      children,
      className,
      ariaLabel,
    }: {
      children: React.ReactNode;
      className: string;
      ariaLabel?: string;
    }) => (
      <a href="/add" className={className} aria-label={ariaLabel}>
        {children}
      </a>
    );
    const log = await readAll(<Button label="Add" icon={<JodAdd />} iconSide="left" linkComponent={LinkComponent} />);
    expect(log).toContain('link, Add');
    expect(log).not.toContain('graphics-document');
  });

  it('IconButton does not read the icon', async () => {
    const log = await readAll(<IconButton ariaLabel="Add" icon={<JodAdd />} onClick={() => {}} />);
    expect(log).toEqual(['button, Add']);
  });

  it('Tag does not read the add icon', async () => {
    const log = await readAll(<Tag label="Python" variant="selectable" onClick={() => {}} />);
    expect(log).toEqual(['button, Python']);
  });

  it('Note does not read the close icon', async () => {
    const log = await readAll(
      <Note title="Title" description="Description" variant="success" ariaClose="Close" onCloseClick={() => {}} />,
    );
    expect(log).toEqual(['alert', 'Title', 'Description', 'button, Close', 'end of alert']);
  });

  it('ActionButton does not read the icon', async () => {
    const log = await readAll(<ActionButton label="Add" icon={<JodAdd />} onClick={() => {}} />);
    expect(log).toEqual(['button, Add', 'Add', 'end of button, Add']);
  });

  // Known issue: EmptyState reads its decorative info icon as "graphics-document" before
  // the text, because the icon has no aria-hidden. Remove `.fails` when fixed.
  it.fails('EmptyState does not read the icon', async () => {
    const log = await readAll(<EmptyState text="No results" />);
    expect(log).toContain('No results');
    expect(log).not.toContain('graphics-document');
  });

  // Known issue: Pagination's ellipsis is a <div> whose only content is the "more" icon,
  // so it is read as "graphics-document" between the page buttons. Remove `.fails` when
  // fixed.
  it.fails('Pagination does not read the ellipsis icon', async () => {
    const log = await readAll(
      <Pagination
        totalItems={100}
        pageSize={10}
        siblingCount={1}
        currentPage={1}
        ariaLabel="Pagination"
        translations={{ prevTriggerLabel: 'Previous page', nextTriggerLabel: 'Next page' }}
        onPageChange={() => {}}
      />,
    );
    expect(log).toContain('button, Next page');
    expect(log).not.toContain('graphics-document');
  });
});
