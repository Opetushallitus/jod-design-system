import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LinkComponent } from '../types';
import { MenuList } from './MenuList';

vi.mock('../../../hooks/useServiceVariant/useServiceVariant', () => ({
  useServiceVariant: () => 'yksilo',
}));

const DummyLink = (props: LinkComponent) => (
  <a href="/#" {...props}>
    {props.children}
  </a>
);

describe('MenuListItem', () => {
  it('renders a menu item with label', () => {
    render(<MenuList menuSection={{ linkItems: [{ label: 'Home' }] }} openSubMenuLabel="Open submenu" />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders a menu item with LinkComponent', () => {
    render(
      <MenuList
        menuSection={{
          linkItems: [{ label: 'Lorem', linkComponent: DummyLink }],
        }}
        openSubMenuLabel="Open submenu"
      />,
    );
    expect(screen.getByRole('link')).toHaveTextContent('Lorem');
  });

  it('renders a menu item with childItems and submenu is closed by default', () => {
    render(
      <MenuList
        menuSection={{
          linkItems: [
            {
              label: 'Parent',
              childItems: [{ label: 'Child' }],
            },
          ],
        }}
        openSubMenuLabel="Open submenu"
      />,
    );
    expect(screen.getByLabelText('Open submenu')).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Child')).not.toBeInTheDocument();
  });

  it('opens submenu when button is clicked', () => {
    render(
      <MenuList
        menuSection={{
          linkItems: [
            {
              label: 'Parent',
              childItems: [{ label: 'Child' }],
            },
          ],
        }}
        openSubMenuLabel="Open submenu"
      />,
    );
    const button = screen.getByLabelText('Open submenu');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Child')).toBeInTheDocument();
  });

  it('applies selected classes for activeIndicator "bg"', () => {
    render(
      <MenuList
        activeIndicator="bg"
        menuSection={{
          linkItems: [{ label: 'Selected', selected: true, linkComponent: DummyLink }],
        }}
        openSubMenuLabel="Open submenu"
      />,
    );
    const link = screen.getByRole('link');
    expect(link.querySelector('span')).toHaveClass('ds:text-white');
    expect(link.querySelector('span')).toHaveClass('ds:bg-secondary-1-dark');
  });

  it('applies selected classes for activeIndicator "dot"', () => {
    render(
      <MenuList
        activeIndicator="dot"
        menuSection={{
          linkItems: [{ label: 'Selected', selected: true, linkComponent: DummyLink }],
        }}
        openSubMenuLabel="Open submenu"
      />,
    );
    const link = screen.getByRole('link');
    expect(link.querySelector('span')?.className).toMatch(/ds:before:bg-secondary-1-dark/);
  });

  it('opens submenu automatically if a child item is selected and collapsed is true', async () => {
    render(
      <MenuList
        menuSection={{
          linkItems: [
            {
              label: 'Parent',
              childItems: [{ label: 'Child', selected: true, linkComponent: DummyLink }],
            },
          ],
        }}
        openSubMenuLabel="Open submenu"
        collapsed
      />,
    );
    await waitFor(() => {
      expect(screen.getByLabelText('Open submenu')).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText('Child')).toBeInTheDocument();
    });
  });

  it('does not open submenu automatically if no child is selected and collapsed is true', async () => {
    render(
      <MenuList
        menuSection={{
          linkItems: [
            {
              label: 'Parent',
              childItems: [{ label: 'Child', selected: false, linkComponent: DummyLink }],
            },
          ],
        }}
        openSubMenuLabel="Open submenu"
        collapsed
      />,
    );
    await waitFor(() => {
      expect(screen.getByLabelText('Open submenu')).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByText('Child')).not.toBeInTheDocument();
    });
  });

  it('opens submenu automatically if collapsed is false', () => {
    render(
      <MenuList
        menuSection={{
          linkItems: [
            {
              label: 'Parent',
              childItems: [{ label: 'Child', linkComponent: DummyLink }],
            },
          ],
        }}
        openSubMenuLabel="Open submenu"
        collapsed={false}
      />,
    );
    // Submenu should be open regardless of child selection
    expect(screen.getByLabelText('Open submenu')).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Child')).toBeInTheDocument();
  });

  it('applies custom className to menu item', () => {
    render(
      <MenuList
        menuSection={{
          linkItems: [{ label: 'CustomClass', className: 'my-custom-class' }],
        }}
        openSubMenuLabel="Open submenu"
        itemClassname="my-custom-class"
      />,
    );
    expect(screen.getByText('CustomClass').parentElement).toHaveClass('my-custom-class');
  });
});
