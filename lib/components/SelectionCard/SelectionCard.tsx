import React from 'react';
import { tidyClasses as tc } from '../../utils';

export interface SelectionCardProps {
  /** Card label */
  label: string;
  /** Icon content */
  icon?: React.ReactNode;
  /** Show the selection checkmark */
  selected?: boolean;
  /** Callback when the card is clicked */
  onClick?: () => void;
  /** Card orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Custom class names for the card container */
  className?: string;
  /** Custom action component appended to the right side. Visible in horizontal mode only */
  actionComponent?: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
    <circle cx="20.9126" cy="20.074" r="16" className="ds:fill-success" />
    <path
      d="M18.5794 27.7406L30.3294 15.9906L27.9961 13.6572L18.5794 23.0739L13.8294 18.3239L11.4961 20.6572L18.5794 27.7406Z"
      fill="white"
    />
  </svg>
);

/** Cards group information into flexible containers that allow users to browse a collection of related items and actions. */
export const SelectionCard = ({
  className,
  icon,
  actionComponent,
  label,
  onBlur,
  onClick,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  orientation = 'vertical',
  selected,
}: SelectionCardProps) => {
  const eventProps = { onClick, onMouseEnter, onMouseLeave, onFocus, onBlur };
  const horizontalCard = (
    <button
      type="button"
      className="ds:cursor-pointer ds:flex ds:grow ds:items-center ds:relative ds:p-3 ds:pr-0"
      aria-pressed={selected}
      aria-label={label}
      {...eventProps}
    >
      <span className="ds:absolute ds:left-0 ds:top-0 ds:-m-3" aria-hidden>
        {selected ? <CheckIcon /> : null}
      </span>
      <span
        className="ds:h-[93px] ds:aspect-square ds:rounded-full ds:bg-white ds:flex ds:items-center ds:justify-center"
        aria-hidden
      >
        <span className="ds:transform ds:scale-75">{icon ?? null}</span>
      </span>
      <span className="ds:ml-5 ds:container ds:text-left ds:pr-4">
        <span className="ds:text-heading-4-mobile">{label ?? ''}</span>
      </span>
    </button>
  );

  const verticalCard = (
    <button
      type="button"
      className={tc(
        `ds:cursor-pointer ds:w-[166px] ds:min-h-[250px] ds:rounded-md ds:p-5 ds:hover:bg-secondary-1-25 ds:flex ds:flex-col ds:items-center ${className ?? ''}`,
      )}
      aria-pressed={selected}
      aria-label={label}
      {...eventProps}
    >
      <span
        className="ds:w-full ds:aspect-square ds:rounded-full ds:bg-white ds:flex ds:items-center ds:justify-center ds:relative"
        aria-hidden
      >
        <span className="ds:absolute ds:right-0 ds:top-0">{selected ? <CheckIcon /> : null}</span>
        {icon ?? null}
      </span>
      <span className="ds:block ds:p-5 ds:pb-0 ds:text-center">
        <span className="ds:text-heading-4">{label ?? ''}</span>
      </span>
    </button>
  );

  return orientation === 'vertical' ? (
    verticalCard
  ) : (
    <div className={tc(`ds:flex ds:flex-row ds:rounded-md ds:hover:bg-secondary-1-25 ${className ?? ''}`)}>
      {horizontalCard}
      {actionComponent ?? null}
    </div>
  );
};
