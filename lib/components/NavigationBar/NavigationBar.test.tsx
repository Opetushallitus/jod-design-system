import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NavigationBar, NavigationBarLinkProps } from './NavigationBar';
import { NoteStackProvider } from './NoteStackProvider';

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
      <NoteStackProvider>
        <NavigationBar
          renderLink={({ children }) => <div>{children}</div>}
          logo={{ to: '/', language: 'fi', srText: 'jod' }}
          serviceBarVariant="yksilo"
          serviceBarTitle="Osaamispolkuni"
          translations={{
            showAllNotesLabel: 'Näytä kaikki',
            ariaLabelCloseNote: 'Sulje ilmoitus',
          }}
          testId="nav"
        />
      </NoteStackProvider>,
    );

    // Assert snapshot
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByTestId('nav')).toBeInTheDocument();

    // Assert user is not rendered
    const userAvatar = screen.queryByTitle(user.name);
    expect(userAvatar).toBeNull();
  });

  it('renders with serviceBar', () => {
    const contentText = 'Service Bar Content';
    render(
      <NoteStackProvider>
        <NavigationBar
          renderLink={({ children }) => <div>{children}</div>}
          logo={{ to: '/', language: 'fi', srText: 'jod' }}
          serviceBarVariant="yksilo"
          serviceBarTitle="Osaamispolkuni"
          serviceBarContent={<div>{contentText}</div>}
          translations={{
            showAllNotesLabel: 'Näytä kaikki',
            ariaLabelCloseNote: 'Sulje ilmoitus',
          }}
          testId="test"
        />
      </NoteStackProvider>,
    );

    const title = screen.getByText('Osaamispolkuni');
    expect(title).toBeInTheDocument();
    expect(title).toBeVisible();
    const serviceBar = screen.getByTestId('test-service-bar-and-notes-wrapper');
    expect(serviceBar).toBeInTheDocument();

    const content = screen.getByText(contentText);
    expect(content).toBeInTheDocument();
    expect(content).toBeVisible();
  });
});
