import { Radio } from '@headlessui/react';

export interface RadioButtonProps {
  /** Text for the component */
  label: string;
  /** Value for the component */
  value: string;
  /** CSS classes for custom styles */
  className?: string;
  /** Component variant */
  variant?: 'default' | 'bordered';
}

export const RadioButton = ({ label, value, className, variant = 'default' }: RadioButtonProps) => {
  return (
    <Radio value={value} className={`${className ? className : ''} flex h-7`.trim()}>
      {({ checked }) => (
        <div className="ds-flex-start ds-flex ds-space-x-4">
          {checked ? <CheckedIcon /> : <UncheckedIcon variant={variant} />}
          <span className="ds-flex ds-items-center ds-text-heading-4 ds-text-black hover:ds-text-accent hover:ds-underline ds-hyphens-auto">
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
      className="ds-self-center"
    >
      <circle cx="8" cy="8" r="8" className="ds-fill-accent" />
    </svg>
  );
};

const UncheckedIcon = ({ variant }: { variant?: RadioButtonProps['variant'] }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="ds-self-center"
    >
      <circle cx="8" cy="8" r="8" className="ds-fill-white" />
      {variant === 'bordered' && <circle cx="8" cy="8" r="7" className="ds-stroke-accent" />}
    </svg>
  );
};
