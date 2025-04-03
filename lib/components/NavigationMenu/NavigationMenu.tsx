import React from 'react';
import { MdClose } from 'react-icons/md';
import { Backdrop } from './Backdrop';
import { ExternalLinkSection, ExternalLinkSections } from './ExternalLinkSections';
import { LanguageSelection, LanguageSelectionItem } from './LanguageSelection';
import { MenuItem, MenuList } from './MenuList';
import { MenuSeparator } from './MenuSeparator';
import { LinkComponent } from './types';

const CloseMenuButton = ({ onClick, ariaCloseMenu }: { onClick: () => void; ariaCloseMenu: string }) => {
  return (
    <div className="ds:flex ds:justify-end">
      <button
        className="ds:cursor-pointer ds:focus:outline-accent ds:p-3 ds:-m-3"
        onClick={onClick}
        aria-label={ariaCloseMenu}
      >
        <MdClose size={24} />
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
  frontPageLinkLabel: string;
  /** Link component to bring user to front page */
  FrontPageLinkComponent: React.ComponentType<LinkComponent>;
  /** Label for navigating back in the menu */
  backLabel: string;

  /** Menu accent color. Color used on the left part of the menus */
  accentColor: string;
  /** Menu items. Items can have children */
  menuItems: MenuItem[];
  /** Label for button to open submenu of menu item */
  openSubMenuLabel: string;
  /** External link sections */
  externalLinkSections: ExternalLinkSection[];
  /** Language selection items */
  languageSelectionItems: LanguageSelectionItem[];
  /** Selected language */
  selectedLanguage: string;
}

export const NavigationMenu = ({
  onClose,
  open,
  ariaCloseMenu,
  frontPageLinkLabel,
  FrontPageLinkComponent,
  backLabel,
  accentColor,
  menuItems,
  openSubMenuLabel,
  externalLinkSections,
  languageSelectionItems,
  selectedLanguage,
}: NavigationMenuProps) => {
  const [nestedMenuOpen, setNestedMenuOpen] = React.useState(false);
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
    <Backdrop dialogRef={dialogRef} onClose={onClose}>
      <nav className="ds:bg-white ds:flex ds:flex-col ds:z-100 ds:flex-1">
        <div className="ds:px-3 ds:pt-6 ds:flex ds:flex-col ds:overflow-y-auto ds:flex-grow">
          <CloseMenuButton
            onClick={() => {
              onClose();
            }}
            ariaCloseMenu={ariaCloseMenu}
          />
          <MenuList
            menuItems={menuItems}
            openSubMenuLabel={openSubMenuLabel}
            accentColor={accentColor}
            frontPageLinkLabel={frontPageLinkLabel}
            FrontPageLinkComponent={FrontPageLinkComponent}
            onNestedMenuOpen={(menuOpen) => setNestedMenuOpen(menuOpen)}
            backLabel={backLabel}
          />
          {!nestedMenuOpen && (
            <>
              <MenuSeparator />
              <ExternalLinkSections sections={externalLinkSections} />
              <MenuSeparator />
              <LanguageSelection items={languageSelectionItems} selected={selectedLanguage} />
            </>
          )}
        </div>
      </nav>
    </Backdrop>
  ) : null;
};
