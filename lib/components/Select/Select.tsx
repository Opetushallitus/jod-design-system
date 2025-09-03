import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import React from 'react';
import { JodCaretDown, JodCaretUp } from '../../icons';
import { tidyClasses as tc } from '../../utils';

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
  dataTestId?: string;
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
  dataTestId,
}: SelectProps<T, U>) => {
  const inputId = React.useId();

  const [value, setValue] = React.useState<U | undefined>(selected);

  const onChange = (newValue: U) => {
    setValue(newValue);
    propOnChange?.(newValue);
  };

  React.useEffect(() => {
    setValue(selected);
  }, [selected]);

  const selectedOption = options.find((option) => (option.value as U) === value);

  return (
    <div className={tc(['ds:flex ds:flex-col ds:relative', className])} data-testid={dataTestId}>
      {!hideLabel && (
        <label htmlFor={inputId} className="ds:text-primary-gray ds:text-form-label ds:font-arial ds:mb-4">
          {label}
        </label>
      )}
      <div className="ds:flex ds:flex-row ds:relative">
        <Listbox onChange={onChange} disabled={disabled} value={value}>
          {({ open }) => (
            <div className="ds:flex ds:flex-row ds:w-full">
              <ListboxButton
                aria-label={label}
                className="ds:select-none ds:rounded ds:border ds:w-full ds:border-border-gray ds:bg-white ds:p-5 ds:text-primary-gray ds:disabled:text-inactive-gray ds:flex ds:justify-between ds:items-center"
                disabled={disabled}
                data-testid={dataTestId ? `${dataTestId}-button` : undefined}
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
                data-testid={dataTestId ? `${dataTestId}-options` : undefined}
              >
                {options.map((option) => (
                  <ListboxOption
                    key={option.value}
                    className="ds:py-3 ds:text-heading-4 ds:ml-5 ds:text-primary-gray ds:cursor-pointer ds:data-focus:underline ds:data-focus:text-accent ds:hover:underline ds:hover:text-accent"
                    value={option.value}
                  >
                    {option.label}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          )}
        </Listbox>
      </div>
    </div>
  );
};
