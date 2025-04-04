import { MdCheck } from 'react-icons/md';
import { RadioButton } from '../RadioButton/RadioButton';
import { RadioButtonGroup } from '../RadioButton/RadioButtonGroup';
import { Placeholder } from './Placeholder';

export interface LanguageSelectionItem {
  label: string;
  value: string;
}

export interface NavigationMenuLanguageSelectionProps {
  /** Language selection items */
  items: LanguageSelectionItem[];
  /** Selected language */
  selected: string;
  /** Callback when language is changed */
  onChange: (value: string) => void;
}

export const LanguageSelection = ({ items, selected, onChange }: NavigationMenuLanguageSelectionProps) => {
  return (
    <div className="ds:flex ds:flex-row">
      <RadioButtonGroup
        className="ds:space-y-3 ds:flex ds:flex-1"
        hideLabel
        label="Language selection"
        value={selected}
        onChange={onChange}
      >
        {items.map((item: LanguageSelectionItem) => (
          <RadioButton
            key={item.label}
            className="ds:min-h-[40px] ds:flex ds:items-center ds:flex-1 ds:hover:underline"
            value={item.value}
            label={item.label}
            checkedIcon={<MdCheck size={24} />}
            uncheckedIcon={<span className="ds:size-[24px]"></span>}
          />
        ))}
      </RadioButtonGroup>
      <Placeholder />
    </div>
  );
};
