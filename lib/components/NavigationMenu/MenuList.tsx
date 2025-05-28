import React from 'react';
import { MdArrowBackIos, MdArrowForwardIos, MdHome } from 'react-icons/md';
import { menuFocusManager } from './menuFocusManager';
import { MenuSeparator } from './MenuSeparator';
import { Placeholder } from './Placeholder';
import { LinkComponent } from './types';

const FrontPageLink = ({
  label,
  icon = <MdHome size={24} />,
  component: Component,
}: {
  label: string;
  icon?: React.ReactNode;
  component: React.ComponentType<LinkComponent>;
}) => {
  return (
    <Component className="ds:flex ds:flex-row ds:flex-1 ds:gap-3 ds:p-3 ds:cursor-pointer ds:group ds:focus:outline-accent">
      {icon}
      <span className="ds:text-button-md ds:group-hover:underline">{label}</span>
    </Component>
  );
};

export interface MenuItem {
  label: string;
  LinkComponent?: React.ComponentType<LinkComponent>;
  childItems?: MenuItem[];
  selected?: boolean;
}

type MenuListItemProps = {
  accentColor: string;
  accentColorText?: string;
  onSubmenuClick?: () => void;
  openSubMenuLabel: string;
} & MenuItem;

const MenuListItem = ({
  label,
  selected,
  childItems,
  accentColor,
  accentColorText,
  LinkComponent,
  onSubmenuClick,
  openSubMenuLabel,
  ...rest
}: MenuListItemProps) => {
  return (
    <li className="ds:flex ds:flex-row ds:space-between ds:min-h-[40px] ds:gap-2" {...rest}>
      {LinkComponent ? (
        <LinkComponent className="ds:flex-1 ds:flex ds:focus:outline-accent" aria-current={selected}>
          <span
            className="ds:flex ds:items-center ds:text-button-md ds:flex-1 ds:p-3 ds:rounded ds:cursor-pointer ds:hover:underline"
            style={{ backgroundColor: selected ? accentColor : 'transparent' }}
          >
            {label}
          </span>
        </LinkComponent>
      ) : (
        <span
          className="ds:flex ds:items-center ds:text-[14px] ds:leading-[20px] ds:flex-1 ds:p-3"
          style={{ color: accentColorText ?? accentColor }}
        >
          {label}
        </span>
      )}
      {childItems && childItems.length > 0 ? (
        <button
          aria-label={openSubMenuLabel}
          className="ds:rounded ds:flex ds:items-center ds:justify-center ds:cursor-pointer ds:bg-bg-gray-2 ds:size-[40px] ds:text-black ds:hover:text-accent ds:focus:text-accent"
          onClick={onSubmenuClick}
        >
          <MdArrowForwardIos size={24} />
        </button>
      ) : (
        <Placeholder />
      )}
    </li>
  );
};

export interface MenuListProps {
  menuItems: MenuItem[];
  accentColor: string;
  accentColorText?: string;
  frontPageLinkLabel: string;
  frontPageIcon?: React.ReactNode;
  FrontPageLinkComponent: React.ComponentType<LinkComponent>;
  onNestedMenuOpen: (insideNestedMenu: boolean) => void;
  backLabel: string;
  openSubMenuLabel: string;
}

export const MenuList = ({
  menuItems,
  accentColor,
  accentColorText,
  frontPageLinkLabel,
  frontPageIcon,
  FrontPageLinkComponent,
  onNestedMenuOpen,
  backLabel,
  openSubMenuLabel,
}: MenuListProps) => {
  const [historyMenuItems, setHistoryMenuItems] = React.useState<MenuItem[][]>([]);
  const [shouldReturnFocus, setShouldReturnFocus] = React.useState(false);

  /** Going to nested menu */
  const onSubmenuItemClickHandler = (item: MenuItem) => {
    if (item.childItems && item.childItems.length > 0) {
      menuFocusManager.addToFocusHistory(item.label);

      setHistoryMenuItems((prev) => {
        const childItems = item.childItems || [];
        return [...prev, childItems];
      });
    }
  };
  /** Back to previous menu level */
  const onNestedMenuCloseHandler = () => {
    setHistoryMenuItems((prev) => {
      if (prev.length <= 1) {
        return [];
      }
      return prev.slice(0, -1);
    });
    setShouldReturnFocus(true);
  };

  /** MenuItems to show to user at the moment */
  const currentMenuItems = React.useMemo(() => {
    if (historyMenuItems && historyMenuItems.length > 0) {
      const lastItem = historyMenuItems[historyMenuItems.length - 1];
      return lastItem;
    }
    return menuItems;
  }, [menuItems, historyMenuItems]);

  React.useEffect(() => {
    if (historyMenuItems && historyMenuItems.length > 0) {
      onNestedMenuOpen(true);
    } else {
      onNestedMenuOpen(false);
    }
  }, [onNestedMenuOpen, historyMenuItems]);

  React.useEffect(() => {
    if (shouldReturnFocus) {
      menuFocusManager.returnFocus();
      setShouldReturnFocus(false);
    }
  }, [shouldReturnFocus]);

  const HomeButton = React.useCallback(() => {
    return (
      <div className="ds:flex ds:flex-row">
        {historyMenuItems && historyMenuItems.length > 0 ? (
          <button
            className="ds:flex ds:flex-row ds:flex-1 ds:gap-3 ds:p-3 ds:cursor-pointer ds:group ds:focus:outline-accent"
            onClick={onNestedMenuCloseHandler}
          >
            <MdArrowBackIos size={24} />
            <span className="ds:text-button-md ds:group-hover:underline">{backLabel}</span>
          </button>
        ) : (
          <FrontPageLink label={frontPageLinkLabel} icon={frontPageIcon} component={FrontPageLinkComponent} />
        )}
        <Placeholder />
      </div>
    );
  }, [historyMenuItems, backLabel, frontPageLinkLabel, frontPageIcon, FrontPageLinkComponent]);

  return (
    <>
      <HomeButton />
      <MenuSeparator />
      <div className="ds:border-l-[8px]" style={{ borderColor: accentColor }}>
        <ul className="ds:ml-3 ds:gap-2 ds:flex ds:flex-col">
          {currentMenuItems.map((item) => (
            <MenuListItem
              data-list-id={item.label}
              key={item.label}
              label={item.label}
              selected={item.selected}
              childItems={item.childItems}
              LinkComponent={item.LinkComponent}
              accentColor={accentColor}
              accentColorText={accentColorText}
              onSubmenuClick={() => onSubmenuItemClickHandler(item)}
              openSubMenuLabel={openSubMenuLabel}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
