import React from 'react';
import { vi } from 'vitest';

import { CookieConsentContext } from './CookieConsentContext';
import { CookieConsent } from './cookieConsentUtils';

type CookieConsentContextValue = NonNullable<React.ContextType<typeof CookieConsentContext>>;

export const cookieConsentTranslations: CookieConsentContextValue['translations'] = {
  modal: {
    name: 'Cookie settings',
    title: 'Cookies',
    description: 'Cookie description',
    cookieCategoriesLabel: 'Cookie categories',
    cookiesCategoriesNecessary: 'Necessary cookies',
    cookiesCategoriesThirdParty: 'Third-party content',
    statisticsDescription:
      'We track the number of visitors to the service using Matomo. This does not require separate consent.',
    readMoreLabel: 'Read more here.',
    readMoreHref: '/en/privacy-notice-and-cookies',
    currentSelectionLabel: 'Current selection',
    acceptAllLabel: 'Accept all',
    declineOptionalLabel: 'Decline optional',
  },
  guard: {
    title: 'Blocked content',
    description: 'Please allow cookies to view this content',
    buttonLabel: 'Open cookie settings',
  },
};

export const createCookieConsentContextValue = ({
  consent = null,
  isOpen = true,
  open = vi.fn(),
  save = vi.fn(),
  serviceVariant = 'yksilo',
  languageButtonComponent = <button>Language</button>,
  translations = cookieConsentTranslations,
}: Partial<CookieConsentContextValue> & { consent?: CookieConsent | null } = {}): CookieConsentContextValue => ({
  consent,
  isOpen,
  open,
  save,
  serviceVariant,
  languageButtonComponent,
  translations,
});
