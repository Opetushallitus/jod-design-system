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
        testId="nav"
      />,
    );

    // Assert snapshot
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByTestId('nav')).toBeInTheDocument();

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
        testId="test"
        showServiceBar
        serviceBarVariant="yksilo"
        serviceBarTitle="Osaamispolkuni"
        serviceBarContent={<div>{contentText}</div>}
      />,
    );

    const title = screen.getByText('Osaamispolkuni');
    expect(title).toBeInTheDocument();
    expect(title).toBeVisible();
    const serviceBar = screen.getByTestId('test-servicebar');
    expect(serviceBar).toBeInTheDocument();
    expect(serviceBar).toHaveClass('ds:translate-y-0');

    const content = screen.getByText(contentText);
    expect(content).toBeInTheDocument();
    expect(content).toBeVisible();

    // Wait 500ms for startup delay before collapseOnScroll hook starts detecting scroll events
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Simulate scroll
    window.scrollY = 100;
    window.dispatchEvent(new Event('scroll'));

    // Wait for DOM update and assert elements are removed
    await waitFor(() => {
      expect(serviceBar).toHaveClass('ds:-translate-y-full');
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
      testId="test"
      serviceBarContent={<div>{contentText}</div>}
    />,
  );

  // Wait 500ms for startup delay before collapseOnScroll hook starts detecting scroll events
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Scroll down
  window.scrollY = 100;
  window.dispatchEvent(new Event('scroll'));

  // Immediately try to scroll again before timeout
  window.scrollY = 200;
  window.dispatchEvent(new Event('scroll'));

  // Wait for DOM update
  await waitFor(() => {
    expect(screen.queryByTestId('test-servicebar')).toHaveClass('ds:-translate-y-full');
  });

  // Scroll back to top after animation pending
  await new Promise((resolve) => setTimeout(resolve, 350));
  window.scrollY = 0;
  window.dispatchEvent(new Event('scroll'));

  await waitFor(() => {
    expect(screen.queryByTestId('test-servicebar')).toHaveClass('ds:translate-y-0');
  });
});
