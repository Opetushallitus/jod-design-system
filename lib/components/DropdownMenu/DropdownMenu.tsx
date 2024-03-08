import { useId } from 'react';
import classNames from 'classnames';

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
  const labelId = useId();
  return (
    <div className="flex flex-row">
      <label
        htmlFor={labelId}
        className={classNames('mr-2 self-center font-bold text-jod-black', {
          'sr-only': hideLabel,
        })}
      >
        {label}
      </label>
      <select
        disabled={disabled}
        id={labelId}
        className={classNames(
          'min-w-[120px] justify-self-end rounded-lg border border-jod-dark bg-jod-white p-2 hover:bg-purple-100 focus:outline-none focus:ring focus:ring-purple-500',
          {
            'disabled:border-gray-500 disabled:bg-gray-200 disabled:text-gray-500 disabled:hover:bg-gray-200': disabled,
          },
        )}
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
