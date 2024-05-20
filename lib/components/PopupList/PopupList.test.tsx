import { render, screen } from '@testing-library/react';
import { PopupList, PopupListItem, PopupListProps } from './PopupList';
import { describe, it, expect, vi } from 'vitest';

describe('PopupList', () => {
  const mockOnClick = vi.fn();

  const items: PopupListItem[] = [
    { label: 'Item 1', active: true, onClick: mockOnClick },
    { label: 'Item 2', onClick: mockOnClick },
    { label: 'Item 3', onClick: mockOnClick },
  ];

  it('renders the PopupList component correctly', () => {
    const props: PopupListProps = { items };
    const { container } = render(<PopupList {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the correct number of items', () => {
    const props: PopupListProps = { items };
    render(<PopupList {...props} />);
    const listItemElements = screen.getAllByRole('listitem');
    expect(listItemElements.length).toBe(items.length);
  });

  it('triggers onClick when an item is clicked', () => {
    const props: PopupListProps = { items };
    render(<PopupList {...props} />);
    const itemElement = screen.getByRole('button', { name: 'Item 2' });
    itemElement.click();
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('renders items as buttons or links based on the itemsType prop', () => {
    const links: PopupListItem[] = [
      { label: 'Item 1', href: '/foo' },
      { label: 'Item 2', href: '/bar' },
    ];
    render(<PopupList items={links} itemsType="link" />);
    const linkItemElement = screen.getByRole('link', { name: 'Item 2' });
    expect(linkItemElement).toBeInTheDocument();
    expect(linkItemElement).toHaveAttribute('href', '/bar');
  });
});
