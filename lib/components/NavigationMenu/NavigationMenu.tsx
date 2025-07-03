import React from 'react';
import { MdClose } from 'react-icons/md';
import { getFocusOutlineClassForService, type ServiceVariant } from '../../utils';
import { Backdrop } from './components/Backdrop';
import { ExternalLinkSection, ExternalLinkSections } from './components/ExternalLinkSections';
import { LanguageSelection, LanguageSelectionItem } from './components/LanguageSelection';
import { MenuItem, MenuList } from './components/MenuList';
import { MenuSeparator } from './components/MenuSeparator';
import { ServiceVariantProvider } from './hooks/ServiceVariantProvider';
import { useServiceVariant } from './hooks/useServiceVariant';
import { LinkComponent } from './types';

const CloseMenuButton = ({ onClick, ariaCloseMenu }: { onClick: () => void; ariaCloseMenu: string }) => {
  const serviceVariant = useServiceVariant();
  return (
    <div className="ds:flex ds:justify-end">
      <button
        className={`ds:cursor-pointer ds:focus:outline-accent ds:p-3 ${getFocusOutlineClassForService(serviceVariant)}`}
        onClick={onClick}
        aria-label={ariaCloseMenu}
      >
        <MdClose size={24} />
      </button>
    </div>
  );
};

interface NavigationMenuBaseProps {
  /** Function to emit onClose event for user when the menu is closed */
  onClose: () => void;
  /** Open state of the NavigationMenu */
  open: boolean;
  /** Text for screenreader to have on the close menu button */
  ariaCloseMenu: string;
  /** Text for link that brings user to the front page */
  serviceDirectoryLinkLabel: string;
  /** Icon for the front page link */
  serviceDirectoryIcon?: React.ReactNode;
  /** Link component to bring user to front page */
  ServiceDirectoryLinkComponent: React.ComponentType<LinkComponent>;
  /** Menu items. Items can have children */
  menuItems: MenuItem[];
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
}

export type NavigationMenuProps = NavigationMenuBaseProps;
export const NavigationMenu = ({
  onClose,
  open,
  ariaCloseMenu,
  serviceDirectoryLinkLabel,
  serviceDirectoryIcon,
  ServiceDirectoryLinkComponent,
  menuItems,
  openSubMenuLabel,
  externalLinkSections,
  languageSelectionItems,
  selectedLanguage,
  extraSection,
  languageSelectionTitle,
  serviceVariant,
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
      <Backdrop dialogRef={dialogRef} onClose={onClose}>
        <nav className="ds:bg-white ds:flex ds:flex-col ds:z-100 ds:flex-1">
          <div className="ds:px-3 ds:flex ds:flex-col ds:overflow-y-auto ds:flex-grow">
            <div className="ds:flex ds:items-center ds:justify-end ds:my-6">
              <CloseMenuButton onClick={onClose} ariaCloseMenu={ariaCloseMenu} />
            </div>
            <MenuList
              menuItems={menuItems}
              openSubMenuLabel={openSubMenuLabel}
              serviceDirectoryLinkLabel={serviceDirectoryLinkLabel}
              serviceDirectoryIcon={serviceDirectoryIcon}
              ServiceDirectoryLinkComponent={ServiceDirectoryLinkComponent}
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
