import { afterEach, describe, it, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { NavigationBar, NavigationBarLinkProps } from './NavigationBar';

afterEach(() => {
  cleanup();
});

describe('NavigationBar', () => {
  const items = [
    {
      text: 'Home',
      active: true,
      href: '/home',
    },
    {
      text: 'About',
      active: false,
      href: '/about',
    },
    {
      text: 'Contact',
      active: false,
      href: '/contact',
    },
  ].map(({ text, active, href }) => ({
    text,
    active,
    href,
    component: ({ children, ...rootProps }: NavigationBarLinkProps) => (
      <a href={href} {...rootProps}>
        {children}
      </a>
    ),
  }));

  const user = {
    name: 'Jane Doe',
    component: ({ children, ...rootProps }: NavigationBarLinkProps) => (
      <a href="/profile" aria-label="Profile" {...rootProps}>
        {children}
      </a>
    ),
  };

  it('renders navigation items and user', () => {
    const { container } = render(<NavigationBar items={items} user={user} />);

    // Assert snapshot
    expect(container.firstChild).toMatchSnapshot();

    // Assert navigation items
    items.forEach((item) => {
      const linkElement = screen.getByText(item.text);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', item.href);
    });

    // Assert user
    const userAvatar = screen.queryByTitle(user.name);
    expect(userAvatar).toBeInTheDocument();
  });

  it('renders only navigation items', () => {
    const { container } = render(<NavigationBar items={items} />);

    // Assert snapshot
    expect(container.firstChild).toMatchSnapshot();

    // Assert navigation items
    items.forEach((item) => {
      const linkElement = screen.getByText(item.text);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', item.href);
    });

    // Assert user is not rendered
    const userAvatar = screen.queryByTitle(user.name);
    expect(userAvatar).toBeNull();
  });

  it('renders only user', () => {
    const { container } = render(<NavigationBar user={user} />);

    // Assert snapshot
    expect(container.firstChild).toMatchSnapshot();

    // Assert user
    const userAvatar = screen.queryByTitle(user.name);
    expect(userAvatar).toBeInTheDocument();

    // Assert navigation items are not rendered
    items.forEach((item) => {
      const linkElement = screen.queryByText(item.text);
      expect(linkElement).toBeNull();
    });
  });

  it('renders no navigation items and no user', () => {
    const { container } = render(<NavigationBar />);

    // Assert snapshot
    expect(container.firstChild).toMatchSnapshot();

    // Assert navigation items are not rendered
    items.forEach((item) => {
      const linkElement = screen.queryByText(item.text);
      expect(linkElement).toBeNull();
    });

    // Assert user is not rendered
    const userAvatar = screen.queryByTitle(user.name);
    expect(userAvatar).toBeNull();
  });
});
