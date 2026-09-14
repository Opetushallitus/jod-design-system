import { cx } from '../../../cva';
import {
  getAccentBgClassForService,
  getFocusOutlineClassForService,
  getGroupActiveBgColorClassForService,
  ServiceVariant,
} from '../../../utils';

interface LanguageSelectionItemProps {
  label: string;
  value: string;
  selected: boolean;
  serviceVariant: ServiceVariant;
  linkComponent: React.ElementType;
  linkProps?: Record<string, unknown>;
  testId?: string;
}

export const LanguageSelectionItem = ({
  label,
  value,
  selected,
  serviceVariant,
  linkComponent: LinkComponent,
  linkProps,
  testId,
}: LanguageSelectionItemProps) => (
  <li className="ds:flex ds:w-full ds:min-h-8 ds:items-center" lang={value} data-testid={testId}>
    <LinkComponent
      {...linkProps}
      className={cx([
        'ds:flex',
        'ds:flex-1',
        'ds:w-full',
        'ds:items-center',
        'ds:group',
        'ds:rounded',
        'ds:text-button-md',
        'ds:hover:bg-primary-5-light-3',
        'ds:active:text-white',
        getFocusOutlineClassForService(serviceVariant),
        getGroupActiveBgColorClassForService(serviceVariant),
      ])}
      aria-current={selected || undefined}
      data-testid={testId ? `${testId}-link` : undefined}
    >
      <span className="ds:ml-2 ds:flex ds:size-4 ds:items-center ds:justify-center" aria-hidden>
        <span
          className={cx([
            'ds:size-4',
            'ds:rounded-full',
            selected && getAccentBgClassForService(serviceVariant),
            !selected && 'ds:group-hover:bg-primary-5-light-2',
            getGroupActiveBgColorClassForService(serviceVariant),
          ])}
        />
      </span>
      <span className="ds:ml-2 ds:grow ds:px-3 ds:py-3 ds:group-hover:underline">{label}</span>
    </LinkComponent>
  </li>
);
