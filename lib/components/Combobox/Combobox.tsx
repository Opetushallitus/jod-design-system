import {
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Combobox as HeadlessCombobox,
} from '@headlessui/react';
import React from 'react';
import { JodCaretDown, JodCaretUp } from '../../icons';
import { tidyClasses as tc } from '../../utils';
import { InputError } from '../internal/InputError/InputError';
import { InputHelp } from '../internal/InputHelp/InputHelp';
import { InputLabel } from '../internal/InputLabel/InputLabel';

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
  onChange?: (value: U | null) => void;
  /** Component is disabled for user interaction */
  disabled?: boolean;
  /** Placeholder text */
  placeholder: string;
  /** Classname to wrapper **/
  className?: string;
  /** Test id for querying in tests */
  testId?: string;
  /** Showing required text in parentheses, showing after the label */
  requiredText?: string;
  /** The error message to display below the input field */
  errorMessage?: string;
  /** The help text to display below the input field */
  help?: string;
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
  className = '',
  testId,
  requiredText,
  errorMessage,
  help,
}: ComboboxProps<T, U>) => {
  const inputId = React.useId();
  const helpId = React.useId();
  const errorId = React.useId();
  const labelText = requiredText ? `${label} (${requiredText})` : label;

  const [query, setQuery] = React.useState('');
  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
          return option.label.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className={tc(['ds:flex ds:flex-col ds:relative', className])} data-testid={testId}>
      <InputLabel htmlFor={inputId} hideLabel={hideLabel} labelText={labelText} />
      <div className="ds:flex ds:flex-row ds:relative">
        <HeadlessCombobox
          defaultValue={defaultValue ?? (options[0]?.value as U)}
          onChange={propOnChange}
          disabled={disabled}
          value={selected}
        >
          {({ open }) => (
            <div className="ds:flex ds:flex-row ds:w-full">
              <ComboboxInput
                id={inputId}
                required={!!requiredText}
                aria-required={!!requiredText}
                aria-label={hideLabel ? label : undefined}
                displayValue={(value: U) => options.find((option) => option.value === value)?.label ?? ''}
                className="ds:font-arial ds:w-full ds:rounded-l-md ds:border-y ds:border-l ds:border-border-form ds:bg-white ds:p-5 ds:text-primary-gray ds:outline-hidden ds:placeholder:text-inactive-gray ds:disabled:text-inactive-gray ds:disabled:pointer-events-none"
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`(${placeholder})`}
                data-testid={testId ? `${testId}-input` : undefined}
                aria-invalid={!!errorMessage}
              />
              <ComboboxButton
                aria-label={label}
                className="ds:select-none ds:rounded-r-md ds:border-y ds:border-r ds:border-border-form ds:bg-white ds:p-5 ds:text-primary-gray ds:disabled:text-inactive-gray"
                disabled={disabled}
                data-testid={testId ? `${testId}-button` : undefined}
              >
                {open ? <JodCaretUp size={24} /> : <JodCaretDown size={24} />}
              </ComboboxButton>
              <ComboboxOptions
                className="ds:bg-white ds:mt-3 ds:absolute ds:w-full ds:top-full ds:p-5 ds:m-0 ds:shadow-border ds:rounded-md ds:z-50 ds:empty:invisible"
                data-testid={testId ? `${testId}-options` : undefined}
              >
                {filteredOptions.map((option) => (
                  <ComboboxOption
                    key={option.value}
                    className="ds:py-3 ds:text-heading-4 ds:ml-5 ds:text-primary-gray ds:cursor-pointer ds:data-focus:underline ds:data-focus:text-accent ds:hover:underline ds:hover:text-accent"
                    value={option.value}
                  >
                    {option.label}
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            </div>
          )}
        </HeadlessCombobox>
      </div>
      <InputHelp id={helpId} helpText={help} testId={testId ? `${testId}-help` : undefined} />
      <InputError id={errorId} errorMessage={errorMessage} testId={testId ? `${testId}-error` : undefined} />
    </div>
  );
};
