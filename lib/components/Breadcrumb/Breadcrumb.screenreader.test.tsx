import { virtual } from '@guidepup/virtual-screen-reader';
import { render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Breadcrumb } from './Breadcrumb';

// jsdom has no layout, so the media queries are mocked to choose the desktop or mobile rendering.
const mockUseMediaQueries = vi.hoisted(() => vi.fn<() => Record<string, boolean>>());
vi.mock('../../hooks/useMediaQueries', () => ({ useMediaQueries: mockUseMediaQueries }));

const setDesktop = (isDesktop: boolean) =>
  mockUseMediaQueries.mockReturnValue({ sm: isDesktop, md: isDesktop, lg: isDesktop, xl: isDesktop });

/**
 * Screen reader tests with Guidepup's Virtual Screen Reader. See Accordion.screenreader.test.tsx.
 */
describe('Breadcrumb screen reader', () => {
  afterEach(async () => {
    await virtual.stop();
  });

  const items = [{ label: 'Home', to: '/' }, { label: 'Profile', to: '/profile' }, { label: 'Jobs' }];
  const LinkComponent = ({ to, children }: { to: string; children: React.ReactNode }) => <a href={to}>{children}</a>;

  const renderBreadcrumb = () =>
    render(<Breadcrumb items={items} linkComponent={LinkComponent} ariaLabel="Breadcrumb" serviceVariant="yksilo" />);

  it('announces the navigation landmark, a list of links and the current page', async () => {
    setDesktop(true);
    const { container } = renderBreadcrumb();
    await virtual.start({ container });

    for (let i = 0; i < 14; i++) await virtual.next();
    // The "/" separators are aria-hidden and not read.
    expect(await virtual.spokenPhraseLog()).toEqual([
      'navigation, Breadcrumb',
      'list',
      'listitem, level 1, position 1, set size 3',
      'link, Home',
      'end of listitem, level 1, position 1, set size 3',
      'listitem, level 1, position 2, set size 3',
      'link, Profile',
      'end of listitem, level 1, position 2, set size 3',
      'listitem, level 1, position 3, set size 3',
      'current page',
      'Jobs',
      'end, current page',
      'end of listitem, level 1, position 3, set size 3',
      'end of list',
      'end of navigation, Breadcrumb',
    ]);
  });

  // On small screens the current page is hidden visually but kept for screen readers.
  it('announces the current page on small screens', async () => {
    setDesktop(false);
    const { container } = renderBreadcrumb();
    await virtual.start({ container });

    for (let i = 0; i < 14; i++) await virtual.next();
    const log = await virtual.spokenPhraseLog();
    expect(log).toContain('current page');
    expect(log).toContain('Jobs');
  });
});
