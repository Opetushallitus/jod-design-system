import React from 'react';
import { useTooltip } from './utils';

// Separate file for TooltipContext to avoid ESLint "Fast refresh" error
type ContextType = ReturnType<typeof useTooltip> | null;
export const TooltipContext = React.createContext<ContextType>(null);
