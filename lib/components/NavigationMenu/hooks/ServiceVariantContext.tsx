import React from 'react';
import type { ServiceVariant } from '../../../utils';

// Separate file for context to avoid ESLint "Fast refresh" error
export const ServiceVariantContext = React.createContext<ServiceVariant | undefined>(undefined);
