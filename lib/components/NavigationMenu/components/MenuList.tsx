import React from 'react';
import { cx } from '../../../cva';
import { useServiceVariant } from '../../../hooks/useServiceVariant/useServiceVariant';
import { JodCaretDown, JodCaretUp } from '../../../icons';
import {
  getAccentBgClassForService,
  getFocusOutlineClassForService,
  getPressedBgColorClassForService,
  ServiceVariant,
  tidyClasses as tc,
} from '../../../utils';
import { LinkComponent } from '../types';

export interface MenuItem {
  activeIndicator?: 'dot' | 'bg';
  label: string;
  icon?: React.ReactNode;
  LinkComponent?: React.ComponentType<LinkComponent>;
  childItems?: MenuItem[];
  selected?: boolean;
  className?: string;
  collapsed?: boolean;
}

type MenuListItemProps = {
  openSubMenuLabel?: string;
} & MenuItem;

export interface MenuSection {
  title?: string;
  linkItems: MenuItem[];
}

const MenuListItem = ({
  activeIndicator = 'bg',
  childItems,
  className,
  collapsed = true,
  icon,
  label,
  LinkComponent,
  openSubMenuLabel,
  selected,
  dataTestId,
}: MenuListItemProps & { dataTestId?: string }) => {
  const [nestedMenuOpen, setNestedMenuOpen] = React.useState(false);
  const [shouldFocusFirstChild, setShouldFocusFirstChild] = React.useState(false);
  const serviceVariant = useServiceVariant();
  const submenuRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    const isChildItemSelected =
      Array.isArray(childItems) && childItems.length > 0 && childItems?.some((item) => item.selected);
    if (isChildItemSelected || !collapsed) {
      setNestedMenuOpen(true);
    }
  }, [childItems, collapsed]);

  React.useEffect(() => {
    if (shouldFocusFirstChild && nestedMenuOpen && submenuRef.current) {
      const firstChildLink = submenuRef.current.querySelector('a');
      if (firstChildLink instanceof HTMLElement) {
        firstChildLink.focus();
      }
      setShouldFocusFirstChild(false);
    }
  }, [shouldFocusFirstChild, nestedMenuOpen]);

  const handleNestedMenuOpen = () => {
    const isOpening = !nestedMenuOpen;
    setNestedMenuOpen(isOpening);

    if (isOpening && childItems && childItems.length > 0) {
      setShouldFocusFirstChild(true);
    }
  };

  const getSelectedClasses = () => {
    if (activeIndicator === 'dot') {
      const dotColor = cx({
        'ds:before:bg-secondary-1-dark': serviceVariant === 'yksilo',
        'ds:before:bg-secondary-2-dark': serviceVariant === 'ohjaaja',
        'ds:before:bg-secondary-3-dark': serviceVariant === 'palveluportaali',
        'ds:before:bg-secondary-4-dark': serviceVariant === 'tietopalvelu',
      });
      return tc([
        'ds:before:content-[""]',
        'ds:before:absolute',
        'ds:before:-left-5',
        'ds:before:rounded-full',
        'ds:before:size-4',
        'ds:text-black',
        'ds:active:text-white',
        'ds:hover:bg-bg-gray',
        'ds:hover:text-black',
        dotColor,
      ]);
    } else if (activeIndicator === 'bg') {
      return tc(['ds:text-white', getAccentBgClassForService(serviceVariant)]);
    } else {
      return 'ds:bg-transparent';
    }
  };

  return (
    <li data-list-id={label} data-testid={dataTestId ? `${dataTestId}-item` : undefined}>
      <div className={tc(`ds:flex ds:flex-row ds:space-between ds:min-h-8 ds:gap-2 ds:ml-3 ${className}`)}>
        {LinkComponent ? (
          <LinkComponent
            className={`ds:relative ds:flex-1 ds:flex ds:mr-2 ${getFocusOutlineClassForService(serviceVariant)}`}
            aria-current={selected}
            data-testid={dataTestId ? `${dataTestId}-link` : undefined}
          >
            <span
              className={tc([
                'ds:flex',
                'ds:items-center',
                'ds:text-button-md',
                'ds:flex-1',
                'ds:p-3',
                'ds:gap-3',
                'ds:rounded',
                'ds:cursor-pointer',
                'ds:hover:underline',
                'ds:active:underline',
                'ds:active:text-white',
                !selected ? 'ds:hover:bg-bg-gray' : '',
                selected ? getSelectedClasses() : '',
                getPressedBgColorClassForService(serviceVariant),
                !childItems || childItems.length === 0 ? 'ds:max-w-[calc(100%-44px)]' : '',
              ])}
            >
              {icon}
              {label}
            </span>
          </LinkComponent>
        ) : (
          <span className="ds:flex ds:items-center ds:text-[14px] ds:leading-[20px] ds:flex-1 ds:p-3">{label}</span>
        )}
        {childItems && childItems.length > 0 && (
          <button
            aria-label={openSubMenuLabel}
            aria-expanded={nestedMenuOpen}
            className={tc([
              'ds:rounded',
              'ds:flex',
              'ds:items-center',
              'ds:justify-center',
              'ds:cursor-pointer',
              'ds:bg-white',
              'ds:size-8',
              'ds:text-primary-gray',
              'ds:hover:bg-bg-gray',
              'ds:active:text-white',
              getPressedBgColorClassForService(serviceVariant),
              getFocusOutlineClassForService(serviceVariant),
              // Gray bar to the left of the button
              'ds:relative',
              'ds:before:content-[""]',
              'ds:before:absolute',
              'ds:before:-left-2',
              'ds:before:top-[12.5%]',
              'ds:before:h-3/4',
              'ds:before:w-1',
              'ds:before:bg-bg-gray-2',
              'ds:before:pointer-events-none',
            ])}
            onClick={handleNestedMenuOpen}
            data-testid={dataTestId ? `${dataTestId}-toggle` : undefined}
          >
            {nestedMenuOpen ? <JodCaretUp /> : <JodCaretDown />}
          </button>
        )}
      </div>
      {nestedMenuOpen && childItems && childItems.length > 0 && (
        <MenuList
          menuSection={{ linkItems: childItems }}
          openSubMenuLabel={openSubMenuLabel}
          menuRef={submenuRef}
          isNested
          data-testid={dataTestId ? `${dataTestId}-submenu` : undefined}
        />
      )}
    </li>
  );
};

export interface MenuListProps {
  /** How should the active menu item be indicated */
  activeIndicator?: 'dot' | 'bg';
  /** Menu data */
  menuSection?: MenuSection;
  /** Reference to the menu element */
  menuRef?: React.RefObject<HTMLUListElement | null>;
  /** Whether the menu is nested */
  isNested?: boolean;
  /** Whether to hide the accent colored border */
  hideAccentBorder?: boolean;
  /** Open submenu label for accessibility */
  openSubMenuLabel?: string;
  /** Classname for each menu item */
  itemClassname?: string;
  /** Override the service variant from the context provider */
  serviceVariant?: ServiceVariant;
  /** Is menu collapsed initially */
  collapsed?: boolean;
  /** Test id for querying in tests */
  dataTestId?: string;
}

export const MenuList = ({
  activeIndicator = 'bg',
  hideAccentBorder,
  isNested = false,
  itemClassname,
  menuRef,
  collapsed = true,
  menuSection,
  openSubMenuLabel,
  serviceVariant,
  dataTestId,
}: MenuListProps) => {
  const variantFromProvider = useServiceVariant();
  const variant = serviceVariant ?? variantFromProvider;
  const borderClassname = hideAccentBorder
    ? ''
    : cx('ds:border-l-8', {
        'ds:border-secondary-1-dark': variant === 'yksilo',
        'ds:border-secondary-2-dark': variant === 'ohjaaja',
        'ds:border-secondary-gray': variant === 'palveluportaali',
        'ds:border-secondary-4-dark': variant === 'tietopalvelu',
      });

  return (
    menuSection && (
      <div data-testid={dataTestId}>
        {menuSection.title ? (
          <span className="ds:text-body-sm ds:mb-5 ds:mt-2 ds:flex">{menuSection.title}</span>
        ) : null}
        <ul
          className={tc(['ds:gap-2', 'ds:flex', 'ds:flex-col', isNested ? 'ds:ml-6' : borderClassname])}
          ref={menuRef}
          data-testid={dataTestId ? `${dataTestId}-list` : undefined}
        >
          {menuSection.linkItems.map((item) => (
            <MenuListItem
              key={item.label}
              activeIndicator={activeIndicator}
              label={item.label}
              selected={item.selected}
              childItems={item.childItems}
              icon={item.icon}
              LinkComponent={item.LinkComponent}
              openSubMenuLabel={openSubMenuLabel}
              className={itemClassname}
              collapsed={collapsed}
              data-testid={
                dataTestId ? `${dataTestId}-item-${item.label.replace(/\s+/g, '-').toLowerCase()}` : undefined
              }
            />
          ))}
        </ul>
      </div>
    )
  );
};
