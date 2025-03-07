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
  /** Indeterminate state for the component (takes precedence over checked) */
  indeterminate?: boolean;
  /** Change event for the component */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Text or component used as label for the component */
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
 * Supports three states (requires prop 'indeterminate: true'): checked, unchecked, and indeterminate.
 */
export const Checkbox = ({
  name,
  disabled,
  value,
  checked,
  indeterminate = false,
  onChange,
  label,
  ariaLabel,
  className,
  variant = 'default',
}: CheckboxProps) => {
  const id = React.useId();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isLabelValidElement = React.isValidElement(label);

  React.useEffect(() => {
    // Apply indeterminate property to input element (as it can't be set via HTML attributes)
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const borderVariantClassnames = {
    'ds:border ds:border-accent': variant === 'bordered',
    'ds:border ds:border-border-gray ': variant === 'bordered' && disabled,
    'ds:border-0': variant === 'default',
    'ds:bg-bg-gray-2': disabled,
  };

  return (
    <div className={cx('ds:flex ds:items-center ds:text-left ds:relative', className)}>
      <input
        ref={inputRef}
        type="checkbox"
        id={label ? id : undefined}
        name={name}
        disabled={disabled}
        value={value}
        checked={checked}
        onChange={onChange}
        aria-label={label ? undefined : ariaLabel}
        aria-checked={indeterminate ? 'mixed' : checked}
        className={cx('ds:peer ds:size-5 ds:min-h-5 ds:min-w-5 ds:appearance-none ds:rounded-none ds:bg-white', {
          ...borderVariantClassnames,
        })}
      />
      {/* Checked icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="ds:pointer-events-none ds:absolute ds:hidden ds:text-accent ds:peer-checked:block"
        data-state={indeterminate ? 'hidden' : 'visible'}
        style={{ display: checked && !indeterminate ? 'block' : 'none' }}
      >
        {variant === 'bordered' && (
          <rect x="0" y="0" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" />
        )}
        <path d="M4 8l3 3l5-5" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
      {/* Indeterminate icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="ds:pointer-events-none ds:absolute ds:fill-accent"
        style={{ display: indeterminate ? 'block' : 'none' }}
      >
        <rect x="3" y="7" width="10" height="2" />
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
