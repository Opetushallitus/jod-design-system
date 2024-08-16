import React from 'react';

export interface DropdownMenuOptionsData<T extends string = string> {
  value: T;
  label: string;
}

interface DropdownMenuProps<T extends DropdownMenuOptionsData, U extends string = string> {
  /** Label for the component */
  label: string;
  /** Hide label. Still available for screenreaders */
  hideLabel?: boolean;
  /** Options for component */
  options: T[];
  /** Default value to be selected initially */
  defaultValue?: U;
  /** Controlled mode */
  selected?: U;
  /** Callback on selection change */
  onChange?: (value: U) => void;
  /** Component is disabled for user interaction */
  disabled?: boolean;
}

export const DropdownMenu = <
  U extends string = string,
  T extends DropdownMenuOptionsData<string> = DropdownMenuOptionsData<string>,
>({
  label,
  hideLabel = false,
  options,
  defaultValue,
  onChange: propOnChange,
  disabled = false,
}: DropdownMenuProps<T, U>) => {
  const labelId = React.useId();
  return (
    <div className="ds-flex ds-flex-row">
      {!hideLabel && (
        <label htmlFor={labelId} className="ds-text-jod-black ds-mr-2 ds-self-center ds-font-bold">
          {label}
        </label>
      )}
      <select
        disabled={disabled}
        id={hideLabel ? undefined : labelId}
        aria-label={hideLabel ? label : undefined}
        className="hover:ds-bg-purple-100 focus:ds-ring-purple-500 disabled:ds-border-gray-500 disabled:ds-bg-gray-200 disabled:ds-text-gray-500 disabled:hover:ds-bg-gray-200 ds-border-jod-dark ds-bg-jod-white ds-min-w-[120px] ds-justify-self-end ds-rounded-lg ds-border ds-p-2 focus:ds-outline-none focus:ds-ring"
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          if (propOnChange) {
            propOnChange(event.target.value as U);
          }
        }}
        defaultValue={defaultValue}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
