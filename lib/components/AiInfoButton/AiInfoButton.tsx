import React from 'react';
import { JodAi } from '../../icons';
import { Tooltip } from '../Tooltip/Tooltip';
import { TooltipContent } from '../Tooltip/TooltipContent';
import { TooltipTrigger } from '../Tooltip/TooltipTrigger';

interface AiInfoButtonProps {
  size?: number;
  tooltipContent?: React.ReactNode;
  ariaLabel?: string;
}

export const AiInfoButton = ({ size = 32, tooltipContent, ariaLabel }: AiInfoButtonProps) => {
  const [open, setOpen] = React.useState(false);

  return tooltipContent ? (
    <Tooltip open={open} onOpenChange={setOpen} placement="bottom-end">
      <TooltipTrigger onClick={() => setOpen((v) => !v)} aria-label={ariaLabel}>
        <JodAi size={size} />
      </TooltipTrigger>
      <TooltipContent
        className="ds:text-white ds:p-6 ds:rounded-xl ds:bg-gradient-to-b ds:from-secondary-4-dark ds:via-[#5359A6] ds:to-[#016DB3]"
        arrowClassName="ds:fill-secondary-4-dark"
      >
        {tooltipContent}
      </TooltipContent>
    </Tooltip>
  ) : (
    <JodAi size={size} />
  );
};
