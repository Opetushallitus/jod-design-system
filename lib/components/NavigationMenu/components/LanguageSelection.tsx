import { cx } from '../../../cva';
import { useServiceVariant } from '../../../hooks/useServiceVariant/useServiceVariant';
import {
  getAccentBgClassForService,
  getFocusOutlineClassForService,
  getGroupActiveBgColorClassForService,
} from '../../../utils';
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
      <h2 className="ds:text-body-sm ds:mb-5 ds:mt-2 ds:flex" data-testid="language-selection-title">
        {title}
      </h2>
      <div className="ds:flex">
        <ul className="ds:flex ds:flex-1 ds:flex-col ds:gap-2" data-testid="language-selection-list">
          {items.map((item: LanguageSelectionItem) => (
            <li
              key={item.label}
              className="ds:flex ds:min-h-8 ds:items-center"
              lang={item.value}
              data-testid={`language-selection-item-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
            >
              <item.linkComponent
                className={cx([
                  'ds:flex',
                  'ds:flex-row',
                  'ds:flex-1',
                  'ds:items-center',
                  'ds:text-button-md',
                  'ds:group',
                  getFocusOutlineClassForService(serviceVariant),
                ])}
                aria-current={selected === item.value}
                data-testid={`language-selection-item-link-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
              >
                <span className="ds:size-4 ds:flex ds:justify-center ds:items-center ds:ml-2" aria-hidden>
                  <span
                    className={cx([
                      selected === item.value && getAccentBgClassForService(serviceVariant),
                      'ds:size-4',
                      'ds:rounded-full',
                      selected !== item.value && 'ds:group-hover:bg-primary-5-light-3',
                      getGroupActiveBgColorClassForService(serviceVariant),
                    ])}
                  />
                </span>
                <span
                  className={cx([
                    'ds:ml-2',
                    'ds:rounded',
                    'ds:text-primary-gray',
                    selected !== item.value && 'ds:group-hover:bg-primary-5-light-3',
                    'ds:group-hover:underline',
                    'ds:py-3',
                    'ds:px-3',
                    'ds:grow',
                    'ds:group-active:text-white',
                    getGroupActiveBgColorClassForService(serviceVariant),
                  ])}
                >
                  {item.label}
                </span>
              </item.linkComponent>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
