import { ServiceVariant } from '../../utils';

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

export interface LanguageButtonProps {
  /** Service variant */
  serviceVariant: ServiceVariant;
  /** Current language in use */
  language: LangCode;
  /** Languages that are in use from supported ones  */
  supportedLanguageCodes: LangCode[];
  generateLocalizedPath: (lng: string) => string;
  linkComponent: LanguageMenuLinkComponent;
  translations: LanguageTranslations;
  dataTestId?: string;
}

export interface LanguageMenuProps extends LanguageButtonProps {
  onClick: () => void;
}

export type LanguageTranslations = Record<LangCode, LanguageMeta>;

export interface LanguageMeta {
  change: string;
  label: string;
}
