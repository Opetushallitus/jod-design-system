import type { ServiceVariant } from '../../../utils';
import { ServiceVariantContext } from './ServiceVariantContext';

interface ServiceVariantProviderProps {
  value: ServiceVariant | undefined;
  children: React.ReactNode;
}

export const ServiceVariantProvider = ({ value, children }: ServiceVariantProviderProps) => (
  <ServiceVariantContext.Provider value={value}>{children}</ServiceVariantContext.Provider>
);
