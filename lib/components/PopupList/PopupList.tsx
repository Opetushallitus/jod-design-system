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
  /** Type of the element. Default is link */
  type?: 'button' | 'link';
}

export interface PopupListProps {
  /** List items */
  items: PopupListItem[];
}

export const PopupList = ({ items }: PopupListProps) => {
  const hasActives = Array.isArray(items) && items.some((item) => item.active);
  return (
    <div className="inline-flex flex-col items-start rounded-[20px] border-[3px] border-[#767676] bg-white p-6 pr-10">
      <ul>
        {items.map((item) => {
          const Component = item.type === 'button' ? 'button' : 'a';

          return (
            <li key={item.label} className={hasActives ? 'pl-6' : ''}>
              <Component
                {...(Component === 'button' ? { type: 'button', onClick: item.onClick } : { href: item.href ?? '#' })}
                aria-current={item.active ? 'true' : undefined}
                className={`flex items-center gap-3 py-3 text-button-md hover:text-accent hover:underline focus:left-auto focus:underline`}
              >
                {item.active && <ActiveIndicator />}
                {item.label}
              </Component>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
