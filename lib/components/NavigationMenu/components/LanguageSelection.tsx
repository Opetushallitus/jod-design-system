import {
  getAccentBgClassForService,
  getFocusOutlineClassForService,
  getPressedColorClassForService,
  tidyClasses,
} from '../../../utils';
import { useServiceVariant } from '../hooks/useServiceVariant';
import { LinkComponent } from '../types';

export interface LanguageSelectionItem {
  label: string;
  value: string;
  linkComponent: React.ComponentType<LinkComponent>;
}

export interface NavigationMenuLanguageSelectionProps {
  /** Language selection title */
  title: string;
  /** Language selection items */
  items: LanguageSelectionItem[];
  /** Selected language */
  selected: string;
}

export const LanguageSelection = ({ items, selected, title }: NavigationMenuLanguageSelectionProps) => {
  const serviceVariant = useServiceVariant();

  return (
    <>
      <span className="ds:text-body-sm ds:mb-5 ds:mt-2 ds:flex">{title}</span>
      <div className="ds:flex">
        <ul className="ds:flex ds:flex-1 ds:flex-col">
          {items.map((item: LanguageSelectionItem) => (
            <li key={item.label} className="ds:flex ds:min-h-8 ds:items-center ds:hover:underline">
              <item.linkComponent
                className={tidyClasses([
                  'ds:flex',
                  'ds:flex-row',
                  'ds:flex-1',
                  'ds:items-center',
                  'ds:hover:bg-bg-gray',
                  'ds:rounded',
                  'ds:text-black',
                  'ds:active:text-white',
                  'ds:py-3',
                  getPressedColorClassForService(serviceVariant),
                  getFocusOutlineClassForService(serviceVariant),
                ])}
                aria-current={selected === item.value}
              >
                <span className="ds:size-4 ds:flex ds:justify-center ds:items-center" aria-hidden>
                  {selected === item.value && (
                    <span className={`${getAccentBgClassForService(serviceVariant)} ds:size-4 ds:rounded-full`} />
                  )}
                </span>
                <span className="ds:text-button-md ds:ml-3">{item.label}</span>
              </item.linkComponent>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
