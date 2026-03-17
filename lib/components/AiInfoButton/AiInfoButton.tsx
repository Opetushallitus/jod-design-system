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
  const portalRootRef = React.useRef<HTMLDivElement | null>(null);
  const [portalRoot, setPortalRoot] = React.useState<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (portalRootRef.current) {
      setPortalRoot(portalRootRef.current);
    }
  }, []);
  const triggerId = React.useId();
  const contentId = React.useId();
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  if (!tooltipContent) {
    return <JodAiGradient className={cx('ds:text-secondary-gray', className)} aria-label={ariaLabel} size={size} />;
  }

  return (
    <Tooltip initialOpen={false} placement={placement}>
      <TooltipTrigger
        id={triggerId}
        ref={triggerRef}
        aria-controls={contentId}
        ariaLabel={ariaLabel}
        testId={testId}
        onClick={handleClick}
      >
        <JodAiGradient className={cx('ds:text-secondary-gray', className)} aria-label={ariaLabel} size={size} />
      </TooltipTrigger>

      <div ref={portalRootRef} />
      <TooltipContent
        id={contentId}
        aria-hidden="false"
        role="region"
        aria-labelledby={triggerId}
        className="ds:z-51 ds:text-white ds:p-4 ds:rounded ds:bg-primary-gray ds:font-arial ds:text-left"
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            triggerRef.current?.focus();
          }
        }}
        portalRoot={portalRoot}
      >
        {tooltipContent}
      </TooltipContent>
    </Tooltip>
  );
};
