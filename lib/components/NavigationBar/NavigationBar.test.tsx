import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { NavigationBar, NavigationBarLinkProps } from './NavigationBar';

describe('NavigationBar', () => {
  const logo = <div>logo</div>;

  const user = {
    name: 'Reetta Räppänä',
    component: ({ children, ...rootProps }: NavigationBarLinkProps) => (
      <a href="/profile" aria-label="Profile" {...rootProps}>
        {children}
      </a>
    ),
  };

  const login = { url: '/login', text: 'Login' };

  it('renders only user', () => {
    const { container } = render(<NavigationBar logo={logo} user={user} login={login} />);

    // Assert snapshot
    expect(container.firstChild).toMatchSnapshot();

    // Assert user
    const userAvatar = screen.queryByTitle(user.name);
    expect(userAvatar).toBeInTheDocument();
  });

  it('renders no navigation items and no user', () => {
    const { container } = render(<NavigationBar logo={logo} login={login} />);

    // Assert snapshot
    expect(container.firstChild).toMatchSnapshot();

    // Assert user is not rendered
    const userAvatar = screen.queryByTitle(user.name);
    expect(userAvatar).toBeNull();
  });

  it('renders menu component', () => {
    const menuComponent = <div>Menu</div>;
    render(<NavigationBar logo={logo} menuComponent={menuComponent} login={login} />);
    const menuComponentElement = screen.getByText('Menu');
    expect(menuComponentElement).toBeInTheDocument();
  });
});
