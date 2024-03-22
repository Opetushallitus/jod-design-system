import { RadioGroup } from '@headlessui/react';

export interface RadioButtonProps {
  /** Text for the component */
  label: string;
  /** Value for the component */
  value: string;
  /** CSS classes for custom styles */
  className?: string;
}

export const RadioButton = ({ label, value, className }: RadioButtonProps) => {
  return (
    <RadioGroup.Option value={value} className={`${className ? className : ''}`.trim()}>
      {({ checked }) => (
        <div className="flex-start flex space-x-3">
          {checked ? <CheckedIcon /> : <UncheckedIcon />}
          <span className="flex items-center text-[#4D5358]">{label}</span>
        </div>
      )}
    </RadioGroup.Option>
  );
};

const CheckedIcon = () => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <circle cx="15.6992" cy="16.1349" r="10.6992" stroke="#4D5358" strokeWidth="10" />
      </g>
    </svg>
  );
};

const UncheckedIcon = () => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <circle cx="15.6992" cy="16.5333" r="15.6992" fill="white" />
      </g>
    </svg>
  );
};
