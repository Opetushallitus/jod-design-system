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
import { CheckedIcon } from '../internal/CheckedIcon/CheckedIcon';
import { InputError } from '../internal/InputError/InputError';
import { InputHelp } from '../internal/InputHelp/InputHelp';
import { InputLabel } from '../internal/InputLabel/InputLabel';
import { UncheckedIcon } from '../internal/UncheckedIcon.tsx/UncheckedIcon';

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

const highlightMatch = (text: string, query: string) => {
  if (!query) return <>{text}</>;

  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return <>{text}</>;

  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);

  return (
    <div>
      {before}
      <span className="ds:underline">{match}</span>
      {after}
    </div>
  );
};

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
  const [value, setValue] = React.useState<U | undefined>(selected);
  const [isUsingMouse, setIsUsingMouse] = React.useState(false);

  const onChange = (newValue: U | null) => {
    setValue(newValue ?? undefined);
    propOnChange?.(newValue);
  };

  React.useEffect(() => {
    setValue(selected);
  }, [selected]);

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
          return option.label.toLowerCase().includes(query.toLowerCase());
        });

  const selectedOption = options.find((option) => (option.value as U) === value);

  return (
    <div className={tc(['ds:flex ds:flex-col ds:relative ds:sm:max-w-input-medium', className])} data-testid={testId}>
      <InputLabel htmlFor={inputId} hideLabel={hideLabel} labelText={labelText} />
      <div className="ds:flex ds:flex-row ds:relative">
        <HeadlessCombobox
          defaultValue={defaultValue ?? (options[0]?.value as U)}
          onChange={onChange}
          disabled={disabled}
          value={value}
        >
          {({ open }) => (
            <div className="ds:flex ds:flex-row ds:w-full ds:focus-within:outline-2 ds:focus-within:outline-secondary-1-dark ds:focus-within:rounded-md">
              <ComboboxInput
                id={inputId}
                required={!!requiredText}
                aria-required={!!requiredText}
                aria-label={hideLabel ? label : undefined}
                displayValue={(value: U) => options.find((option) => option.value === value)?.label ?? ''}
                className="ds:font-arial ds:w-full ds:rounded-l-md ds:border-y-2 ds:border-l-2 ds:border-border-form ds:bg-white ds:px-5 ds:py-3 ds:text-primary-gray ds:outline-hidden ds:placeholder:text-inactive-gray ds:disabled:text-inactive-gray ds:disabled:pointer-events-none"
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`(${placeholder})`}
                data-testid={testId ? `${testId}-input` : undefined}
                aria-invalid={!!errorMessage}
                onClick={() => setIsUsingMouse(true)}
                onKeyDown={(e) => e.key.startsWith('Arrow') && setIsUsingMouse(false)}
                onMouseMove={() => setIsUsingMouse(true)}
              />
              <ComboboxButton
                aria-label={label}
                className="ds:select-none ds:rounded-r-md ds:border-y-2 ds:border-r-2 ds:border-border-form ds:bg-white ds:px-5 ds:py-3 ds:text-primary-gray ds:disabled:text-inactive-gray"
                disabled={disabled}
                data-testid={testId ? `${testId}-button` : undefined}
                onClick={() => setIsUsingMouse(true)}
                onKeyDown={() => setIsUsingMouse(false)}
                onMouseMove={() => setIsUsingMouse(true)}
              >
                {open ? <JodCaretUp size={24} /> : <JodCaretDown size={24} />}
              </ComboboxButton>
              <ComboboxOptions
                className="ds:bg-white ds:mt-3 ds:absolute ds:w-full ds:top-full ds:p-5 ds:m-0 ds:shadow-border ds:rounded-md ds:z-50 ds:empty:invisible"
                data-testid={testId ? `${testId}-options` : undefined}
                onKeyDown={() => setIsUsingMouse(false)}
                onMouseMove={() => setIsUsingMouse(true)}
              >
                {filteredOptions.map((option) => (
                  <ComboboxOption
                    key={option.value}
                    className="ds:group ds:text-heading-4 ds:text-primary-gray ds:cursor-pointer"
                    value={option.value}
                  >
                    <div
                      className={tc([
                        'ds:flex ds:py-3 ds:gap-3 ds:px-3 ds:group-hover:rounded ds:group-hover:bg-secondary-5-light-3',
                        isUsingMouse
                          ? ''
                          : 'ds:group-data-focus:outline-2 ds:group-data-focus:outline-black ds:group-data-focus:group-hover:outline-none ds:group-data-focus:group-hover:rounded',
                      ])}
                    >
                      {selectedOption === option ? (
                        <CheckedIcon disabled={disabled} />
                      ) : (
                        <UncheckedIcon disabled={disabled} />
                      )}
                      {highlightMatch(option.label, query)}
                    </div>
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
