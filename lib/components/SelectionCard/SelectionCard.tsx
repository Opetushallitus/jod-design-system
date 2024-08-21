import React from 'react';
import { useMediaQueries } from '../../main';
import { Tooltip } from '../Tooltip/Tooltip';
import { TooltipContent } from '../Tooltip/TooltipContent';
import { TooltipTrigger } from '../Tooltip/TooltipTrigger';

export interface SelectionCardProps {
  /** Card label */
  label: string;
  /** Icon content */
  icon?: React.ReactNode;
  /** Show the selection checkmark */
  selected?: boolean;
  /** Callback when the card is clicked */
  onClick?: () => void;
  /** Callback when the card is hovered/exited or focused/blurred */
  setHovered?: (visible: boolean) => void;
  /** Tooltip content that's displayed when the info button is pressed (mobile only) */
  tooltipContent?: React.ReactNode;
  /** Aria label for the info button */
  infoAriaLabel: string;
}

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
    <circle cx="20.9126" cy="20.074" r="16" fill="#00C181" />
    <path
      d="M18.5794 27.7406L30.3294 15.9906L27.9961 13.6572L18.5794 23.0739L13.8294 18.3239L11.4961 20.6572L18.5794 27.7406Z"
      fill="white"
    />
  </svg>
);

/** Cards group information into flexible containers that allow users to browse a collection of related items and actions. */
export const SelectionCard = ({
  label,
  icon,
  selected,
  onClick,
  setHovered: setInfoVisible,
  tooltipContent,
  infoAriaLabel,
}: SelectionCardProps) => {
  const { sm } = useMediaQueries();
  const [tooltipOpen, setTooltipOpen] = React.useState(false);

  const toggleTooltip = () => {
    setTooltipOpen(!tooltipOpen);
  };

  const activateInfo = () => {
    setInfoVisible?.(true);
  };
  const deactivateInfo = () => {
    setInfoVisible?.(false);
  };

  return sm ? (
    <button
      type="button"
      className="ds-w-[166px] ds-min-h-[250px] ds-rounded-md ds-p-5 hover:ds-bg-secondary-1-25 ds-flex ds-flex-col ds-items-center"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={label}
      onPointerEnter={activateInfo}
      onPointerLeave={deactivateInfo}
      onFocus={activateInfo}
      onBlur={deactivateInfo}
    >
      <span
        className="ds-w-full ds-aspect-square ds-rounded-full ds-bg-white ds-flex ds-items-center ds-justify-center ds-relative"
        aria-hidden
      >
        <span className="ds-absolute ds-right-0 ds-top-0">{selected ? <CheckIcon /> : null}</span>
        {icon ?? null}
      </span>
      <span className="ds-block ds-p-5 ds-pb-0 ds-text-center">
        <span className="ds-text-heading-4">{label ?? ''}</span>
      </span>
    </button>
  ) : (
    <div className="ds-min-h-[93px] ds-min-w-[280px] ds-rounded-md ds-bg-bg-gray-2 hover:ds-bg-secondary-1-25 ds-flex ds-flex-row">
      <button
        type="button"
        className="ds-flex ds-items-center ds-relative ds-w-full ds-p-3 ds-pr-0"
        onClick={onClick}
        aria-pressed={selected}
        aria-label={label}
      >
        <span className="ds-absolute ds-left-0 ds-top-0 -ds-m-3" aria-hidden>
          {selected ? <CheckIcon /> : null}
        </span>
        <span
          className="ds-h-[93px] ds-aspect-square ds-rounded-full ds-bg-white ds-flex ds-items-center ds-justify-center"
          aria-hidden
        >
          <span className="ds-transform ds-scale-75">{icon ?? null}</span>
        </span>
        <span className="ds-ml-5 ds-text-start ds-pr-4">
          <span className="ds-text-heading-4">{label ?? ''}</span>
        </span>
      </button>
      {tooltipContent && React.isValidElement(tooltipContent) && (
        <Tooltip open={tooltipOpen} placement="bottom-start">
          <TooltipTrigger
            className="ds-ml-auto ds-p-5 ds-border-l ds-border-border-gray"
            aria-label={infoAriaLabel ?? ''}
            onClick={(e) => {
              e?.preventDefault?.();
              e?.stopPropagation?.();
              toggleTooltip();
            }}
          >
            <span
              className="ds-ml-auto ds-p-3 material-symbols-outlined size-24 sm:ds-size-32 ds-select-none"
              aria-hidden
            >
              info
            </span>
          </TooltipTrigger>
          <TooltipContent className="ds-bg-black ds-text-white ds-rounded-xl ds-p-5 ds-z-50 ds-text-body-sm sm:ds-text-body-md ds-font-arial">
            {tooltipContent}
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};
