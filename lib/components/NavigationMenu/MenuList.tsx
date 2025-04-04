import { MdArrowForwardIos } from 'react-icons/md';
import { Placeholder } from './Placeholder';
import { LinkComponent } from './types';

export interface MenuItem {
  label: string;
  LinkComponent: React.ComponentType<LinkComponent>;
  // TODO: items most likely are router links; figure how to support it correctly without router dependency. Using ReactNode? Using renderProps for items?
  // onClick?: () => void;
  childItems?: MenuItem[];
  selected?: boolean;
}

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

export const MenuList = ({ menuItems, accentColor }: { menuItems: MenuItem[]; accentColor: string }) => {
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
