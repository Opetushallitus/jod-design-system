import React from 'react';
import { JodAi } from '../../icons';
import { Tooltip } from '../Tooltip/Tooltip';
import { TooltipContent } from '../Tooltip/TooltipContent';
import { TooltipTrigger } from '../Tooltip/TooltipTrigger';

interface AiInfoButtonProps {
  size?: number;
  tooltipContent?: React.ReactNode;
  ariaLabel?: string;
  dataTestId?: string;
}

export const AiInfoButton = ({ size = 24, tooltipContent, ariaLabel, dataTestId }: AiInfoButtonProps) => {
  const [open, setOpen] = React.useState(false);

  return tooltipContent ? (
    <Tooltip open={open} onOpenChange={setOpen} placement="bottom-end">
      <TooltipTrigger onClick={() => setOpen((v) => !v)} aria-label={ariaLabel} dataTestId={dataTestId} open={open}>
        <JodAi className="ds:text-secondary-gray" aria-label={ariaLabel} size={size} />
      </TooltipTrigger>
      <TooltipContent
        className="ds:text-white ds:p-4 ds:rounded-xl ds:bg-primary-gray ds:font-arial"
        arrowClassName="ds:fill-primary-gray"
      >
        {tooltipContent}
      </TooltipContent>
    </Tooltip>
  ) : (
    <JodAi className="ds:text-secondary-gray" aria-label={ariaLabel} size={size} />
  );
};
