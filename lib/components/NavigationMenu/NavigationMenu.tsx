import { MdArrowForwardIos, MdCheck, MdClose, MdHome } from 'react-icons/md';
import { RxExternalLink } from 'react-icons/rx';
import { RadioButton } from '../RadioButton/RadioButton';
import { RadioButtonGroup } from '../RadioButton/RadioButtonGroup';

/** Empty placeholder to create gap on the right when needed */
const Placeholder = () => {
  return <span className="ds:size-[40px]"></span>;
};

export interface LanguageSelectionItem {
  label: string;
  value: string;
}

export interface NavigationMenuLanguageSelectionProps {
  /** Language selection items */
  items: LanguageSelectionItem[];
  /** Selected language */
  selected: string;
  /** Callback when language is changed */
  onChange: (value: string) => void;
}

const LanguageSelection = ({ items, selected, onChange }: NavigationMenuLanguageSelectionProps) => {
  return (
    <div className="ds:flex ds:flex-row">
      <RadioButtonGroup
        className="ds:space-y-3 ds:flex ds:flex-1"
        hideLabel
        label="Language selection"
        value={selected}
        onChange={onChange}
      >
        {items.map((item: LanguageSelectionItem) => (
          <RadioButton
            key={item.label}
            className="ds:min-h-[40px] ds:flex ds:items-center ds:flex-1 ds:hover:underline"
            value={item.value}
            label={item.label}
            checkedIcon={<MdCheck size={24} />}
            uncheckedIcon={<span className="ds:size-[24px]"></span>}
          />
        ))}
      </RadioButtonGroup>
      <Placeholder />
    </div>
  );
};

export interface ExternalLinkSection {
  title: string;
  linkItems: LinkItem[];
}

export interface LinkItem {
  label: string;
  url: string;
  description: string;
  accentColor: string;
}

const ExternalLinkItem = ({ item }: { item: LinkItem }) => {
  return (
    <li key={item.label} className="ds:border-l-[8px] ds:text-button-md" style={{ borderColor: item.accentColor }}>
      <div className="ds:pl-5  ds:flex ds:flex-row ds:space-between">
        <div className="ds:flex ds:flex-col ds:flex-1 ds:gap-3 ds:py-3 ds:group">
          <div className="ds:flex ds:flex-row">
            <span className="ds:flex ds:flex-1 ds:group-hover:underline">{item.label}</span>
            <span>
              <RxExternalLink size={24} />
            </span>
          </div>
          <span className="ds:text-body-sm">{item.description}</span>
        </div>
        <Placeholder />
      </div>
    </li>
  );
};

const ExternalLinkSections = ({ sections }: { sections: ExternalLinkSection[] }) => {
  return (
    <div>
      {sections.map((section) => (
        <div key={section.title}>
          <span className="ds:text-body-sm ds:mb-5 ds:mt-2 ds:flex">{section.title}</span>
          <ul className="ds:gap-3 ds:flex ds:flex-col">
            {section.linkItems.map((item) => (
              <ExternalLinkItem key={item.label} item={item} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const MenuSeparator = () => {
  return <span className="ds:my-3 ds:border-[#CCC] ds:border-b-[1px]"></span>;
};

const MenuListItem = ({
  label,
  selected,
  childItems,
  accentColor,
  LinkComponent,
}: MenuItem & { accentColor: string }) => {
  return (
    <li className="ds:flex ds:flex-row ds:space-between ds:min-h-[40px] ds:gap-2">
      <LinkComponent className="ds:flex-1 ds:flex">
        <span
          className="ds:flex ds:items-center ds:text-button-md ds:flex-1 ds:p-3 ds:rounded ds:cursor-pointer ds:hover:underline"
          style={{ backgroundColor: selected ? accentColor : 'transparent' }}
        >
          {label}
        </span>
      </LinkComponent>
      {childItems && childItems.length > 0 ? (
        <button className="ds:rounded ds:flex ds:items-center ds:justify-center ds:cursor-pointer ds:bg-bg-gray-2 ds:size-[40px]">
          <MdArrowForwardIos size={24} />
        </button>
      ) : (
        <Placeholder />
      )}
    </li>
  );
};

const MenuList = ({ menuItems, accentColor }: { menuItems: MenuItem[]; accentColor: string }) => {
  return (
    <div className={`ds:border-l-[8px]`} style={{ borderColor: accentColor }}>
      <ul className="ds:ml-3 ds:gap-2 ds:flex ds:flex-col">
        {menuItems.map((item) => (
          <MenuListItem
            key={item.label}
            label={item.label}
            selected={item.selected}
            childItems={item.childItems}
            LinkComponent={item.LinkComponent}
            accentColor={accentColor}
          />
        ))}
      </ul>
    </div>
  );
};

export interface LinkComponent {
  children: React.ReactNode;
  className: string;
}

export interface MenuItem {
  label: string;
  LinkComponent: React.ComponentType<LinkComponent>;
  // TODO: items most likely are router links; figure how to support it correctly without router dependency. Using ReactNode? Using renderProps for items?
  // onClick?: () => void;
  childItems?: MenuItem[];
  selected?: boolean;
}

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
  /** TODO: */
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
