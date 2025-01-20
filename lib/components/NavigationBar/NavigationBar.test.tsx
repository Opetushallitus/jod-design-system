import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NavigationBar, NavigationBarLinkProps } from './NavigationBar';

describe('NavigationBar', () => {
  const user = {
    name: 'Reetta Räppänä',
    component: ({ children, ...rootProps }: NavigationBarLinkProps) => (
      <a href="/profile" aria-label="Profile" {...rootProps}>
        {children}
      </a>
    ),
  };

  it('renders no navigation items and no user', () => {
    const { container } = render(
      <NavigationBar
        renderLink={({ children }) => <div>{children}</div>}
        logo={{ to: '/', language: 'fi', srText: 'jod' }}
      />,
    );

    // Assert snapshot
    expect(container.firstChild).toMatchSnapshot();

    // Assert user is not rendered
    const userAvatar = screen.queryByTitle(user.name);
    expect(userAvatar).toBeNull();
  });
});
