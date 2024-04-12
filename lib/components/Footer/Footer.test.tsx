import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Footer } from './Footer';

describe('Footer', () => {
  const mockItems = [
    { component: () => <div>Item 1</div> },
    { component: () => <div>Item 2</div> },
    { component: () => <div>Item 3</div> },
  ];
  const mockLogos = [{ component: () => <div>Logo 1</div> }, { component: () => <div>Logo 2</div> }];
  const mockCopyright = '© 2024';

  it('renders footer with light variant', () => {
    const { container } = render(
      <Footer items={mockItems} variant="light" logos={mockLogos} copyright={mockCopyright} />,
    );
    expect(container.firstChild).toHaveClass('bg-white text-black');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders footer with dark variant', () => {
    const { container } = render(
      <Footer items={mockItems} variant="dark" logos={mockLogos} copyright={mockCopyright} />,
    );
    expect(container.firstChild).toHaveClass('bg-black text-white');
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
