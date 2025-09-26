import { cx } from 'cva';
import { forwardRef } from 'react';
import { PopupList } from '../PopupList/PopupList';
import { langLabels, LanguageMenuProps } from './types';

const ListItems = ({
  onClick,
  language,
  supportedLanguageCodes,
  LinkComponent,
  generateLocalizedPath,
}: LanguageMenuProps) => {
  return supportedLanguageCodes.map((lng) => (
    <LinkComponent
      key={lng}
      to={generateLocalizedPath(lng)}
      onClick={onClick}
      type="button"
      className={cx('ds:w-full ds:text-button-md ds:hover:underline ds:px-5 ds:py-3', {
        'ds:bg-secondary-1-50 ds:rounded': lng === language,
      })}
      data-testid={`language-menu-item-${lng}`}
    >
      {langLabels[lng] ?? lng}
    </LinkComponent>
  ));
};

export const LanguageMenu = forwardRef<HTMLDivElement, LanguageMenuProps>(function LanguageMenuWithRef(
  { onClick, language, supportedLanguageCodes, generateLocalizedPath, LinkComponent, translations },
  ref,
) {
  return (
    <div ref={ref} data-testid="language-menu-popup">
      <PopupList classNames="ds:gap-2">
        <ListItems
          onClick={onClick}
          supportedLanguageCodes={supportedLanguageCodes}
          language={language}
          generateLocalizedPath={generateLocalizedPath}
          LinkComponent={LinkComponent}
          translations={translations}
        />
      </PopupList>
    </div>
  );
});
