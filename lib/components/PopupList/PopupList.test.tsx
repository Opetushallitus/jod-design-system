import { render, screen, waitFor } from '@testing-library/react';
import { PopupList, PopupListItem, PopupListProps } from './PopupList';
import { describe, it, expect, vi, afterEach } from 'vitest';

describe('PopupList', () => {
  const mockOnClick = vi.fn();

  const items: PopupListItem[] = [
    { label: 'Item 1', active: true, href: '/foo' },
    { label: 'Item 2', href: '/bar' },
    { label: 'Item 3', href: '/baz' },
  ];

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders the PopupList component correctly', () => {
    const props: PopupListProps = { items };
    const { container } = render(<PopupList {...props} />);
    const activeItem = screen.getByRole('link', { name: 'Item 1' });
    expect(activeItem.querySelector('svg')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the correct number of items', () => {
    const props: PopupListProps = { items };
    render(<PopupList {...props} />);
    const listItemElements = screen.getAllByRole('listitem');
    expect(listItemElements.length).toBe(items.length);
  });

  it('renders items as buttons or links based on the type prop', async () => {
    const links: PopupListItem[] = [
      { label: 'Item 1', href: '/foo', type: 'link' },
      { label: 'Item 2', onClick: mockOnClick, type: 'button' },
    ];
    render(<PopupList items={links} />);
    const linkItem = screen.getByRole('link', { name: 'Item 1' });
    const buttonItem = screen.getByRole('button', { name: 'Item 2' });
    expect(linkItem).toBeInTheDocument();
    expect(linkItem).toHaveAttribute('href', '/foo');
    expect(mockOnClick).not.toHaveBeenCalled();
    await waitFor(() => buttonItem.click());
    expect(mockOnClick).toHaveBeenCalled();
  });
});
