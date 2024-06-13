import type { Placement } from '@floating-ui/react';
import React from 'react';
import { useTooltip } from './utils';

export interface TooltipOptions {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface TooltipProps extends TooltipOptions {
  children?: React.ReactNode;
}

type ContextType = ReturnType<typeof useTooltip> | null;

export const TooltipContext = React.createContext<ContextType>(null);

export function Tooltip({ children, ...options }: TooltipProps) {
  const tooltip = useTooltip(options);
  return <TooltipContext.Provider value={tooltip}>{children}</TooltipContext.Provider>;
}
