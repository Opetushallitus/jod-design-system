import React from 'react';
import { cx } from '../../cva';

type LabelProp =
  | {
      /** Text for the component */
      label: React.ReactNode;
      ariaLabel?: never;
    }
  | {
      label?: never;
      /** Aria label for the component */
      ariaLabel: string;
    };

export type CheckboxProps = {
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
  /** Additional class name for the component */
  className?: string;
  /** Component variant */
  variant?: 'default' | 'bordered';
} & LabelProp;

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
    'ds:border ds:border-accent': variant === 'bordered',
    'ds:border ds:border-border-gray ': variant === 'bordered' && disabled,
    'ds:border-0': variant === 'default',
    'ds:bg-bg-gray-2': disabled,
  };

  return (
    <div className={cx('ds:flex ds:items-center ds:text-left ds:relative', className)}>
      <input
        type="checkbox"
        id={label ? id : undefined}
        name={name}
        disabled={disabled}
        value={value}
        checked={checked}
        onChange={onChange}
        aria-label={label ? undefined : ariaLabel}
        className={cx('ds:peer ds:size-5 ds:min-h-5 ds:min-w-5 ds:appearance-none ds:rounded-none ds:bg-white', {
          ...borderVariantClassnames,
        })}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="ds:pointer-events-none ds:absolute ds:hidden ds:fill-accent ds:peer-checked:block"
      >
        <rect x="0" y="0" width="16" height="16" />
      </svg>
      {label && (
        <label
          htmlFor={id}
          className={`ds:flex ds:flex-row ds:items-center ds:text-heading-4 ds:text-black ds:peer-hover:text-accent ds:peer-hover:underline ds:peer-disabled:text-inactive-gray ds:peer-disabled:no-underline ${!isLabelValidElement ? 'ds:pl-4' : ''}`.trim()}
        >
          {label}
        </label>
      )}
    </div>
  );
};
