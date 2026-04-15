import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { useCookieConsent } from './CookieConsentContext';

export const CookieConsentModal = () => {
  const {
    consent,
    isOpen,
    save,
    serviceVariant,
    languageButtonComponent,
    translations: {
      modal: {
        name,
        title,
        description,
        cookieCategoriesLabel,
        cookiesCategoriesNecessary,
        cookiesCategoriesThirdParty,
        statisticsDescription,
        readMoreLabel,
        readMoreHref,
        currentSelectionLabel,
        acceptAllLabel,
        declineOptionalLabel,
      },
    },
  } = useCookieConsent();

  const handleAcceptAll = () => {
    save({
      thirdPartyContent: true,
    });
  };

  const handleDeclineOptional = () => {
    save({
      thirdPartyContent: false,
    });
  };

  return (
    <Modal
      name={name}
      open={isOpen}
      fullWidthContent
      topSlot={
        <div className="ds:flex ds:justify-between ds:items-center ds:gap-5 ds:flex-1">
          <h2 className="ds:text-heading-2-mobile ds:sm:text-hero">{title}</h2>
          {languageButtonComponent}
        </div>
      }
      content={
        <div className="ds:px-5 ds:md:px-9 ds:pb-7">
          <div className="ds:flex ds:flex-col ds:gap-5">
            <p>{description}</p>
            <div>
              <p>{cookieCategoriesLabel}:</p>
              <ul className="ds:list-disc ds:list-inside ds:pl-5">
                <li>{cookiesCategoriesNecessary}</li>
                <li>{cookiesCategoriesThirdParty}</li>
              </ul>
            </div>
            <p>{statisticsDescription}</p>
            <p>
              <a
                href={readMoreHref}
                className="ds:text-accent ds:hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {readMoreLabel}
              </a>
            </p>
            {consent && (
              <p>
                {currentSelectionLabel}:{' '}
                <strong>{consent.thirdPartyContent ? acceptAllLabel : declineOptionalLabel}</strong>
              </p>
            )}
          </div>
        </div>
      }
      footer={
        <div className="ds:flex ds:flex-row ds:gap-5 ds:flex-1 ds:justify-end">
          <Button
            label={declineOptionalLabel}
            onClick={handleDeclineOptional}
            variant="white"
            serviceVariant={serviceVariant}
          />
          <Button label={acceptAllLabel} onClick={handleAcceptAll} variant="white" serviceVariant={serviceVariant} />
        </div>
      }
    />
  );
};
