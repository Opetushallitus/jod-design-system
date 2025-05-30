import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { NavigationMenu } from './NavigationMenu';
import { LinkComponent } from './types';

describe('NavigationMenu', () => {
  it('renders navigation menu with default state', () => {
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

  it('renders navigation menu with a logo', () => {
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
        logo={{ to: '/fi', language: 'fi', srText: 'Osaamispolku' }}
        logoLink={({ to, className, children }) => (
          <a href={to as string} className={className}>
            {children}
          </a>
        )}
        externalLinkSections={[]}
        languageSelectionItems={[]}
        selectedLanguage=""
        open={true}
      />,
    );

    const logoLink = screen.getByRole('link', { name: 'Osaamispolku' });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/fi');
    expect(logoLink).toContainElement(screen.getByText('Osaamispolku'));
    const svg = logoLink.querySelector('svg');
    expect(svg).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
