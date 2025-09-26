import React, { JSX } from 'react';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { JodCaretDown, JodCaretUp, JodLanguage } from '../../icons';
import { LanguageMenu } from './LanguageMenu';
import { LangCode, LanguageMenuProps, LanguageTranslations } from './types';

interface LanguageButtonProps extends LanguageMenuProps {
  langMenuOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement | null>;
  onMenuBlur: (event: React.FocusEvent<HTMLDivElement>) => void;
  onMenuClick: () => void;
}

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
  onClick,
  langMenuOpen,
  menuRef,
  onMenuBlur,
  onMenuClick,
  language,
  supportedLanguageCodes,
  generateLocalizedPath,
  LinkComponent,
  translations,
}: LanguageButtonProps) => {
  const { sm } = useMediaQueries();
  const carets = sm ? <>{langMenuOpen ? <JodCaretUp size={20} /> : <JodCaretDown size={20} />}</> : null;

  return (
    <div className="ds:relative" data-testid="language-button">
      <button
        onClick={onClick}
        className="ds:flex ds:flex-col ds:sm:flex-row ds:justify-center ds:items-center ds:select-none ds:cursor-pointer ds:sm:mr-5"
        data-testid="language-button-trigger"
      >
        <JodLanguage className="mx-auto" />
        <span className="ds:whitespace-nowrap ds:text-[12px] ds:sm:text-button-sm ds:sm:mx-3">
          {translations[language].label}
          {getLanguageOrder(language, translations)}
        </span>
        {carets}
      </button>
      {langMenuOpen && (
        <div
          ref={menuRef}
          onBlur={onMenuBlur}
          className="ds:z-60 ds:absolute ds:right-0 ds:translate-y-8"
          data-testid="language-menu"
        >
          <LanguageMenu
            supportedLanguageCodes={supportedLanguageCodes}
            language={language}
            generateLocalizedPath={generateLocalizedPath}
            LinkComponent={LinkComponent}
            onClick={onMenuClick}
            translations={translations}
          />
        </div>
      )}
    </div>
  );
};
