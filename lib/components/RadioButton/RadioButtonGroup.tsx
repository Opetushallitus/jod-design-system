import { Label, RadioGroup } from '@headlessui/react';
import React from 'react';

export interface RadioButtonGroupProps {
  /** Text for the component */
  label: string;
  /** Hide label */
  hideLabel?: boolean;
  /** Value that is currently selected */
  value: string;
  /** Callback function when the value changes */
  onChange: (newValue: string) => void;
  /** Use RadioButton components as children */
  children: React.ReactNode;
  /** CSS classes for custom styles */
  className?: string;
  /** Test id for querying in tests */
  dataTestId?: string;
  /** Showing required text in parentheses, showing after the label */
  requiredText?: string;
}

/** Radio buttons allow users to select a single option from a list of mutually exclusive options. All possible options are exposed up front for users to compare. */
export const RadioButtonGroup = ({
  label,
  hideLabel = false,
  value,
  onChange,
  children,
  className,
  dataTestId,
  requiredText,
}: RadioButtonGroupProps) => {
  const labelText = requiredText ? `${label} (${requiredText})` : label;

  return (
    <RadioGroup
      value={value}
      aria-required={!!requiredText}
      onChange={onChange}
      className={`${className ? className : ''} ds:flex ds:flex-col ds:space-y-3`.trim()}
      data-testid={dataTestId}
    >
      <Label
        className={`ds:mb-5 ds:text-heading-3 ds:font-poppins ds:text-primary-gray ${hideLabel ? 'ds:hidden' : ''}`.trim()}
        data-testid={dataTestId ? `${dataTestId}-label` : undefined}
      >
        {labelText}
      </Label>
      {children}
    </RadioGroup>
  );
};
