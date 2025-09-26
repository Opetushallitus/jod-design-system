export type LangCode = 'fi' | 'sv' | 'en';

export const langLabels: Record<LangCode, string> = {
  en: 'In English',
  fi: 'Suomeksi',
  sv: 'På svenska',
};

export type LanguageMenuLinkComponent = React.ComponentType<{
  to: string;
  onClick: () => void;
  type?: string;
  children: React.ReactNode;
  className?: string;
}>;

export interface LanguageMenuProps {
  onClick: () => void;
  /** Current language in use */
  language: LangCode;
  /** Languages that are in use from supported ones  */
  supportedLanguageCodes: LangCode[];
  generateLocalizedPath: (lng: string) => string;
  LinkComponent: LanguageMenuLinkComponent;
  translations: LanguageTranslations;
}

export type LanguageTranslations = Record<LangCode, LanguageMeta>;

export interface LanguageMeta {
  change: string;
  label: string;
}
