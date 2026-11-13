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
 * The icon components (SvgWrapper.tsx) are hidden from assistive technology unless given
 * a name, so a decorative icon must not be read (e.g. as "graphics-document"). These
 * tests check components that use icons decoratively. Toast is covered in
 * Toast.screenreader.test.tsx.
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
    expect(log).toEqual(['button, Add']);
  });

  it('Button rendered as a link does not read the icon', async () => {
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
    expect(log).toEqual(['button, Add']);
  });

  it('EmptyState does not read the icon', async () => {
    const log = await readAll(<EmptyState text="No results" />);
    expect(log).toContain('No results');
    expect(log).not.toContain('graphics-document');
  });

  it('Pagination does not read the ellipsis icon', async () => {
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
