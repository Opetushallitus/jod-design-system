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
      className="w-[166px] min-h-[250px] rounded-md p-5 hover:bg-secondary-1-25 flex flex-col items-center"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={label}
      onPointerEnter={activateInfo}
      onPointerLeave={deactivateInfo}
      onFocus={activateInfo}
      onBlur={deactivateInfo}
    >
      <span
        className="w-full aspect-square rounded-full bg-white flex items-center justify-center relative"
        aria-hidden
      >
        <span className="absolute right-0 top-0">{selected ? <CheckIcon /> : null}</span>
        {icon ?? null}
      </span>
      <span className="block font-poppins p-5 pb-0 text-center">
        <span className="text-heading-4">{label ?? ''}</span>
      </span>
    </button>
  ) : (
    <div className="min-h-[93px] min-w-[280px] rounded-md bg-bg-gray-2 hover:bg-secondary-1-25 flex flex-row">
      <button
        type="button"
        className="flex items-center relative w-full p-3 pr-0"
        onClick={onClick}
        aria-pressed={selected}
        aria-label={label}
      >
        <span className="absolute left-0 top-0 -m-3" aria-hidden>
          {selected ? <CheckIcon /> : null}
        </span>
        <span className="h-[93px] aspect-square rounded-full bg-white flex items-center justify-center" aria-hidden>
          <span className="transform scale-75">{icon ?? null}</span>
        </span>
        <span className="font-poppins ml-5 text-start pr-4">
          <span className="text-heading-4">{label ?? ''}</span>
        </span>
      </button>
      {tooltipContent && React.isValidElement(tooltipContent) && (
        <Tooltip open={tooltipOpen} placement="bottom-start">
          <TooltipTrigger
            className="ml-auto p-5 border-l border-border-gray"
            aria-label={infoAriaLabel ?? ''}
            onClick={(e) => {
              e?.preventDefault?.();
              e?.stopPropagation?.();
              toggleTooltip();
            }}
          >
            <span className="ml-auto p-3 material-symbols-outlined size-24 sm:size-32 select-none" aria-hidden>
              info
            </span>
          </TooltipTrigger>
          <TooltipContent className="bg-black text-white rounded-xl p-5 z-50 text-body-sm sm:text-body-md">
            {tooltipContent}
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};
