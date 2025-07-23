import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
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

  it('renders with serviceBar and handles scrolling', async () => {
    const contentText = 'Service Bar Content';
    render(
      <NavigationBar
        renderLink={({ children }) => <div>{children}</div>}
        logo={{ to: '/', language: 'fi', srText: 'jod' }}
        showServiceBar
        serviceBarVariant="yksilo"
        serviceBarTitle="Osaamispolkuni"
        serviceBarContent={<div>{contentText}</div>}
      />,
    );

    const title = screen.getByText('Osaamispolkuni');
    expect(title).toBeInTheDocument();
    expect(title).toBeVisible();

    const content = screen.getByText(contentText);
    expect(content).toBeInTheDocument();
    expect(content).toBeVisible();

    // Simulate scroll
    window.scrollY = 100;
    window.dispatchEvent(new Event('scroll'));

    // Wait for DOM update and assert elements are removed
    await waitFor(() => {
      expect(screen.queryByText('Osaamispolkuni')).not.toBeInTheDocument();
      expect(screen.queryByText(contentText)).not.toBeInTheDocument();
    });
  });
});

it('does not toggle serviceBar contents multiple times during animation pending', async () => {
  const contentText = 'Service Bar Content';
  render(
    <NavigationBar
      renderLink={({ children }) => <div>{children}</div>}
      logo={{ to: '/', language: 'fi', srText: 'jod' }}
      showServiceBar
      serviceBarVariant="yksilo"
      serviceBarTitle="Osaamispolkuni"
      serviceBarContent={<div>{contentText}</div>}
    />,
  );

  // Scroll down
  window.scrollY = 100;
  window.dispatchEvent(new Event('scroll'));

  // Immediately try to scroll again before timeout
  window.scrollY = 200;
  window.dispatchEvent(new Event('scroll'));

  // Wait for DOM update
  await waitFor(() => {
    expect(screen.queryByText('Osaamispolkuni')).not.toBeInTheDocument();
    expect(screen.queryByText(contentText)).not.toBeInTheDocument();
  });

  // Scroll back to top after animation pending
  await new Promise((r) => setTimeout(r, 250));
  window.scrollY = 0;
  window.dispatchEvent(new Event('scroll'));

  await waitFor(() => {
    expect(screen.getByText('Osaamispolkuni')).toBeVisible();
    expect(screen.getByText(contentText)).toBeVisible();
  });
});
