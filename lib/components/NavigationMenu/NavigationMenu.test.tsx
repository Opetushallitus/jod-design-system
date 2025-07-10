import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { NavigationMenu, NavigationMenuProps } from './NavigationMenu';
import type { LinkComponent } from './types';

describe('NavigationMenu', () => {
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

  const Link = ({ children, className }: LinkComponent) => (
    <a href="/#" className={className}>
      {children}
    </a>
  );

  const menuProps: NavigationMenuProps = {
    portalLinkLabel: 'Etusivu',
    PortalLinkComponent: Link,
    menuSection: { linkItems: [] },
    ariaCloseMenu: 'Sulje valikko',
    openSubMenuLabel: 'Avaa alivalikko',
    onClose: vi.fn(),
    externalLinkSections: [],
    languageSelectionItems: [],
    selectedLanguage: '',
    open: true,
    languageSelectionTitle: 'Käyttökieli',
    serviceVariant: 'yksilo',
  };

  it('renders navigation menu with default state', () => {
    const { container } = render(<NavigationMenu {...menuProps} />);

    const navigationMenu = screen.getByRole('navigation');
    expect(navigationMenu).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
