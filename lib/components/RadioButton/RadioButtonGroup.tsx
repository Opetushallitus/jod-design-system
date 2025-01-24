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
}

/** Radio buttons allow users to select a single option from a list of mutually exclusive options. All possible options are exposed up front for users to compare. */
export const RadioButtonGroup = ({
  label,
  hideLabel = false,
  value,
  onChange,
  children,
  className,
}: RadioButtonGroupProps) => {
  return (
    <RadioGroup
      value={value}
      onChange={onChange}
      className={`${className ? className : ''} ds:flex ds:flex-col ds:space-y-2`.trim()}
    >
      <Label
        className={`ds:mb-5 ds:text-body-xs ds:font-arial ds:text-secondary-gray ${hideLabel ? 'ds:hidden' : ''}`.trim()}
      >
        {label}
      </Label>
      {children}
    </RadioGroup>
  );
};
