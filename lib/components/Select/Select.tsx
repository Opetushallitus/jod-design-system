import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import React from 'react';
import { JodCaretDown, JodCaretUp } from '../../icons';
import { tidyClasses as tc } from '../../utils';
import { CheckedIcon } from '../internal/CheckedIcon/CheckedIcon';
import { InputError } from '../internal/InputError/InputError';
import { InputHelp } from '../internal/InputHelp/InputHelp';
import { InputLabel } from '../internal/InputLabel/InputLabel';
import { UncheckedIcon } from '../internal/UncheckedIcon.tsx/UncheckedIcon';

export interface SelectOptionsData<T extends string = string> {
  value: T;
  label: string;
}

interface SelectProps<T extends SelectOptionsData, U extends string = string> {
  /** Label for the component */
  label: string;
  /** Hide label. Still available for screenreaders */
  hideLabel?: boolean;
  /** Options for component */
  options: T[];
  /** Controlled mode */
  selected?: U;
  /** Callback on selection change */
  onChange?: (value: U) => void;
  /** Component is disabled for user interaction */
  disabled?: boolean;
  /** Placeholder text */
  placeholder: string;
  /** Classname to wrapper **/
  className?: string;
  /** Test id for querying in tests */
  testId?: string;
  /** The help text to display below the input field */
  help?: string;
  /** The error message to display below the input field */
  errorMessage?: string;
}

export const Select = <U extends string = string, T extends SelectOptionsData<string> = SelectOptionsData<string>>({
  label,
  hideLabel = false,
  options,
  onChange: propOnChange,
  placeholder,
  selected,
  disabled = false,
  className = '',
  testId,
  help,
  errorMessage,
}: SelectProps<T, U>) => {
  const inputId = React.useId();
  const helpId = React.useId();
  const errorId = React.useId();

  const [value, setValue] = React.useState<U | undefined>(selected);
  const [isUsingMouse, setIsUsingMouse] = React.useState(false);

  const onChange = (newValue: U) => {
    setValue(newValue);
    propOnChange?.(newValue);
  };

  React.useEffect(() => {
    setValue(selected);
  }, [selected]);

  const selectedOption = options.find((option) => (option.value as U) === value);

  return (
    <div className={tc(['ds:flex ds:flex-col ds:relative', className])} data-testid={testId}>
      <InputLabel htmlFor={inputId} hideLabel={hideLabel} labelText={label} />
      <div className="ds:flex ds:flex-row ds:relative">
        <Listbox onChange={onChange} disabled={disabled} value={value}>
          {({ open }) => (
            <div className="ds:flex ds:flex-row ds:w-full">
              <ListboxButton
                id={inputId}
                aria-label={label}
                className="ds:select-none ds:rounded ds:border-2 ds:w-full ds:border-border-form ds:bg-white ds:p-5 ds:text-primary-gray ds:disabled:text-inactive-gray ds:flex ds:justify-between ds:items-center ds:focus:outline-secondary-1-dark"
                disabled={disabled}
                data-testid={testId ? `${testId}-button` : undefined}
                aria-invalid={!!errorMessage}
                onClick={() => setIsUsingMouse(true)}
                onKeyDown={() => setIsUsingMouse(false)}
                onMouseMove={() => setIsUsingMouse(true)}
              >
                {selectedOption ? (
                  <span className="ds:font-arial">{selectedOption.label}</span>
                ) : (
                  <span className="ds:font-arial ds:text-secondary-gray">{placeholder}</span>
                )}
                {open ? <JodCaretUp size={24} /> : <JodCaretDown size={24} />}
              </ListboxButton>
              <ListboxOptions
                modal={false}
                className="ds:bg-white ds:mt-3 ds:absolute ds:w-full ds:top-full ds:p-5 ds:m-0 ds:shadow-border ds:rounded-md ds:z-50 ds:empty:invisible"
                data-testid={testId ? `${testId}-options` : undefined}
                onKeyDown={() => setIsUsingMouse(false)}
                onMouseMove={() => setIsUsingMouse(true)}
              >
                {options.map((option) => (
                  <ListboxOption
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
                      {option.label}
                    </div>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          )}
        </Listbox>
      </div>
      <InputHelp id={helpId} helpText={help} testId={testId ? `${testId}-help` : undefined} />
      <InputError id={errorId} errorMessage={errorMessage} testId={testId ? `${testId}-error` : undefined} />
    </div>
  );
};
