import React from 'react';

import { cx } from '../../cva';
import { JodClose, JodSearch } from '../../icons';
import {
  getAccentBgClassForService,
  getFocusedInputBorderClassForService,
  getFocusOutlineClassForService,
  getPressedBgColorClassForService,
  type ServiceVariant,
  tidyClasses as tc,
} from '../../utils';
import { InputError } from '../internal/InputError/InputError';

export interface SearchBarProps {
  /** The id of the form element */
  id?: string;
  /** The name of the input field */
  name?: string;
  /** The current search value */
  value: string;
  /** Callback fired when the value changes. Also called with an empty string when the clear button is pressed */
  onChange: (value: string) => void;
  /** Callback fired when the search form is submitted */
  onSubmit: (value: string) => void;
  /** The placeholder text to display in the input field */
  placeholder: string;
  /** Accessible label for the input field. Defaults to placeholder */
  ariaLabel?: string;
  /** Text shown on the search button */
  searchLabel: string;
  /** Accessible label for the clear button */
  clearLabel: string;
  /** The maximum number of characters that can be entered into the input field */
  maxLength?: number;
  /** The error message to display below the search bar */
  errorMessage?: string;
  /** Service variant for coloring the search button */
  serviceVariant?: ServiceVariant;
  /** Additional classes to add to the wrapper element */
  className?: string;
  /** Test id for querying in tests */
  testId?: string;
}

/** Search bar with a clear button and a search button. */
export const SearchBar = ({
  id,
  name = 'search',
  value,
  onChange,
  onSubmit,
  placeholder,
  ariaLabel,
  searchLabel,
  clearLabel,
  maxLength = 400,
  errorMessage,
  serviceVariant = 'yksilo',
  className,
  testId,
}: SearchBarProps) => {
  const errorId = React.useId();
  const getTestId = (suffix: string) => (testId ? `${testId}-${suffix}` : undefined);
  const focusOutline = tc([
    'ds:focus-visible:outline-2 ds:focus-visible:outline-solid',
    getFocusOutlineClassForService(serviceVariant),
  ]);

  const isEmpty = value.length === 0;

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <div className={cx('ds:flex ds:flex-col', className)} data-testid={testId}>
      <form id={id} onSubmit={handleSubmit} noValidate data-testid={getTestId('form')}>
        <div
          className={tc([
            'ds:flex ds:h-[42px] ds:w-full ds:items-center ds:gap-3 ds:rounded-md ds:border-2 ds:border-secondary-gray ds:bg-white ds:p-2 ds:text-primary-gray',
            getFocusedInputBorderClassForService(serviceVariant),
          ])}
        >
          <input
            type="text"
            name={name}
            aria-label={ariaLabel ?? placeholder}
            className={tc([
              'ds:-ml-2 ds:h-[38px] ds:min-w-0 ds:grow ds:bg-transparent ds:pl-[14px] ds:font-arial ds:text-body-md ds:outline-hidden ds:placeholder:text-inactive-gray',
            ])}
            placeholder={placeholder}
            maxLength={maxLength}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={!!errorMessage}
            aria-describedby={errorMessage ? errorId : undefined}
            data-testid={getTestId('input')}
          />
          <button
            type="button"
            aria-label={clearLabel}
            className={tc([
              'ds:flex ds:size-[30px] ds:shrink-0 ds:cursor-pointer ds:items-center ds:justify-center ds:rounded-sm ds:bg-bg-gray-2 ds:focus-visible:outline-offset-1 ds:disabled:cursor-not-allowed',
              focusOutline,
            ])}
            onClick={() => onChange('')}
            disabled={isEmpty}
            data-testid={getTestId('clear-button')}
          >
            <JodClose className={isEmpty ? 'ds:text-inactive-gray' : 'ds:text-primary-gray'} />
          </button>
          <button
            type="submit"
            className={tc([
              'ds:flex ds:h-[30px] ds:shrink-0 ds:cursor-pointer ds:items-center ds:gap-2 ds:rounded-sm ds:px-3 ds:text-button-sm ds:leading-none ds:text-white ds:hover:underline ds:focus-visible:outline-offset-1',
              getAccentBgClassForService(serviceVariant),
              getPressedBgColorClassForService(serviceVariant),
              focusOutline,
            ])}
            data-testid={getTestId('submit-button')}
          >
            <JodSearch className="ds:text-white" />
            {searchLabel}
          </button>
        </div>
      </form>
      <InputError id={errorId} errorMessage={errorMessage} testId={getTestId('error')} />
    </div>
  );
};
