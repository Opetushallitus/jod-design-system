import { Radio } from '@headlessui/react';
import React from 'react';

export interface RadioButtonProps {
  /** Text for the component */
  label: string;
  /** Value for the component */
  value: string;
  /** CSS classes for custom styles */
  className?: string;
  /** Component variant */
  variant?: 'default' | 'bordered';

  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
}

export const RadioButton = ({
  label,
  value,
  className,
  variant = 'default',
  checkedIcon,
  uncheckedIcon,
}: RadioButtonProps) => {
  const Icon = ({ checked }: { checked: boolean }): React.ReactElement => {
    const iconChecked = React.isValidElement(checkedIcon) ? checkedIcon : <CheckedIcon />;
    const iconUnchecked = React.isValidElement(uncheckedIcon) ? uncheckedIcon : <UncheckedIcon variant={variant} />;

    return checked ? iconChecked : iconUnchecked;
  };

  return (
    <Radio value={value} className={`${className ? className : ''} flex h-7`.trim()}>
      {({ checked }) => (
        <div className="ds:flex-start ds:flex ds:space-x-4">
          <Icon checked={checked} />
          <span className="ds:flex ds:items-center ds:text-heading-4 ds:text-black ds:hover:text-accent ds:hover:underline ds:hyphens-auto">
            {label}
          </span>
        </div>
      )}
    </Radio>
  );
};

const CheckedIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="ds:self-center"
    >
      <circle cx="8" cy="8" r="8" className="ds:fill-accent" />
    </svg>
  );
};

const UncheckedIcon = ({ variant }: { variant?: RadioButtonProps['variant'] }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="ds:self-center"
    >
      <circle cx="8" cy="8" r="8" className="ds:fill-white" />
      {variant === 'bordered' && <circle cx="8" cy="8" r="7" className="ds:stroke-accent" />}
    </svg>
  );
};
