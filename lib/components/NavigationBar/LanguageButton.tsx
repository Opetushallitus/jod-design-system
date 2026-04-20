import React, { JSX } from 'react';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { usePopupMenu } from '../../hooks/usePopupMenu';
import { JodCaretDown, JodCaretUp, JodLanguage } from '../../icons';
import { cx } from '../../main';
import { LanguageMenu } from './LanguageMenu';
import { PopupMenuWrapper } from './PopupMenuWrapper';
import { LangCode, LanguageButtonProps, LanguageTranslations } from './types';

const getLanguageOrder = (current: LangCode, translations: LanguageTranslations): JSX.Element => {
  const orderMap: Record<LangCode, LangCode[]> = {
    fi: ['en', 'sv', 'fi'],
    sv: ['en', 'fi', 'sv'],
    en: ['fi', 'sv', 'en'],
  };
  const ordered = orderMap[current];
  return (
    <div className="ds:sr-only">
      {ordered.map((lang, idx) => (
        <React.Fragment key={lang}>
          <span lang={lang}>{translations[lang].change}</span>
          {idx < ordered.length - 1 && <br />}
        </React.Fragment>
      ))}
    </div>
  );
};

export const LanguageButton = ({
  serviceVariant,
  language,
  supportedLanguageCodes,
  generateLocalizedPath,
  linkComponent: LinkComponent,
  responsive = true,
  translations,
  testId,
}: LanguageButtonProps) => {
  const { md } = useMediaQueries();
  const { isOpen: langMenuOpen, close: closeLanguageMenu, triggerProps, menuProps } = usePopupMenu();
  const carets = md || !responsive ? <>{langMenuOpen ? <JodCaretUp size={20} /> : <JodCaretDown size={20} />}</> : null;

  return (
    <div className="ds:relative" data-testid={testId}>
      <button
        {...triggerProps}
        className={cx(
          'ds:flex ds:flex-col ds:justify-center ds:items-center ds:select-none ds:cursor-pointer ds:gap-y-2 ds:gap-x-3 ds:text-primary-gray',
          (md || !responsive) && 'ds:flex-row',
        )}
        data-testid={testId ? `${testId}-trigger` : undefined}
      >
        <JodLanguage className="mx-auto" />
        <span
          className={cx(
            'ds:whitespace-nowrap ds:font-semibold',
            responsive ? 'ds:md:text-[14px] ds:sm:text-[12px] ds:text-[10px]' : 'ds:text-[14px]',
          )}
        >
          {translations[language].label}
          {getLanguageOrder(language, translations)}
        </span>
        {carets}
      </button>
      {langMenuOpen && (
        <PopupMenuWrapper menuProps={menuProps} testId={testId ? `${testId}-menu` : undefined}>
          <LanguageMenu
            serviceVariant={serviceVariant}
            supportedLanguageCodes={supportedLanguageCodes}
            language={language}
            generateLocalizedPath={generateLocalizedPath}
            linkComponent={LinkComponent}
            onClick={closeLanguageMenu}
            translations={translations}
            testId={testId}
          />
        </PopupMenuWrapper>
      )}
    </div>
  );
};
