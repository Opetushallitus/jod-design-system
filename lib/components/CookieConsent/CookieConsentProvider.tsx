import React from 'react';
import { ServiceVariant } from '../../utils';
import { CookieConsentContext } from './CookieConsentContext';
import { CookieConsentModal } from './CookieConsentModal';
import { COOKIE_CURRENT_VERSION, CookieConsent, readCookieConsent, writeCookieConsent } from './cookieConsentUtils';

const shouldReloadAfterConsentChange = (previousConsent: CookieConsent | null, nextConsent: CookieConsent) => {
  if (!previousConsent) {
    return false;
  }

  return Object.entries(previousConsent).some(
    ([category, allowed]) => allowed && !nextConsent[category as keyof CookieConsent],
  );
};

export interface CookieConsentProviderProps {
  children: React.ReactNode;
  /** Service variant for button colors */
  serviceVariant: ServiceVariant;
  /** Translations for the modal and guard components */
  translations: {
    modal: {
      name: string;
      title: string;
      description: string;
      cookieCategoriesLabel: string;
      cookiesCategoriesNecessary: string;
      cookiesCategoriesThirdParty: string;
      statisticsDescription: string;
      readMoreLabel: string;
      readMoreHref: string;
      hereLabel: string;
      currentSelectionLabel: string;
      acceptAllLabel: string;
      declineOptionalLabel: string;
    };
    guard: {
      title: string;
      description: string;
      buttonLabel: string;
    };
  };
}

/** CookieConsentProvider manages the state of cookie consent and provides it to the rest of the app via context. It also renders the CookieConsentModal, which is shown when the user needs to give or change their consent. */
export const CookieConsentProvider = ({ children, serviceVariant, translations }: CookieConsentProviderProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [consent, setConsent] = React.useState<CookieConsent | null>(null);

  React.useLayoutEffect(() => {
    const data = readCookieConsent();
    if (data) {
      setConsent(data.consent);
    } else {
      setIsOpen(true);
    }
  }, []);

  const open = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const save = React.useCallback(
    (newConsent: CookieConsent) => {
      writeCookieConsent({
        version: COOKIE_CURRENT_VERSION,
        timestamp: Date.now(),
        consent: newConsent,
      });
      setConsent(newConsent);
      setIsOpen(false);

      // If the user has revoked consent for any category that was previously allowed,
      // we need to reload the page to ensure that any content blocked by the previous consent state is properly re-evaluated.
      // This is especially important for third-party scripts that may not react to consent changes in real time.
      if (shouldReloadAfterConsentChange(consent, newConsent)) {
        globalThis.location.reload();
      }
    },
    [consent],
  );

  const providerValue = React.useMemo(
    () => ({ consent, isOpen, open, save, serviceVariant, translations }),
    [consent, isOpen, open, save, serviceVariant, translations],
  );

  return (
    <CookieConsentContext.Provider value={providerValue}>
      <CookieConsentModal />
      {children}
    </CookieConsentContext.Provider>
  );
};
