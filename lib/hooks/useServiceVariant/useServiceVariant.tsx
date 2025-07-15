import React from 'react';
import { ServiceVariantContext } from './ServiceVariantContext';

export const useServiceVariant = () => {
  const context = React.useContext(ServiceVariantContext);
  if (context === undefined) {
    throw new Error('useServiceVariant must be used within a ServiceVariantProvider');
  }
  return context;
};
