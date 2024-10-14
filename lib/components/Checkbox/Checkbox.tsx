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
  /** Component variant */
  variant?: 'default' | 'bordered';
}

/**
 * Checkboxes allow users to select multiple items from a list of individual items, or to mark one individual item as selected.
 */
export const Checkbox = ({
  name,
  disabled,
  value,
  checked,
  onChange,
  label,
  ariaLabel,
  className,
  variant = 'default',
}: CheckboxProps) => {
  const id = React.useId();
  const isLabelValidElement = React.isValidElement(label);

  const borderVariantClassnames = {
    'ds-border ds-border-accent': variant === 'bordered',
    'ds-border ds-border-inactive-gray': variant === 'bordered' && disabled,
    'ds-border-0': variant === 'default',
  };

  return (
    <div className={cx('ds-flex ds-items-center ds-text-left', className)}>
      <input
        type="checkbox"
        id={label ? id : undefined}
        name={name}
        disabled={disabled}
        value={value}
        checked={checked}
        onChange={onChange}
        aria-label={label ? undefined : ariaLabel}
        className={cx(
          'ds-peer ds-relative ds-size-5 ds-min-h-5 ds-min-w-5 ds-appearance-none ds-rounded-none ds-bg-white',
          {
            ...borderVariantClassnames,
          },
        )}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="ds-pointer-events-none ds-absolute ds-hidden ds-fill-accent peer-checked:ds-block"
      >
        <rect x="0" y="0" width="16" height="16" />
      </svg>
      {label && (
        <label
          htmlFor={id}
          className={`ds-flex ds-flex-row ds-items-center ds-text-button-md ds-text-black peer-hover:ds-text-accent peer-hover:ds-underline peer-disabled:ds-text-inactive-gray peer-disabled:ds-no-underline ${!isLabelValidElement ? 'ds-pl-4' : ''}`.trim()}
        >
          {label}
        </label>
      )}
    </div>
  );
};
