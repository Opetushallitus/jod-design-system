import {
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Combobox as HeadlessCombobox,
} from '@headlessui/react';
import React from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

export interface ComboboxOptionsData<T extends string = string> {
  value: T;
  label: string;
}

interface ComboboxProps<T extends ComboboxOptionsData, U extends string = string> {
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
  /** Placeholder text */
  placeholder: string;
}

export const Combobox = <
  U extends string = string,
  T extends ComboboxOptionsData<string> = ComboboxOptionsData<string>,
>({
  label,
  hideLabel = false,
  options,
  defaultValue,
  onChange: propOnChange,
  placeholder,
  selected,
  disabled = false,
}: ComboboxProps<T, U>) => {
  const labelId = React.useId();

  const [query, setQuery] = React.useState('');
  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
          return option.label.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="ds:flex ds:flex-col ds:relative">
      {!hideLabel && (
        <label htmlFor={labelId} className="ds:text-jod-black ds:text-form-label ds:font-arial ds:mb-4">
          {label}
        </label>
      )}
      <div className="ds:flex ds:flex-row relative">
        <HeadlessCombobox
          defaultValue={defaultValue ?? (options[0]?.value as U)}
          onChange={propOnChange}
          disabled={disabled}
          value={selected}
        >
          {({ open }) => (
            <>
              <ComboboxInput
                id={labelId}
                aria-label={hideLabel ? label : undefined}
                displayValue={(value: U) => options.find((option) => option.value === value)?.label ?? ''}
                className="ds:font-arial ds:w-full ds:rounded-l ds:border-y ds:border-l ds:border-border-gray ds:bg-white ds:p-5 ds:text-black ds:outline-hidden ds:placeholder:text-inactive-gray ds:disabled:text-inactive-gray ds:disabled:pointer-events-none"
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`(${placeholder})`}
              />
              <ComboboxButton
                className="ds:select-none ds:rounded-r ds:border-y ds:border-r ds:border-border-gray ds:bg-white ds:p-5 ds:text-secondary-gray ds:disabled:text-inactive-gray"
                disabled={disabled}
              >
                {open ? <MdExpandLess size={24} /> : <MdExpandMore size={24} />}
              </ComboboxButton>
              <ComboboxOptions className="ds:bg-white ds:mt-3 ds:absolute ds:w-full ds:top-full ds:p-5 ds:m-0 ds:shadow-border ds:rounded-md ds:z-50 ds:empty:invisible">
                {filteredOptions.map((option) => (
                  <ComboboxOption
                    key={option.value}
                    className="ds:py-3 ds:text-heading-4 ds:ml-5 ds:text-black ds:cursor-pointer ds:data-focus:underline ds:data-focus:text-accent ds:hover:underline ds:hover:text-accent"
                    value={option.value}
                  >
                    {option.label}
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            </>
          )}
        </HeadlessCombobox>
      </div>
    </div>
  );
};
