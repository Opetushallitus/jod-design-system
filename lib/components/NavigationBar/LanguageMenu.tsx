import { JodCircle } from '../../icons';
import { getTextColorClassForService } from '../../utils';
import { PopupList } from '../PopupList/PopupList';
import { langLabels, LanguageMenuProps } from './types';

const ListItems = ({
  serviceVariant,
  onClick,
  language,
  supportedLanguageCodes,
  LinkComponent,
  generateLocalizedPath,
  dataTestId,
}: LanguageMenuProps) => {
  const textColorClassName = getTextColorClassForService(serviceVariant);

  return supportedLanguageCodes.map((lng) => (
    <div
      className="ds:flex ds:flex-row ds:justify-center ds:items-center ds:gap-2 ds:w-full ds:hover:bg-bg-gray ds:rounded"
      key={lng}
      aria-current={lng === language}
      lang={lng}
    >
      <div className="ds:w-5 ds:px-2">
        {lng === language && <JodCircle role="presentation" size={12} className={textColorClassName} />}
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
  serviceVariant,
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
          serviceVariant={serviceVariant}
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
