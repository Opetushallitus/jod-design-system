import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { NavigationMenu } from './NavigationMenu';
import { LinkComponent } from './types';

describe('NavigationMenu', () => {
  test('renders navigation menu with default state', () => {
    // jsdom has no support for HTMLDialogElement at the moment: https://github.com/jsdom/jsdom/issues/3294
    if (!HTMLDialogElement.prototype.showModal) {
      HTMLDialogElement.prototype.showModal = function () {
        this.open = true;
      };
    }
    if (!HTMLDialogElement.prototype.close) {
      HTMLDialogElement.prototype.close = function (returnValue: string) {
        this.open = false;
        this.returnValue = returnValue;
      };
    }
    //

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
        backLabel="Takaisin"
        ariaCloseMenu="Sulje valikko"
        openSubMenuLabel="Avaa alivalikko"
        onClose={vi.fn()}
        externalLinkSections={[]}
        languageSelectionItems={[]}
        selectedLanguage=""
        open={true}
      />,
    );

    const navigationMenu = screen.getByRole('navigation');
    expect(navigationMenu).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
