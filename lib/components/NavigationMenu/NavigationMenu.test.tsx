import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { NavigationMenu } from './NavigationMenu';
import { LinkComponent } from './types';

describe('NavigationMenu', () => {
  test('renders navigation menu with default state', () => {
    const { container } = render(
      <NavigationMenu
        frontPageLinkLabel="Etusivu"
        FrontPageLinkComponent={({ children, className }: LinkComponent) => (
          <a href="/#" className={className}>
            {children}
          </a>
        )}
        accentColor="#85C4EC"
        menuItems={[]}
        onClose={vi.fn()}
        externalLinkSections={[]}
        languageSelectionItems={[]}
        selectedLanguage=""
        onLanguageChange={vi.fn()}
      />
    );

    const navigationMenu = screen.getByRole('navigation');
    expect(navigationMenu).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  // TODO: more tests
});
