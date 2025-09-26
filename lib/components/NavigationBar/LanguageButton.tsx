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
  dataTestId,
}: LanguageButtonProps) => {
  const { md, sm } = useMediaQueries();
  const carets = md ? <>{langMenuOpen ? <JodCaretUp size={20} /> : <JodCaretDown size={20} />}</> : null;

  const positionClass = sm ? 'ds:absolute ds:right-0' : 'ds:fixed ds:left-4 ds:right-4';

  return (
    <div className="ds:relative" data-testid={dataTestId}>
      <button
        onClick={onClick}
        className="ds:flex ds:flex-col ds:md:flex-row ds:justify-center ds:items-center ds:select-none ds:cursor-pointer ds:gap-y-2 ds:gap-x-3"
        data-testid={dataTestId ? `${dataTestId}-trigger` : undefined}
      >
        <JodLanguage className="mx-auto" />
        <span className="ds:whitespace-nowrap ds:md:text-[14px] ds:sm:text-[12px] ds:text-[10px] ds:font-semibold">
          {translations[language].label}
          {getLanguageOrder(language, translations)}
        </span>
        {carets}
      </button>
      {langMenuOpen && (
        <div
          ref={menuRef}
          onBlur={onMenuBlur}
          className={`ds:z-60 ds:flex ds:justify-center ds:translate-y-8 ${positionClass}`}
          data-testid={dataTestId ? `${dataTestId}-menu` : undefined}
        >
          <LanguageMenu
            supportedLanguageCodes={supportedLanguageCodes}
            language={language}
            generateLocalizedPath={generateLocalizedPath}
            LinkComponent={LinkComponent}
            onClick={onMenuClick}
            translations={translations}
            dataTestId={dataTestId}
          />
        </div>
      )}
    </div>
  );
};
