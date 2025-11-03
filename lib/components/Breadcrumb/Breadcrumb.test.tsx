import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Breadcrumb } from './Breadcrumb';

const items = [
  { label: 'Etusivu', to: '/' },
  { label: 'Osaamisprofiili', to: '/osaamispolkuni' },
  { label: 'Työpaikkani' },
];

const LinkComponent = ({ to, children }: { to?: string; children: React.ReactNode }) => <a href={to}>{children}</a>;

describe('Breadcrumb', () => {
  it('renders all breadcrumb items', () => {
    const { container } = render(
      <Breadcrumb items={items} linkComponent={LinkComponent} ariaLabel="Breadcrumb" serviceVariant="yksilo" />,
    );
    expect(screen.getByText('Etusivu')).toBeInTheDocument();
    expect(screen.getByText('Osaamisprofiili')).toBeInTheDocument();
    expect(screen.getByText('Työpaikkani')).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders links for items with "to" prop', () => {
    render(<Breadcrumb items={items} linkComponent={LinkComponent} ariaLabel="Breadcrumb" serviceVariant="yksilo" />);
    const link = screen.getByText('Etusivu').closest('a');
    expect(link).toHaveAttribute('href', '/');
  });

  it('does not render link for last item if "to" is missing', () => {
    render(<Breadcrumb items={items} linkComponent={LinkComponent} ariaLabel="Breadcrumb" serviceVariant="yksilo" />);
    const last = screen.getByText('Työpaikkani');
    expect(last.closest('a')).toBeNull();
  });

  it('sets aria-label for navigation', () => {
    render(<Breadcrumb items={items} linkComponent={LinkComponent} ariaLabel="Custom label" serviceVariant="yksilo" />);
    const nav = screen.getByLabelText('Custom label');
    expect(nav).toBeInTheDocument();
  });

  it('emits data-testid when testId is provided', () => {
    render(
      <Breadcrumb
        items={items}
        linkComponent={LinkComponent}
        ariaLabel="Crumbs"
        serviceVariant="yksilo"
        testId="crumbs"
      />,
    );
    expect(screen.getByTestId('crumbs')).toBeInTheDocument();
  });
});
