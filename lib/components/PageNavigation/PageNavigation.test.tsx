import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ServiceVariantProvider } from '../../main';
import { PageNavigation, PageNavigationProps } from './PageNavigation';

const menuSection = {
  title: 'Test Menu',
  linkItems: [{ label: 'Home', selected: true }, { label: 'About' }, { label: 'Contact' }],
};

const WrappedPageNavigation = (props?: Partial<PageNavigationProps>) => (
  <ServiceVariantProvider value="yksilo">
    <PageNavigation menuSection={menuSection} openSubMenuLabel="Open submenu" testId="pnav" {...props} />
  </ServiceVariantProvider>
);

describe('PageNavigation', () => {
  it('renders with default props', () => {
    const { container } = render(<WrappedPageNavigation />);
    // root and inner list both tagged; just assert at least one exists
    expect(screen.getAllByTestId('pnav').length).toBeGreaterThan(0);
    expect(screen.getByText('Test Menu')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('applies custom className', () => {
    const { container } = render(<WrappedPageNavigation className="custom-class" />);
    expect(container.querySelector('div')).toHaveClass('custom-class');
  });

  it('hides accent border by default', () => {
    render(<WrappedPageNavigation />);
    const ul = screen.getByRole('list');
    expect(ul.className).not.toMatch(/border-l-8/);
  });

  it('shows accent border when hideAccentBorder is false', () => {
    render(<WrappedPageNavigation hideAccentBorder={false} />);
    const ul = screen.getByRole('list');
    expect(ul.className).toMatch(/border-l-8/);
  });
});
