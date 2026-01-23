import React from 'react';
import { JodArrowRight, JodOpenInNew } from '../../icons';
import { HeroCard } from '../../main';
import { LogoRgb } from '../Logo/LogoRgb';
import {
  LogoEuEn,
  LogoEuFi,
  LogoEuSv,
  LogoKehaEn,
  LogoKehaFiSv,
  LogoOkmEn,
  LogoOkmFiSv,
  LogoOphEn,
  LogoOphFiSv,
  LogoTemEn,
  LogoTemFiSv,
} from './logos';

export interface FooterProps {
  ref?: React.Ref<HTMLDivElement>;
  /** Language of the logos */
  language: string;

  /** Cooperation labels for screenreader */
  okmLabel: string;
  temLabel: string;
  ophLabel: string;
  kehaLabel: string;

  /** Cooperation title for logos */
  cooperationTitle: string;
  /** Funding title for logo */
  fundingTitle: string;
  /** Copyright text */
  copyright: string;
  /** Additional class name */
  className?: string;

  /** More info */
  moreInfoTitle: string;
  moreInfoDescription: string;
  moreInfoLinks: {
    href: string;
    label: string;
  }[];
  moreInfoComponent?: React.ComponentType<{ children: React.ReactNode; className: string; to: string }>;

  /** Feedback */
  feedbackTitle: string;
  feedbackContent: string;
  feedbackButtonLabel: string;
  feedbackOnClick: () => void;
  feedbackBgImageClassName: string;
  testId?: string;

  /** Heading level for the footer title, h2 is the default */
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  externalLinkIconAriaLabel: string;
}

/**
 * This component is a footer that displays navigation items, logos, and a copyright.
 */
export const Footer = ({
  language,
  okmLabel,
  temLabel,
  ophLabel,
  kehaLabel,
  cooperationTitle,
  fundingTitle,
  copyright,
  className = '',
  moreInfoTitle,
  moreInfoDescription,
  moreInfoLinks,
  moreInfoComponent: MoreInfoLinkComponent,
  feedbackTitle,
  feedbackContent,
  feedbackButtonLabel,
  feedbackOnClick,
  feedbackBgImageClassName,
  testId,
  ref,
  headingLevel = 'h2',
  externalLinkIconAriaLabel,
}: FooterProps) => {
  const HeadingTag = headingLevel;
  const defaultCooperationLogos = React.useMemo(
    () => [
      <li key="LogoOkmFiSv" className="ds:flex">
        <LogoOkmFiSv className="ds:h-9 ds:max-w-full" aria-label={okmLabel} />
      </li>,
      <li key="LogoTemFiSv" className="ds:flex">
        <LogoTemFiSv className="ds:h-9 ds:max-w-full" aria-label={temLabel} />
      </li>,
      <li key="LogoOphFiSv" className="ds:flex">
        <LogoOphFiSv className="ds:h-9 ds:max-w-full" aria-label={ophLabel} />
      </li>,
      <li key="LogoKehaFiSv" className="ds:flex">
        <LogoKehaFiSv
          className="ds:scale-[125%] ds:origin-left ds:mr-auto ds:-ml-3 ds:h-9 ds:max-w-full"
          aria-label={kehaLabel}
        />
      </li>,
    ],
    [okmLabel, temLabel, ophLabel, kehaLabel],
  );

  const cooperationLogos = React.useMemo(() => {
    switch (language) {
      case 'sv':
        return defaultCooperationLogos;
      case 'en':
        return [
          <li key="LogoOkmEn" className="ds:flex">
            <LogoOkmEn className="ds:h-9 ds:max-w-full" aria-label={okmLabel} />
          </li>,
          <li key="LogoTemEn" className="ds:flex">
            <LogoTemEn className="ds:h-9 ds:max-w-full" aria-label={temLabel} />
          </li>,
          <li key="LogoOphEn" className="ds:flex">
            <LogoOphEn className="ds:h-9 ds:max-w-full" aria-label={ophLabel} />
          </li>,
          <li key="LogoKehaFiSv" className="ds:flex">
            <LogoKehaEn
              className="ds:scale-[125%] ds:origin-left ds:mr-auto ds:-ml-3 ds:h-9 ds:max-w-full"
              aria-label={kehaLabel}
            />
          </li>,
        ];
      default:
        return defaultCooperationLogos;
    }
  }, [language, defaultCooperationLogos, okmLabel, temLabel, ophLabel, kehaLabel]);

  const fundingLogo = React.useMemo(() => {
    switch (language) {
      case 'sv':
        return (
          <div key="LogoEuSv" className="ds:flex">
            <LogoEuSv className="ds:h-9 ds:max-w-full" />
          </div>
        );
      case 'en':
        return (
          <div key="LogoEuEn" className="ds:flex">
            <LogoEuEn className="ds:h-9 ds:max-w-full" />
          </div>
        );
      default:
        return (
          <div key="LogoEuFi" className="ds:flex">
            <LogoEuFi className="ds:h-9 ds:max-w-full" />
          </div>
        );
    }
  }, [language]);

  return (
    <footer
      ref={ref}
      className={`ds:text-body-md-mobile ds:sm:text-body-md ds:print:hidden ${className}`.trim()}
      data-testid={testId}
    >
      <div className={`ds:h-auto ${feedbackBgImageClassName} ds:py-8 ds:sm:max-w-[1440px] ds:mx-auto`}>
        <div className="ds:max-w-[1092px] ds:mx-auto ds:px-5 ds:sm:px-6 ds:xl:px-0">
          <div className="ds:max-w-[716px]">
            <HeroCard
              size="sm"
              backgroundColor="#333"
              content={feedbackContent}
              title={feedbackTitle}
              buttonLabel={feedbackButtonLabel}
              onClick={feedbackOnClick}
            />
          </div>
        </div>
      </div>
      <div className="ds:flex ds:justify-start ds:text-white ds:bg-primary-gray ds:py-6 ds:sm:max-w-[1440px] ds:mx-auto">
        <div className="ds:w-[1092px] ds:mx-auto ds:px-5 ds:sm:px-6 ds:xl:px-0">
          <div className="ds:flex ds:flex-col">
            <HeadingTag className="ds:text-heading-2-mobile ds:sm:text-heading-2 ds:mb-3">{moreInfoTitle}</HeadingTag>
            <p className="ds:text-body-sm-mobile ds:sm:text-body-sm ds:mb-6">{moreInfoDescription}</p>
            <ul className="ds:flex ds:flex-col ds:gap-3 ds:justify-start ds:items-start">
              {moreInfoLinks.map((link) => (
                <li key={link.href}>
                  {MoreInfoLinkComponent ? (
                    <MoreInfoLinkComponent
                      to={link.href}
                      className="ds:flex ds:justify-center ds:gap-4 ds:text-button-md-mobile ds:sm:text-button-md ds:hover:underline"
                    >
                      <span>{link.label}</span>
                      <JodArrowRight />
                    </MoreInfoLinkComponent>
                  ) : (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ds:flex ds:justify-center ds:gap-4 ds:text-button-md-mobile ds:sm:text-button-md ds:hover:underline"
                    >
                      <span>{link.label}</span>
                      <JodOpenInNew ariaLabel={externalLinkIconAriaLabel} />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="ds:bg-white ds:text-primary-gray">
        <div className="ds:pt-9 ds:mx-auto ds:flex ds:flex-col ds:gap-7 ds:sm:max-w-[1090px] ds:px-5">
          <div className="ds:flex ds:justify-start" aria-hidden>
            <LogoRgb language={language} size={37} />
          </div>

          <div className="ds:flex ds:flex-col ds:gap-5">
            <span className="ds:font-arial">{cooperationTitle}</span>
            <ul className="ds:grid ds:grid-cols-1 ds:lg:grid-cols-2 ds:xl:grid-cols-4 ds:gap-6 ds:sm:gap-x-10 ds:items-center">
              {cooperationLogos}
            </ul>
          </div>

          <div className="ds:flex ds:flex-col ds:gap-5 ds:mt-9 ds:xl:mt-0">
            <span className="ds:font-arial">{fundingTitle}</span>
            <div aria-hidden>{fundingLogo}</div>
          </div>

          {copyright && <div className="ds:mt-9 ds:flex ds:justify-end ds:font-poppins ds:text-right">{copyright}</div>}
        </div>
      </div>
    </footer>
  );
};
