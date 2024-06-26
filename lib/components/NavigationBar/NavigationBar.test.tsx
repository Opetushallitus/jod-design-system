import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { NavigationBar, NavigationBarLinkProps } from './NavigationBar';

describe('NavigationBar', () => {
  const logo = <div>logo</div>;

  const items = [
    {
      key: 'home',
      text: 'Home',
      active: true,
      href: '/home',
    },
    {
      key: 'about',
      text: 'About',
      active: false,
      href: '/about',
    },
    {
      key: 'contact',
      text: 'Contact',
      active: false,
      href: '/contact',
    },
  ].map(({ key, text, active, href }) => ({
    key,
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
    name: 'Reetta Räppänä',
    component: ({ children, ...rootProps }: NavigationBarLinkProps) => (
      <a href="/profile" aria-label="Profile" {...rootProps}>
        {children}
      </a>
    ),
  };

  const login = { url: '/login', text: 'Login' };

  it('renders navigation items and user', () => {
    const { container } = render(<NavigationBar logo={logo} items={items} user={user} login={login} />);

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
    const { container } = render(<NavigationBar logo={logo} items={items} login={login} />);

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
    const { container } = render(<NavigationBar logo={logo} user={user} login={login} />);

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
    const { container } = render(<NavigationBar logo={logo} login={login} />);

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
