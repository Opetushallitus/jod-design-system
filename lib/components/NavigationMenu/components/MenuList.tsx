import React from 'react';
import { cx } from '../../../cva';
import { JodCaretDown, JodCaretUp } from '../../../icons';
import {
  getAccentBgClassForService,
  getFocusOutlineClassForService,
  getPressedBgColorClassForService,
  tidyClasses as tc,
} from '../../../utils';
import { useServiceVariant } from '../hooks/useServiceVariant';
import { LinkComponent } from '../types';
import { MenuSeparator } from './MenuSeparator';
import { Placeholder } from './Placeholder';

const PortalLink = ({
  label,
  icon,
  selected = false,
  component: Component,
}: {
  label: string;
  icon?: React.ReactNode;
  selected?: boolean;
  component: React.ComponentType<LinkComponent>;
}) => {
  const variant = useServiceVariant();

  return (
    <div className="ds:border-l-8 ds:border-secondary-3-dark">
      <Component
        className={tc([
          'ds:flex',
          'ds:w-full',
          'ds:flex-1',
          'ds:gap-3',
          'ds:p-3',
          'ds:cursor-pointer',
          'ds:group',
          'ds:rounded',
          selected ? 'ds:text-white' : 'ds:text-black',
          selected ? getAccentBgClassForService(variant) : 'ds:hover:bg-bg-gray',
          getFocusOutlineClassForService(variant),
        ])}
      >
        {icon}
        <span className="ds:text-button-md ds:group-hover:underline">{label}</span>
      </Component>
    </div>
  );
};

export interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  LinkComponent?: React.ComponentType<LinkComponent>;
  childItems?: MenuItem[];
  selected?: boolean;
}

type MenuListItemProps = {
  openSubMenuLabel: string;
} & MenuItem;

export interface MenuSection {
  title?: string;
  linkItems: MenuItem[];
}

const MenuListItem = ({ label, selected, childItems, LinkComponent, openSubMenuLabel, icon }: MenuListItemProps) => {
  const [nestedMenuOpen, setNestedMenuOpen] = React.useState(false);
  const serviceVariant = useServiceVariant();
  const submenuRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    if (nestedMenuOpen && childItems && childItems.length > 0 && submenuRef.current) {
      const firstChildLink = submenuRef.current.querySelector('a');
      if (firstChildLink instanceof HTMLElement) {
        firstChildLink.focus();
      }
    }
  }, [nestedMenuOpen, childItems]);

  return (
    <li data-list-id={label}>
      <div className="ds:flex ds:flex-row ds:space-between ds:min-h-8 ds:gap-2 ds:ml-3">
        {LinkComponent ? (
          <LinkComponent
            className={`ds:flex-1 ds:flex ${getFocusOutlineClassForService(serviceVariant)} ds:mr-2`}
            aria-current={selected}
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
                selected ? 'ds:text-white' : 'ds:text-black',
                selected ? '' : 'ds:hover:bg-bg-gray',
                selected ? 'ds:hover:text-white' : 'ds:hover:text-black',
                selected ? getAccentBgClassForService(serviceVariant) : 'transparent',
                getPressedBgColorClassForService(serviceVariant),
              ])}
            >
              {icon}
              {label}
            </span>
          </LinkComponent>
        ) : (
          <span className="ds:flex ds:items-center ds:text-[14px] ds:leading-[20px] ds:flex-1 ds:p-3">{label}</span>
        )}
        {childItems && childItems.length > 0 ? (
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
            onClick={() => {
              setNestedMenuOpen(!nestedMenuOpen);
            }}
          >
            {nestedMenuOpen ? <JodCaretUp size={24} /> : <JodCaretDown size={24} />}
          </button>
        ) : (
          <Placeholder />
        )}
      </div>
      {nestedMenuOpen && childItems && childItems.length > 0 && (
        <MenuList
          menuSection={{ linkItems: childItems }}
          openSubMenuLabel={openSubMenuLabel}
          menuRef={submenuRef}
          isNested
        />
      )}
    </li>
  );
};

export interface MenuListProps {
  menuSection: MenuSection;
  menuRef?: React.RefObject<HTMLUListElement | null>;
  portalLinkLabel?: string;
  portalIcon?: React.ReactNode;
  PortalLinkComponent?: React.ComponentType<LinkComponent>;
  isNested?: boolean;
  openSubMenuLabel: string;
}

export const MenuList = ({
  portalIcon,
  PortalLinkComponent,
  portalLinkLabel,
  isNested = false,
  menuSection,
  openSubMenuLabel,
  menuRef,
}: MenuListProps) => {
  const ServiceDirectoryButton = React.useCallback(() => {
    return portalLinkLabel && PortalLinkComponent ? (
      <PortalLink label={portalLinkLabel} icon={portalIcon} component={PortalLinkComponent} />
    ) : null;
  }, [PortalLinkComponent, portalIcon, portalLinkLabel]);

  const variant = useServiceVariant();
  const borderClassname = cx({
    'ds:border-secondary-1-dark': variant === 'yksilo',
    'ds:border-secondary-2-dark': variant === 'ohjaaja',
    'ds:border-secondary-3-dark': variant === 'palveluportaali',
    'ds:border-secondary-4-dark': variant === 'tietopalvelu',
  });

  return (
    <>
      {!isNested && <ServiceDirectoryButton />}
      {/* Dont show separator if there are no menu items */}
      {menuSection.linkItems.length > 0 && !isNested && <MenuSeparator />}
      <div>
        {menuSection.title ? (
          <span className="ds:text-body-sm ds:mb-5 ds:mt-2 ds:flex">{menuSection.title}</span>
        ) : null}
        <ul
          className={tc([
            'ds:gap-2',
            'ds:flex',
            'ds:flex-col',
            isNested ? 'ds:ml-6' : `ds:border-l-8 ${borderClassname}`,
          ])}
          ref={menuRef}
        >
          {menuSection.linkItems.map((item) => (
            <MenuListItem
              key={item.label}
              label={item.label}
              selected={item.selected}
              childItems={item.childItems}
              icon={item.icon}
              LinkComponent={item.LinkComponent}
              openSubMenuLabel={openSubMenuLabel}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
