import React from 'react';
import { Label, RadioGroup } from '@headlessui/react';

export interface RadioButtonGroupProps {
  /** Text for the component */
  label: string;
  /** Value that is currently selected */
  value: string;
  /** Callback function when the value changes */
  onChange: (newValue: string) => void;
  /** Use RadioButton components as children */
  children: React.ReactNode;
  /** CSS classes for custom styles */
  className?: string;
}

export const RadioButtonGroup = ({ label, value, onChange, children, className }: RadioButtonGroupProps) => {
  return (
    <RadioGroup
      value={value}
      onChange={onChange}
      className={`${className ? className : ''} flex flex-col space-y-2`.trim()}
    >
      <Label className="mb-5 text-body-xs text-secondary-gray">{label}</Label>
      {children}
    </RadioGroup>
  );
};
