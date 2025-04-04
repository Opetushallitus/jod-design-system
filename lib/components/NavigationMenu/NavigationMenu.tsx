import { MdClose, MdHome } from 'react-icons/md';
import { ExternalLinkSection, ExternalLinkSections } from './ExternalLinkSections';
import { LanguageSelection, LanguageSelectionItem } from './LanguageSelection';
import { MenuItem, MenuList } from './MenuList';
import { LinkComponent } from './types';

const MenuSeparator = () => {
  return <span className="ds:my-3 ds:border-[#CCC] ds:border-b-[1px]"></span>;
};

const CloseMenuButton = () => {
  return (
    <div className="ds:flex ds:justify-end">
      <button className="ds:cursor-pointer">
        <MdClose size={24} />
      </button>
    </div>
  );
};

const FrontPageLink = ({
  label,
  component: Component,
}: {
  label: string;
  component: React.ComponentType<LinkComponent>;
}) => {
  return (
    <Component className="ds:flex ds:flex-row ds:gap-3 ds:p-3 ds:cursor-pointer ds:group">
      <MdHome size={24} />
      <span className="ds:text-button-md ds:group-hover:underline">{label}</span>
    </Component>
  );
};

export interface NavigationMenuProps {
  /** Closing the menu from close button */
  onClose: () => void;
  /** Text for link that brings user to the front page */
  frontPageLinkLabel: string;
  /** Link component to bring user to front page */
  FrontPageLinkComponent: React.ComponentType<LinkComponent>;

  /** Menu accent color. Color used on the left part of the menus */
  accentColor: string;
  /** Menu items. Items can have children */
  menuItems: MenuItem[];
  /** External link sections */
  externalLinkSections: ExternalLinkSection[];
  /** Language selection items */
  languageSelectionItems: LanguageSelectionItem[];
  /** Selected language */
  selectedLanguage: string;
  /** Callback when language is changed */
  onLanguageChange: (value: string) => void;
}

export const NavigationMenu = ({
  frontPageLinkLabel,
  FrontPageLinkComponent,
  accentColor,
  menuItems,
  externalLinkSections,
  languageSelectionItems,
  selectedLanguage,
  onLanguageChange,
}: NavigationMenuProps) => {
  return (
    <nav className="ds:w-sm ds:min-w-sm ds:max-w-sm ds:h-full ds:bg-white">
      <div className="ds:p-3 ds:flex ds:flex-col">
        <CloseMenuButton />
        <FrontPageLink label={frontPageLinkLabel} component={FrontPageLinkComponent} />
        <MenuSeparator />
        <MenuList menuItems={menuItems} accentColor={accentColor} />
        <MenuSeparator />
        <ExternalLinkSections sections={externalLinkSections} />
        <MenuSeparator />
        <LanguageSelection items={languageSelectionItems} selected={selectedLanguage} onChange={onLanguageChange} />
      </div>
    </nav>
  );
};
