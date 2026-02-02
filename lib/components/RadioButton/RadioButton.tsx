import { Radio } from '@headlessui/react';
import { cx } from '../../cva';
import { CheckedIcon } from '../internal/CheckedIcon/CheckedIcon';
import { UncheckedIcon } from '../internal/UncheckedIcon.tsx/UncheckedIcon';

export interface RadioButtonProps {
  /** Text for the component */
  label: string;
  /** Value for the component */
  value: string;
  /** CSS classes for custom styles */
  className?: string;
  /** Disabled state for the component */
  disabled?: boolean;
  testId?: string;
}

export const RadioButton = ({ label, value, className, disabled = false, testId }: RadioButtonProps) => {
  return (
    <Radio
      value={value}
      className={`${className ? className : ''} flex h-7`.trim()}
      disabled={disabled}
      data-testid={testId}
    >
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
