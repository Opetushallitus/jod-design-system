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

const CloseMenuButton = ({ onClick, ariaCloseMenu }: { onClick: () => void; ariaCloseMenu: string }) => {
  const serviceVariant = useServiceVariant();
  return (
    <div className="ds:flex ds:justify-end">
      <button
        className={`ds:cursor-pointer ds:focus:outline-accent ds:p-3 ${getFocusOutlineClassForService(serviceVariant)}`}
        onClick={onClick}
        aria-label={ariaCloseMenu}
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
  PortalLinkComponent: React.ComponentType<LinkComponent>;
  /** Menu items. Items can have children */
  menuSection: MenuSection;
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
  /** Test id for querying in tests */
  dataTestId?: string;
}
export const NavigationMenu = ({
  onClose,
  open,
  ariaCloseMenu,
  portalLinkLabel,
  portalIcon,
  PortalLinkComponent,
  menuSection,
  openSubMenuLabel,
  externalLinkSections,
  languageSelectionItems,
  selectedLanguage,
  extraSection,
  languageSelectionTitle,
  serviceVariant,
  dataTestId,
}: NavigationMenuProps) => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

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
      <Backdrop dialogRef={dialogRef} onClose={onClose} dataTestId={dataTestId ? `${dataTestId}-backdrop` : undefined}>
        <nav
          className="ds:bg-white ds:flex ds:flex-col ds:z-100 ds:flex-1"
          data-testid={dataTestId ? `${dataTestId}-root` : undefined}
        >
          <div
            className="ds:px-3 ds:flex ds:flex-col ds:overflow-y-auto ds:flex-grow"
            data-testid={dataTestId ? `${dataTestId}-body` : undefined}
          >
            <div className="ds:flex ds:items-center ds:justify-end ds:my-6">
              <CloseMenuButton onClick={onClose} ariaCloseMenu={ariaCloseMenu} />
            </div>
            {portalLinkLabel && PortalLinkComponent ? (
              <>
                <PortalLink label={portalLinkLabel} icon={portalIcon} component={PortalLinkComponent} />
                <MenuSeparator />
              </>
            ) : null}
            <MenuList
              menuSection={menuSection}
              openSubMenuLabel={openSubMenuLabel}
              hideAccentBorder={false}
              dataTestId={dataTestId ? `${dataTestId}-menulist` : undefined}
            />
            {externalLinkSections && externalLinkSections.length > 0 && (
              <ExternalLinkSections sections={externalLinkSections} />
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
