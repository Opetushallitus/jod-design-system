import { Radio } from '@headlessui/react';
import { cx } from '../../cva';

export interface RadioButtonProps {
  /** Text for the component */
  label: string;
  /** Value for the component */
  value: string;
  /** CSS classes for custom styles */
  className?: string;
  /** Disabled state for the component */
  disabled?: boolean;
}

export const RadioButton = ({ label, value, className, disabled = false }: RadioButtonProps) => {
  return (
    <Radio value={value} className={`${className ? className : ''} flex h-7`.trim()} disabled={disabled}>
      {({ checked }) => (
        <div className="ds:flex-start ds:flex ds:space-x-4 ds:text-form-label">
          {checked ? <CheckedIcon disabled={disabled} /> : <UncheckedIcon disabled={disabled} />}
          <span
            className={cx(
              'ds:flex ds:items-center ds:text-primary-gray ds:font-arial ds:hover:text-accent ds:hover:underline ds:hyphens-auto ',
              {
                'ds:text-inactive-gray ': disabled,
              },
            )}
          >
            {label}
          </span>
        </div>
      )}
    </Radio>
  );
};

const CheckedIcon = ({ disabled }: { disabled: boolean }) => {
  const color = disabled ? 'ds:fill-inactive-gray' : 'ds:fill-accent';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="ds:self-center"
    >
      <circle cx="8" cy="8" r="8" className={color} />
      <circle cx="8" cy="8" r="6" className="ds:fill-white" />
      <circle cx="8" cy="8" r="4" className={color} />
    </svg>
  );
};

const UncheckedIcon = ({ disabled }: { disabled: boolean }) => {
  const color = disabled ? 'ds:fill-inactive-gray' : 'ds:fill-accent';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="ds:self-center"
    >
      <circle cx="8" cy="8" r="8" className={color} />
      <circle cx="8" cy="8" r="6" className="ds:fill-white" />
    </svg>
  );
};
