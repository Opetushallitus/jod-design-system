import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { MoreInfo, MoreInfoProps } from './MoreInfo';

const MockLinkComponent = ({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <a href={to} className={className} data-testid="mock-link">
    {children}
  </a>
);

const defaultProps: MoreInfoProps = {
  title: 'Test Title',
  description: 'Test description content.',
  language: 'en',
  links: [
    { to: 'page-1', label: 'Page 1' },
    { to: 'page-2', label: 'Page 2' },
  ],
  LinkComponent: MockLinkComponent,
};
it('matches snapshot', () => {
  const { container } = render(<MoreInfo {...defaultProps} />);
  expect(container.firstChild).toMatchSnapshot();
});

describe('MoreInfo', () => {
  it('renders the title and description', () => {
    render(<MoreInfo {...defaultProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test description content.')).toBeInTheDocument();
  });

  it('renders all links with correct labels and hrefs', () => {
    render(<MoreInfo {...defaultProps} />);
    defaultProps.links.forEach((link) => {
      const linkElement = screen.getByText(link.label).closest('a');
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', `/en/${link.to}`);
    });
  });

  it('renders the correct number of links', () => {
    render(<MoreInfo {...defaultProps} />);
    const links = screen.getAllByTestId('mock-link');
    expect(links).toHaveLength(defaultProps.links.length);
  });

  it('renders the arrow icon for each link', () => {
    render(<MoreInfo {...defaultProps} />);
    const links = screen.getAllByTestId('mock-link');
    links.forEach((link) => {
      expect(link.querySelector('svg')).toBeInTheDocument();
    });
  });
});
