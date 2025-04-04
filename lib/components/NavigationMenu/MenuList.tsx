import React from 'react';
import { MdArrowBackIos, MdArrowForwardIos, MdHome } from 'react-icons/md';
import { MenuSeparator } from './MenuSeparator';
import { Placeholder } from './Placeholder';
import { LinkComponent } from './types';

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

export interface MenuItem {
  label: string;
  LinkComponent: React.ComponentType<LinkComponent>;

  // onClick?: () => void;

  childItems?: MenuItem[];
  selected?: boolean;
}

type MenuListItemProps = {
  accentColor: string;
  onClick?: () => void;
} & MenuItem;

const MenuListItem = ({ label, selected, childItems, accentColor, LinkComponent, onClick }: MenuListItemProps) => {
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
        <button
          className="ds:rounded ds:flex ds:items-center ds:justify-center ds:cursor-pointer ds:bg-bg-gray-2 ds:size-[40px]"
          onClick={onClick}
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
  frontPageLinkLabel: string;
  FrontPageLinkComponent: React.ComponentType<LinkComponent>;
  onNestedMenuOpen: (insideNestedMenu: boolean) => void;
}

export const MenuList = ({
  menuItems,
  accentColor,
  frontPageLinkLabel,
  FrontPageLinkComponent,
  onNestedMenuOpen,
}: MenuListProps) => {
  const [historyMenuItems, setHistoryMenuItems] = React.useState<MenuItem[][]>([]);
  /** Going to nested menu */
  const onMenuItemClickHandler = (item: MenuItem) => {
    if (item.childItems && item.childItems.length > 0) {
      setHistoryMenuItems((prev) => {
        const childItems = item.childItems || [];
        return [...prev, childItems];
      });
    }
  };

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

  const HomeButton = React.useCallback(() => {
    return historyMenuItems && historyMenuItems.length > 0 ? (
      <div className="ds:flex ds:flex-row">
        <button
          className="ds:flex ds:flex-row ds:flex-1 ds:gap-3 ds:p-3 ds:cursor-pointer ds:group"
          onClick={() => {
            /** Back to previous menu level */
            setHistoryMenuItems((prev) => {
              if (prev.length <= 1) {
                return [];
              }
              return prev.slice(0, -1);
            });
          }}
        >
          <MdArrowBackIos size={24} />
          <span className="ds:text-button-md ds:group-hover:underline">{'Takaasin'}</span>
        </button>
        <Placeholder />
      </div>
    ) : (
      <FrontPageLink label={frontPageLinkLabel} component={FrontPageLinkComponent} />
    );
  }, [historyMenuItems, FrontPageLinkComponent, frontPageLinkLabel]);

  return (
    <>
      <HomeButton />

      <MenuSeparator />

      <div className={`ds:border-l-[8px]`} style={{ borderColor: accentColor }}>
        <ul className="ds:ml-3 ds:gap-2 ds:flex ds:flex-col">
          {currentMenuItems.map((item) => (
            <MenuListItem
              key={item.label}
              label={item.label}
              selected={item.selected}
              childItems={item.childItems}
              LinkComponent={item.LinkComponent}
              accentColor={accentColor}
              onClick={() => onMenuItemClickHandler(item)}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
