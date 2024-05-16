import React, { useId, isValidElement } from 'react';
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
 * This component is a checkbox that can be checked or unchecked.
 */
export const Checkbox = ({ name, disabled, value, checked, onChange, label, ariaLabel, className }: CheckboxProps) => {
  const id = useId();
  const isLabelValidElement = isValidElement(label);

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
        className="peer relative size-6 min-h-6 min-w-6 appearance-none rounded-none border-2 border-primary-gray accent-accent checked:border-accent hover:rounded-none hover:border-accent disabled:border-border-gray"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="pointer-events-none absolute hidden fill-accent peer-checked:block peer-disabled:fill-border-gray"
      >
        <rect x="5" y="5" width="14" height="14" />
      </svg>
      {label && (
        <label
          htmlFor={id}
          className={`flex flex-row items-center text-button-md text-primary-gray peer-hover:text-accent peer-hover:underline peer-disabled:text-border-gray peer-disabled:no-underline ${!isLabelValidElement ? 'pl-4' : ''}`.trim()}
        >
          {label}
        </label>
      )}
    </div>
  );
};
