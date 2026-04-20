import { JodOpenInNew } from '../../icons';
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
        externalLinkIconAriaLabel,
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
        <div className="ds:flex ds:flex-col-reverse ds:sm:flex-row ds:justify-between ds:gap-6 ds:md:gap-5 ds:flex-1">
          <h2 className="ds:text-heading-2-mobile ds:sm:text-heading-1 ds:text-primary-gray">{title}</h2>
          <div className="ds:md:self-auto ds:self-end">{languageButtonComponent}</div>
        </div>
      }
      content={
        <div className="ds:px-5 ds:md:px-9 ds:pb-7 ds:text-primary-gray">
          <div className="ds:flex ds:flex-col ds:gap-6 ds:sm:gap-5">
            <p className="ds:text-body-lg-mobile ds:sm:text-body-lg ds:mt-3 ds:sm:mt-5">{description}</p>
            <div className="ds:font-arial ds:text-body-md-mobile ds:sm:text-body-md">
              <p>{cookieCategoriesLabel}:</p>
              <ul className="ds:list-disc ds:list-inside ds:pl-5">
                <li>{cookiesCategoriesNecessary}</li>
                <li>{cookiesCategoriesThirdParty}</li>
              </ul>
            </div>
            <div className="ds:font-arial ds:text-body-md-mobile ds:sm:text-body-md">
              <p>{statisticsDescription}</p>
              <p>
                <a
                  href={readMoreHref}
                  className="ds:text-accent ds:hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {readMoreLabel}
                  <div className="ds:inline ds:*:align-top ds:ml-2">
                    <JodOpenInNew size={24} ariaLabel={externalLinkIconAriaLabel} className="ds:inline" />
                  </div>
                </a>
              </p>
            </div>
            {consent && (
              <p className="ds:font-arial ds:text-body-md-mobile ds:sm:text-body-md">
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
