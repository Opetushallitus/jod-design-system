import { JodCircle } from '../../icons';
import { PopupList } from '../PopupList/PopupList';
import { langLabels, LanguageMenuProps } from './types';

const ListItems = ({
  onClick,
  language,
  supportedLanguageCodes,
  LinkComponent,
  generateLocalizedPath,
  dataTestId,
}: LanguageMenuProps) => {
  return supportedLanguageCodes.map((lng) => (
    <div className="ds:flex ds:flex-row ds:justify-center ds:items-center ds:gap-2 ds:w-full" key={lng}>
      <div className="ds:w-5 ds:px-2">
        {lng === language && <JodCircle size={12} className="ds:text-secondary-1" />}
      </div>
      <LinkComponent
        to={generateLocalizedPath(lng)}
        onClick={onClick}
        type="button"
        className="ds:w-full ds:text-menu ds:hover:underline ds:p-3"
        data-testid={dataTestId ? `${dataTestId}-menu-item-${lng}` : undefined}
      >
        {langLabels[lng] ?? lng}
      </LinkComponent>
    </div>
  ));
};

export const LanguageMenu = ({
  onClick,
  language,
  supportedLanguageCodes,
  generateLocalizedPath,
  LinkComponent,
  translations,
  dataTestId,
}: LanguageMenuProps) => {
  return (
    <div data-testid={dataTestId ? `${dataTestId}-menu-popup` : undefined}>
      <PopupList classNames="ds:gap-2">
        <ListItems
          onClick={onClick}
          supportedLanguageCodes={supportedLanguageCodes}
          language={language}
          generateLocalizedPath={generateLocalizedPath}
          LinkComponent={LinkComponent}
          translations={translations}
          dataTestId={dataTestId}
        />
      </PopupList>
    </div>
  );
};
