import React from 'react';
import { ServiceVariant } from '../../utils';
import { CookieConsentProviderProps } from './CookieConsentProvider';
import { CookieConsent } from './cookieConsentUtils';

export const CookieConsentContext = React.createContext<{
  consent: CookieConsent | null;
  isOpen: boolean;
  open: () => void;
  save: (consent: CookieConsent) => void;
  serviceVariant: ServiceVariant;
  languageButtonComponent: React.ReactNode;
  translations: CookieConsentProviderProps['translations'];
} | null>(null);

export const useCookieConsent = () => {
  const context = React.useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
};
