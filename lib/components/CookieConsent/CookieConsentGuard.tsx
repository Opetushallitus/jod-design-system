import React from 'react';
import { cx } from '../../cva';
import { Button } from '../../main';
import { useCookieConsent } from './CookieConsentContext';
import { type CookieOptionalCategory } from './cookieConsentUtils';

export interface CookieConsentGuardProps {
  /** Content rendered when consent has been granted */
  children: React.ReactNode;
  /** Cookie categories required for the content to be shown. All must be consented to show the content. */
  categories: CookieOptionalCategory[];
  /** When true, shows a fallback UI when consent has not been granted. Otherwise, renders nothing. */
  fallback?: boolean;
  /** Additional class name for the fallback container, if fallback is enabled */
  fallbackClassName?: string;
}

/** CookieConsentGuard is used to conditionally render content based on the user's cookie consent. If the required consent has not been granted, it can optionally show a fallback UI with a button to open the consent modal. */
export const CookieConsentGuard = ({ children, categories, fallback, fallbackClassName }: CookieConsentGuardProps) => {
  const {
    consent,
    open,
    serviceVariant,
    translations: {
      guard: { title, description, buttonLabel },
    },
  } = useCookieConsent();

  if (consent && categories.every((category) => consent[category])) {
    return <>{children}</>;
  } else if (fallback) {
    return (
      <div
        className={cx(
          'ds:flex ds:flex-col ds:gap-4 ds:bg-accent ds:rounded-lg ds:p-6 ds:text-white',
          fallbackClassName,
        )}
      >
        <h2 className="ds:text-heading-2-mobile ds:sm:text-heading-2">{title}</h2>
        <p className="ds:text-body-lg-mobile ds:sm:text-body-lg">{description}</p>
        <div className="ds:flex ds:justify-end ds:mt-4">
          <Button serviceVariant={serviceVariant} variant="white" label={buttonLabel} onClick={() => open()} />
        </div>
      </div>
    );
  } else {
    return null;
  }
};
