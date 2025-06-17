import React from 'react';
import { Tooltip } from '../Tooltip/Tooltip';
import { TooltipContent } from '../Tooltip/TooltipContent';
import { TooltipTrigger } from '../Tooltip/TooltipTrigger';

interface AiInfoButtonProps {
  size?: number;
  tooltipContent?: React.ReactNode;
  ariaLabel?: string;
}

const IconAi = ({ size }: Pick<AiInfoButtonProps, 'size'>) => (
  <div
    className="ds:relative ds:rounded-full ds:bg-gradient-to-b ds:from-secondary-4-dark ds:to-[#5359A6]"
    style={{ width: size, height: size }}
  >
    <span className="ds:absolute ds:top-0 ds:left-0 ds:flex ds:items-center ds:justify-center ds:w-full ds:h-full">
      <svg width="80%" height="80%" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path
            d="M8.62528 16.5006C8.62528 14.5141 9.31621 12.83 10.6981 11.4481C12.08 10.0662 13.7641 9.37528 15.7506 9.37528C13.7641 9.37528 12.08 8.68434 10.6981 7.30247C9.31621 5.9206 8.62528 4.23644 8.62528 2.25C8.62528 4.23644 7.93434 5.9206 6.55247 7.30247C5.1706 8.68434 3.48644 9.37528 1.5 9.37528C3.48644 9.37528 5.1706 10.0662 6.55247 11.4481C7.93434 12.83 8.62528 14.5141 8.62528 16.5006Z"
            fill="white"
          />
          <path
            d="M13.5001 7.50023C13.5001 6.66384 13.791 5.95472 14.3729 5.37288C14.9547 4.79104 15.6638 4.50012 16.5002 4.50012C15.6638 4.50012 14.9547 4.2092 14.3729 3.62735C13.791 3.04551 13.5001 2.3364 13.5001 1.5C13.5001 2.3364 13.2092 3.04551 12.6274 3.62735C12.0455 4.2092 11.3364 4.50012 10.5 4.50012C11.3364 4.50012 12.0455 4.79104 12.6274 5.37288C13.2092 5.95472 13.5001 6.66384 13.5001 7.50023Z"
            fill="white"
          />
        </g>
      </svg>
    </span>
  </div>
);

export const AiInfoButton = ({ size = 24, tooltipContent, ariaLabel }: AiInfoButtonProps) => {
  const [open, setOpen] = React.useState(false);

  return tooltipContent ? (
    <Tooltip open={open} onOpenChange={setOpen} placement="bottom-end">
      <TooltipTrigger onClick={() => setOpen((v) => !v)} aria-label={ariaLabel}>
        <IconAi size={size} />
      </TooltipTrigger>
      <TooltipContent
        className="ds:text-white ds:p-6 ds:rounded-xl ds:bg-gradient-to-b ds:from-secondary-4-dark ds:via-[#5359A6] ds:to-[#016DB3]"
        arrowClassName="ds:fill-secondary-4-dark"
      >
        {tooltipContent}
      </TooltipContent>
    </Tooltip>
  ) : (
    <IconAi size={size} />
  );
};
