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
        <div className="ds:flex-start ds:flex ds:space-x-4">
          {checked ? <CheckedIcon /> : <UncheckedIcon />}
          <span className="ds:flex ds:items-center ds:text-form-label ds:text-black ds:font-arial ds:hover:text-accent ds:hover:underline ds:hyphens-auto">
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
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="ds:self-center"
    >
      <circle cx="8" cy="8" r="8" className="ds:fill-accent" />
      <circle cx="8" cy="8" r="6" className="ds:fill-white" />
      <circle cx="8" cy="8" r="4" className="ds:fill-accent" />
    </svg>
  );
};

const UncheckedIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="ds:self-center"
    >
      <circle cx="8" cy="8" r="8" className="ds:fill-accent" />
      <circle cx="8" cy="8" r="6" className="ds:fill-white" />
    </svg>
  );
};
