import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Footer } from './Footer';

describe('Footer', () => {
  const mockItems = [
    { key: 'item1', component: () => <div>Item 1</div> },
    { key: 'item2', component: () => <div>Item 2</div> },
    { key: 'item3', component: () => <div>Item 3</div> },
  ];
  const mockLogos = [<div key="logo1">Logo 1</div>, <div key="logo2">Logo 2</div>];
  const mockCopyright = '© 2024';

  it('renders footer with light variant', () => {
    const { container } = render(
      <Footer items={mockItems} variant="light" logos={mockLogos} copyright={mockCopyright} />,
    );
    expect(container.firstChild).toHaveClass('ds-bg-white ds-text-black');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders footer with dark variant', () => {
    const { container } = render(
      <Footer items={mockItems} variant="dark" logos={mockLogos} copyright={mockCopyright} />,
    );
    expect(container.firstChild).toHaveClass('ds-bg-black ds-text-white');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders items', () => {
    const { container } = render(<Footer items={mockItems} variant="light" />);
    const item1 = screen.getByText('Item 1');
    const item2 = screen.getByText('Item 2');
    const item3 = screen.getByText('Item 3');
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
    expect(item3).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders logos', () => {
    const { container } = render(<Footer logos={mockLogos} variant="light" />);
    const logo1 = screen.getByText('Logo 1');
    const logo2 = screen.getByText('Logo 2');
    expect(logo1).toBeInTheDocument();
    expect(logo2).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders copyright', () => {
    const { container } = render(<Footer variant="light" copyright={mockCopyright} />);
    const copyright = screen.getByText('© 2024');
    expect(copyright).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
