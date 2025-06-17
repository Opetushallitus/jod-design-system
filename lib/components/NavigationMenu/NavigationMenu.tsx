import React from 'react';
import { MdClose } from 'react-icons/md';
import { LogoRgb } from '../Logo/LogoRgb';
import { Backdrop } from './Backdrop';
import { ExternalLinkSection, ExternalLinkSections } from './ExternalLinkSections';
import { LanguageSelection, LanguageSelectionItem } from './LanguageSelection';
import { MenuItem, MenuList } from './MenuList';
import { MenuSeparator } from './MenuSeparator';
import { LinkComponent } from './types';

const CloseMenuButton = ({ onClick, ariaCloseMenu }: { onClick: () => void; ariaCloseMenu: string }) => {
  return (
    <div className="ds:flex ds:justify-end">
      <button className="ds:cursor-pointer ds:focus:outline-accent ds:p-3" onClick={onClick} aria-label={ariaCloseMenu}>
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
  frontPageLinkLabel: string;
  /** For navigation link component */
  logoLink?: React.ComponentType<{
    to: object | string;
    className?: string;
    children: React.ReactNode;
  }>;
  /** Osaamispolku logo to show on the top row */
  logo?: {
    to: object | string;
    language: string;
    srText: string;
  };
  /** Icon for the front page link */
  frontPageIcon?: React.ReactNode;
  /** Link component to bring user to front page */
  FrontPageLinkComponent: React.ComponentType<LinkComponent>;
  /** Label for navigating back in the menu */
  backLabel: string;
  /** Menu accent color. Color used on the left part of the menus */
  accentColor: string;
  /** Text color for the accent color */
  accentColorText?: string;
  /** Menu items. Items can have children */
  menuItems: MenuItem[];
  /** Label for button to open submenu of menu item */
  openSubMenuLabel: string;
  /** External link sections */
  externalLinkSections?: ExternalLinkSection[];
  /** Language selection items */
  languageSelectionItems?: LanguageSelectionItem[];
  /** Selected language */
  selectedLanguage: string;
  /** Extra section to be displayed at the end of the menu before the language selection */
  extraSection?: React.ReactNode;
}

type LogoProps =
  | {
      logoLink: React.ComponentType<{
        to: object | string;
        className?: string;
        children: React.ReactNode;
      }>;
      logo: {
        to: object | string;
        language: string;
        srText: string;
      };
    }
  | {
      logoLink?: never;
      logo?: never;
    };

export type NavigationMenuProps = NavigationMenuBaseProps & LogoProps;
export const NavigationMenu = ({
  onClose,
  open,
  ariaCloseMenu,
  frontPageLinkLabel,
  frontPageIcon,
  FrontPageLinkComponent,
  backLabel,
  accentColor,
  accentColorText,
  menuItems,
  openSubMenuLabel,
  externalLinkSections,
  languageSelectionItems,
  selectedLanguage,
  extraSection,
  logoLink: Link,
  logo,
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
          <div className="ds:flex ds:items-center ds:justify-between ds:mb-5">
            <div>
              {logo && Link && (
                <Link to={logo.to}>
                  <div className="ds:inline-flex ds:select-none ds:items-center ds:p-5">
                    <LogoRgb language={logo.language} size={26} />
                    <span className="ds:sr-only">{logo.srText}</span>
                  </div>
                </Link>
              )}
            </div>
            <CloseMenuButton onClick={onClose} ariaCloseMenu={ariaCloseMenu} />
          </div>
          <MenuList
            menuItems={menuItems}
            openSubMenuLabel={openSubMenuLabel}
            accentColor={accentColor}
            accentColorText={accentColorText}
            frontPageLinkLabel={frontPageLinkLabel}
            frontPageIcon={frontPageIcon}
            FrontPageLinkComponent={FrontPageLinkComponent}
            onNestedMenuOpen={(menuOpen) => setNestedMenuOpen(menuOpen)}
            backLabel={backLabel}
          />
          {!nestedMenuOpen && (
            <>
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
                  <LanguageSelection items={languageSelectionItems} selected={selectedLanguage} />
                </>
              )}
            </>
          )}
        </div>
      </nav>
    </Backdrop>
  ) : null;
};
