import type { Placement } from '@floating-ui/react';
import React from 'react';
import { JodAiGradient } from '../../icons';
import { cx } from '../../main';
import { Tooltip } from '../Tooltip/Tooltip';
import { TooltipContent } from '../Tooltip/TooltipContent';
import { TooltipTrigger } from '../Tooltip/TooltipTrigger';

interface AiInfoButtonProps {
  size?: number;
  tooltipContent?: React.ReactNode;
  ariaLabel?: string;
  testId?: string;
  placement?: Placement;
  className?: string;
}

export const AiInfoButton = ({
  size = 24,
  tooltipContent,
  ariaLabel,
  testId,
  placement = 'bottom-start',
  className,
}: AiInfoButtonProps) => {
  const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
  };

  return tooltipContent ? (
    <Tooltip initialOpen={false} placement={placement}>
      <TooltipTrigger ariaLabel={ariaLabel} testId={testId} onClick={handleClick}>
        <JodAiGradient className={cx('ds:text-secondary-gray', className)} aria-label={ariaLabel} size={size} />
      </TooltipTrigger>
      <TooltipContent
        className="ds:z-11 ds:text-white ds:p-4 ds:rounded ds:bg-primary-gray ds:font-arial"
        arrowClassName="ds:fill-primary-gray"
        onClick={handleClick}
      >
        {tooltipContent}
      </TooltipContent>
    </Tooltip>
  ) : (
    <JodAiGradient className={cx('ds:text-secondary-gray', className)} aria-label={ariaLabel} size={size} />
  );
};
