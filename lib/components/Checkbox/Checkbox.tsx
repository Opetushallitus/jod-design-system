import React from 'react';
import { cx } from '../../cva';

export interface CheckboxProps {
  /** Name for the component */
  name: string;
  /** Disabled state for the component */
  disabled?: boolean;
  /** Value for the component */
  value: string;
  /** Checked state for the component */
  checked: boolean;
  /** Change event for the component */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Text for the component */
  label?: React.ReactNode;
  /** Aria label for the component */
  ariaLabel: string;
  /** Additional class name for the component */
  className?: string;
}

/**
 * Checkboxes allow users to select multiple items from a list of individual items, or to mark one individual item as selected.
 */
export const Checkbox = ({ name, disabled, value, checked, onChange, label, ariaLabel, className }: CheckboxProps) => {
  const id = React.useId();
  const isLabelValidElement = React.isValidElement(label);

  return (
    <div className={cx('flex items-center text-left', className)}>
      <input
        type="checkbox"
        id={label ? id : undefined}
        name={name}
        disabled={disabled}
        value={value}
        checked={checked}
        onChange={onChange}
        aria-label={label ? undefined : ariaLabel}
        className="peer relative size-5 min-h-5 min-w-5 appearance-none rounded-none bg-white"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="pointer-events-none absolute hidden fill-accent peer-checked:block"
      >
        <rect x="0" y="0" width="16" height="16" />
      </svg>
      {label && (
        <label
          htmlFor={id}
          className={`font-poppins flex flex-row items-center text-button-md text-black peer-hover:text-accent peer-hover:underline peer-disabled:text-inactive-gray peer-disabled:no-underline ${!isLabelValidElement ? 'pl-4' : ''}`.trim()}
        >
          {label}
        </label>
      )}
    </div>
  );
};
