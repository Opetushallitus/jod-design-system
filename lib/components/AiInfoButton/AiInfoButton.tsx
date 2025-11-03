import type { Placement } from '@floating-ui/react';
import React from 'react';
import { JodAi } from '../../icons';
import { Tooltip } from '../Tooltip/Tooltip';
import { TooltipContent } from '../Tooltip/TooltipContent';
import { TooltipTrigger } from '../Tooltip/TooltipTrigger';

interface AiInfoButtonProps {
  size?: number;
  tooltipContent?: React.ReactNode;
  ariaLabel?: string;
  testId?: string;
  placement?: Placement;
}

export const AiInfoButton = ({
  size = 24,
  tooltipContent,
  ariaLabel,
  testId,
  placement = 'bottom-start',
}: AiInfoButtonProps) => {
  const [open, setOpen] = React.useState(false);

  return tooltipContent ? (
    <Tooltip open={open} onOpenChange={setOpen} placement={placement}>
      <TooltipTrigger onClick={() => setOpen((v) => !v)} aria-label={ariaLabel} testId={testId} open={open}>
        <JodAi className="ds:text-secondary-gray ds:mb-2" aria-label={ariaLabel} size={size} />
      </TooltipTrigger>
      <TooltipContent
        className="ds:text-white ds:p-4 ds:rounded ds:bg-primary-gray ds:font-arial"
        arrowClassName="ds:fill-primary-gray"
      >
        {tooltipContent}
      </TooltipContent>
    </Tooltip>
  ) : (
    <JodAi className="ds:text-secondary-gray" aria-label={ariaLabel} size={size} />
  );
};
