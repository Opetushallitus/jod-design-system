import { MdCheck } from 'react-icons/md';
import { Placeholder } from './Placeholder';
import { LinkComponent } from './types';

export interface LanguageSelectionItem {
  label: string;
  value: string;
  linkComponent: React.ComponentType<LinkComponent>;
}

export interface NavigationMenuLanguageSelectionProps {
  /** Language selection items */
  items: LanguageSelectionItem[];
  /** Selected language */
  selected: string;
}

export const LanguageSelection = ({ items, selected }: NavigationMenuLanguageSelectionProps) => {
  return (
    <div className="ds:flex ds:flex-row">
      <ul aria-label="Language selection" className="ds:flex ds:flex-1 ds:flex-col">
        {items.map((item: LanguageSelectionItem) => (
          <li key={item.label} className="ds:flex ds:flex-1 ds:min-h-[40px] ds:items-center ds:hover:underline">
            <item.linkComponent
              className="ds:flex ds:flex-row ds:flex-1 ds:items-center ds:focus:outline-accent"
              aria-current={selected === item.value}
            >
              <span className="ds:size-[40px] ds:flex ds:justify-center ds:items-center">
                {selected === item.value && <MdCheck size={24} />}
              </span>
              <span className="ds:text-button-md">{item.label}</span>
            </item.linkComponent>
          </li>
        ))}
      </ul>
      <Placeholder />
    </div>
  );
};
