import type { Placement } from '@floating-ui/react';
import React from 'react';
import { TooltipContext } from './TooltipContext';
import { useTooltip } from './utils';

export interface TooltipOptions {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  clickToToggle?: boolean;
}

export interface TooltipProps extends TooltipOptions {
  children?: React.ReactNode;
}

/** Tooltips show contextual help or information about specific components when a user hovers or focuses on them. */
export const Tooltip = ({ children, ...options }: Readonly<TooltipProps>) => {
  const tooltip = useTooltip(options);
  return <TooltipContext.Provider value={tooltip}>{children}</TooltipContext.Provider>;
};
