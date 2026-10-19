import React from 'react';

import { useMediaQueries } from '../../hooks/useMediaQueries';
import { JodSearch } from '../../icons';
import { tidyClasses as tc } from '../../utils';
import { Spinner } from '../Spinner/Spinner';

export interface ServiceBarSearchProps {
  /** Whether the search input is expanded on mobile. On sm and up the input is always shown */
  expanded: boolean;
  /** Callback fired when the search input should be expanded or collapsed on mobile */
  onExpandedChange: (expanded: boolean) => void;
  /** Callback fired when the search form is submitted */
  onSubmit: (value: string) => void;
  /** The placeholder text to display in the input field */
  placeholder: string;
  /** Accessible label for the input field */
  ariaLabel: string;
  /** Text shown on the search button */
  searchLabel: string;
  /** The maximum number of characters that can be entered into the input field */
  maxLength?: number;
  /** Test id for querying in tests */
  testId?: string;
}

const SEARCH_RESET_DELAY_MS = 300;

/** Compact search for the service bar of the navigation bar. On mobile it collapses into a toggle button. */
export const ServiceBarSearch = ({
  expanded,
  onExpandedChange,
  onSubmit,
  placeholder,
  ariaLabel,
  searchLabel,
  maxLength = 400,
  testId,
}: ServiceBarSearchProps) => {
  const [value, setValue] = React.useState('');
  const [isSearching, setIsSearching] = React.useState(false);
  const { sm } = useMediaQueries();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const resetTimeoutRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  const getTestId = (suffix: string) => (testId ? `${testId}-${suffix}` : undefined);
  const showInput = sm || expanded;

  React.useEffect(() => {
    if (expanded && !sm) {
      inputRef.current?.focus();
    }
  }, [expanded, sm]);

  React.useEffect(() => () => clearTimeout(resetTimeoutRef.current), []);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSearching) return;
    setIsSearching(true);
    onSubmit(value);
    resetTimeoutRef.current = setTimeout(() => {
      setValue('');
      setIsSearching(false);
      onExpandedChange(false);
    }, SEARCH_RESET_DELAY_MS);
  };

  const focusOutline =
    'ds:focus-visible:outline-2 ds:focus-visible:outline-solid ds:focus-visible:outline-offset-0 ds:focus-visible:outline-black';
  const buttonClassName = tc([
    'ds:flex ds:h-7 ds:cursor-pointer ds:items-center ds:gap-3 ds:bg-white ds:px-4 ds:text-button-md ds:text-secondary-gray ds:select-none',
    focusOutline,
  ]);

  return (
    <div className="ds:mb-2 ds:print:hidden" data-testid={testId}>
      {showInput ? (
        <form
          className="ds:flex ds:items-center ds:justify-end ds:gap-2"
          onSubmit={handleSubmit}
          data-testid={getTestId('form')}
        >
          <div data-testid={getTestId('input-wrapper')}>
            <input
              ref={inputRef}
              type="text"
              role="searchbox"
              maxLength={maxLength}
              value={value}
              onChange={(e) => {
                if (!isSearching) setValue(e.target.value);
              }}
              placeholder={placeholder}
              autoComplete="off"
              aria-label={ariaLabel}
              className={tc([
                'ds:h-7 ds:w-[250px] ds:border-2 ds:border-white ds:bg-white ds:px-4 ds:py-4 ds:font-arial ds:text-body-md ds:text-primary-gray ds:placeholder:text-inactive-gray',
                focusOutline,
              ])}
              data-testid={getTestId('input')}
            />
          </div>
          <button type="submit" className={buttonClassName} data-testid={getTestId('submit')}>
            {isSearching ? <Spinner size={24} color="accent" /> : <JodSearch />}
            <span>{searchLabel}</span>
          </button>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => onExpandedChange(!expanded)}
          className={buttonClassName}
          data-testid={getTestId('toggle')}
        >
          <JodSearch />
          <span>{searchLabel}</span>
        </button>
      )}
    </div>
  );
};
