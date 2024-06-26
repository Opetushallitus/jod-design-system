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
    <div className="flex flex-row">
      {!hideLabel && (
        <label htmlFor={labelId} className="text-jod-black mr-2 self-center font-bold">
          {label}
        </label>
      )}
      <select
        disabled={disabled}
        id={hideLabel ? undefined : labelId}
        aria-label={hideLabel ? label : undefined}
        className="hover:bg-purple-100 focus:ring-purple-500 disabled:border-gray-500 disabled:bg-gray-200 disabled:text-gray-500 disabled:hover:bg-gray-200 border-jod-dark bg-jod-white min-w-[120px] justify-self-end rounded-lg border p-2 focus:outline-none focus:ring"
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
