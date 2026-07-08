import React from 'react';

import { ServiceVariantProvider } from '../../hooks/useServiceVariant/ServiceVariantProvider';
import { useServiceVariant } from '../../hooks/useServiceVariant/useServiceVariant';
import { JodClose } from '../../icons';
import { getFocusOutlineClassForService, type ServiceVariant } from '../../utils';
import { Backdrop } from './components/Backdrop';
import { ExternalLinkSection, ExternalLinkSections } from './components/ExternalLinkSections';
import { LanguageSelection, LanguageSelectionItem } from './components/LanguageSelection';
import { MenuList, type MenuSection } from './components/MenuList';
import { MenuSeparator } from './components/MenuSeparator';
import { PortalLink } from './components/PortalLink';
import type { LinkComponent } from './types';

const CloseMenuButton = ({
  onClick,
  ariaCloseMenu,
  testId,
}: {
  onClick: () => void;
  ariaCloseMenu: string;
  testId?: string;
}) => {
  const serviceVariant = useServiceVariant();
  return (
    <div className="ds:flex ds:justify-end">
      <button
        className={`ds:cursor-pointer ds:focus:outline-accent ds:p-3 ${getFocusOutlineClassForService(serviceVariant)}`}
        onClick={onClick}
        aria-label={ariaCloseMenu}
        data-testid={testId}
      >
        <JodClose size={24} />
      </button>
    </div>
  );
};

export interface NavigationMenuProps {
  /** Function to emit onClose event for user when the menu is closed */
  onClose: () => void;
  /** Open state of the NavigationMenu */
  open: boolean;
  /** Text for screenreader to have on the close menu button */
  ariaCloseMenu: string;
  /** Text for link that brings user to the front page */
  portalLinkLabel: string;
  /** Icon for the front page link */
  portalIcon?: React.ReactNode;
  /** Link component to bring user to front page */
  portalLinkComponent: React.ComponentType<LinkComponent>;
  /** Portal is external? */
  portalExternal?: boolean;
  /** Menu items. Items can have children */
  menuSection?: MenuSection;
  /** Label for button to open submenu of menu item */
  openSubMenuLabel: string;
  /** External link sections */
  externalLinkSections?: ExternalLinkSection[];
  /** Language selection items */
  languageSelectionItems?: LanguageSelectionItem[];
  /** Language selection title */
  languageSelectionTitle: string;
  /** Selected language */
  selectedLanguage: string;
  /** Extra section to be displayed at the end of the menu before the language selection */
  extraSection?: React.ReactNode;
  /** Service variant for color scheme (yksilö, ohjaaja etc.) */
  serviceVariant: ServiceVariant;
  /** Aria label for external link icons */
  externalLinkIconAriaLabel: string;
  /** Test id for querying in tests */
  testId?: string;
  /** Aria label for the navigation menu */
  ariaLabel?: string;
  /** Aria label for the navigation element inside the menu */
  navigationAriaLabel?: string;
}
export const NavigationMenu = ({
  onClose,
  open,
  ariaCloseMenu,
  portalLinkLabel,
  portalIcon,
  portalLinkComponent: PortalLinkComponent,
  portalExternal = true,
  menuSection,
  openSubMenuLabel,
  externalLinkSections,
  languageSelectionItems,
  selectedLanguage,
  extraSection,
  languageSelectionTitle,
  serviceVariant,
  externalLinkIconAriaLabel,
  testId,
  ariaLabel,
  navigationAriaLabel,
}: NavigationMenuProps) => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const getTestId = (suffix: string) => (testId ? `${testId}-${suffix}` : suffix);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
      onClose();
    }
  }, [dialogRef, open, onClose]);

  return open ? (
    <ServiceVariantProvider value={serviceVariant}>
      <Backdrop dialogRef={dialogRef} onClose={onClose} testId={getTestId('backdrop')} ariaLabel={ariaLabel}>
        <nav
          className="ds:bg-white ds:flex ds:flex-col ds:z-100 ds:flex-1"
          data-testid={getTestId('root')}
          aria-label={navigationAriaLabel}
        >
          <div
            className="ds:px-3 ds:flex ds:flex-col ds:overflow-y-auto ds:overscroll-contain ds:grow ds:pb-11"
            data-testid={getTestId('body')}
          >
            <div className="ds:flex ds:items-center ds:justify-end ds:my-6 ds:sticky ds:top-0 ds:bg-white ds:z-10">
              <CloseMenuButton
                onClick={onClose}
                ariaCloseMenu={ariaCloseMenu}
                testId={getTestId('close-menu-button')}
              />
            </div>
            {portalLinkLabel && PortalLinkComponent ? (
              <>
                <PortalLink
                  label={portalLinkLabel}
                  icon={portalIcon}
                  component={PortalLinkComponent}
                  externalLinkIconAriaLabel={portalExternal ? externalLinkIconAriaLabel : undefined}
                  testId={getTestId('portal-link')}
                />
                {menuSection && <MenuSeparator />}
              </>
            ) : null}
            <MenuList
              menuSection={menuSection}
              openSubMenuLabel={openSubMenuLabel}
              hideAccentBorder={false}
              testId={getTestId('menu-list')}
            />
            {externalLinkSections && externalLinkSections.length > 0 && (
              <ExternalLinkSections
                sections={externalLinkSections}
                externalLinkIconAriaLabel={externalLinkIconAriaLabel}
              />
            )}
            {extraSection && (
              <>
                <MenuSeparator />
                {extraSection}
              </>
            )}
            {languageSelectionItems && languageSelectionItems.length > 0 && (
              <>
                <MenuSeparator />
                <LanguageSelection
                  items={languageSelectionItems}
                  selected={selectedLanguage}
                  title={languageSelectionTitle}
                />
              </>
            )}
          </div>
        </nav>
      </Backdrop>
    </ServiceVariantProvider>
  ) : null;
};
