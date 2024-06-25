import { Radio } from '@headlessui/react';

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
    <Radio value={value} className={`${className ? className : ''} flex h-7`.trim()}>
      {({ checked }) => (
        <div className="flex-start flex space-x-4">
          {checked ? <CheckedIcon /> : <UncheckedIcon />}
          <span className="flex items-center text-button-md text-primary-gray hover:text-accent hover:underline hyphens-auto">
            {label}
          </span>
        </div>
      )}
    </Radio>
  );
};

const CheckedIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="self-center"
    >
      <circle cx="12.0352" cy="12.0389" r="8" className="stroke-accent" strokeWidth="8" />
    </svg>
  );
};

const UncheckedIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="self-center"
    >
      <circle cx="12.0352" cy="12.0389" r="11" className="stroke-primary-gray" strokeWidth="2" />
    </svg>
  );
};
