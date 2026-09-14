import { useServiceVariant } from '../../../hooks/useServiceVariant/useServiceVariant';
import { LanguageSelectionItem as LanguageSelectionListItem } from '../../internal/LanguageSelectionItem/LanguageSelectionItem';
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
          {items.map((item: LanguageSelectionItem) => {
            const testId = `language-selection-item-${item.label.replace(/\s+/g, '-').toLowerCase()}`;

            return (
              <LanguageSelectionListItem
                key={item.label}
                label={item.label}
                value={item.value}
                selected={selected === item.value}
                serviceVariant={serviceVariant}
                linkComponent={item.linkComponent}
                testId={testId}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
};
