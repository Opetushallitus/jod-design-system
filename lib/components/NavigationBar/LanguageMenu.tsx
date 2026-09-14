import { LanguageSelectionItem } from '../internal/LanguageSelectionItem/LanguageSelectionItem';
import { PopupList } from '../PopupList/PopupList';
import { langLabels, LanguageMenuProps } from './types';

const ListItems = ({
  serviceVariant,
  onClick,
  language,
  supportedLanguageCodes,
  linkComponent: LinkComponent,
  generateLocalizedPath,
  testId,
}: LanguageMenuProps) => {
  return supportedLanguageCodes.map((lng) => (
    <LanguageSelectionItem
      key={lng}
      label={langLabels[lng] ?? lng}
      value={lng}
      selected={lng === language}
      serviceVariant={serviceVariant}
      linkComponent={LinkComponent}
      linkProps={{ to: generateLocalizedPath(lng), onClick, type: 'button' }}
      testId={testId ? `${testId}-menu-item-${lng}` : undefined}
    />
  ));
};

export const LanguageMenu = ({
  serviceVariant,
  onClick,
  language,
  supportedLanguageCodes,
  generateLocalizedPath,
  linkComponent: LinkComponent,
  translations,
  testId,
}: LanguageMenuProps) => {
  return (
    <div data-testid={testId ? `${testId}-menu-popup` : undefined}>
      <PopupList classNames="ds:gap-2">
        <ListItems
          serviceVariant={serviceVariant}
          onClick={onClick}
          supportedLanguageCodes={supportedLanguageCodes}
          language={language}
          generateLocalizedPath={generateLocalizedPath}
          linkComponent={LinkComponent}
          translations={translations}
          testId={testId}
        />
      </PopupList>
    </div>
  );
};
