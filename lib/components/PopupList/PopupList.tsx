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
  return (
    <div className="inline-flex flex-col items-start rounded bg-white py-6 px-[20px] shadow-border w-[257px]">
      <ul className="w-full">
        {items.map((item) => {
          const Component = item.type === 'button' ? 'button' : 'a';

          return (
            <li key={item.label}>
              <Component
                {...(Component === 'button' ? { type: 'button', onClick: item.onClick } : { href: item.href ?? '#' })}
                aria-current={item.active ? 'true' : undefined}
                className={`flex items-center gap-3 py-3 text-heading-4 font-poppins hover:text-accent hover:underline focus:left-auto focus:underline w-full ${item.active ? 'bg-secondary-1-50' : ''} pl-5 rounded`}
              >
                {item.label}
              </Component>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
