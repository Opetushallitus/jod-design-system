import { ActiveIndicator } from '../ActiveIndicator/ActiveIndicator';

export interface PopupListItem {
  /** List item label */
  label: string;
  /** Is list item active */
  active?: boolean;
  /** Optional click handler */
  onClick?: () => void;
  /** Link destination */
  href?: string;
}

export interface PopupListProps {
  /** List items */
  items: PopupListItem[];
  /** Are list items buttons or links. Button is default */
  itemsType?: 'button' | 'link';
}

export const PopupList = ({ items, itemsType: itemType = 'button' }: PopupListProps) => {
  const hasActives = Array.isArray(items) && items.some((item) => item.active);
  const Component = itemType === 'link' ? 'a' : 'button';
  return (
    <div className="inline-flex flex-col items-start rounded-[20px] border-[3px] border-[#767676] p-6 pr-10">
      <ul>
        {items.map((item) => (
          <li key={item.label} className={hasActives ? 'pl-6' : ''}>
            <Component
              {...(itemType === 'button' ? { type: 'button' } : {})}
              {...(itemType === 'link' ? { href: item.href ?? '#' } : {})}
              aria-current={item.active ? 'true' : undefined}
              onClick={item.onClick}
              className={`flex items-center gap-3 py-3 text-button-md hover:text-accent hover:underline focus:left-auto focus:underline`}
            >
              {item.active && <ActiveIndicator />}
              {item.label}
            </Component>
          </li>
        ))}
      </ul>
    </div>
  );
};
