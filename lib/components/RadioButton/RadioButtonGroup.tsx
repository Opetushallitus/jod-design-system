import React from 'react';
import { RadioGroup } from '@headlessui/react';

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
      <RadioGroup.Label className="text-[#4D5358]">{label}</RadioGroup.Label>
      {children}
    </RadioGroup>
  );
};
