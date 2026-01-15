import { cx } from 'cva';
import { JodAdd, JodClose } from '../../icons';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../main';

interface BaseTagProps {
  label: string;
  tooltip?: string;
  variant?: 'selectable' | 'added' | 'presentation';
  sourceType?: 'tyopaikka' | 'koulutus' | 'vapaa-ajan-toiminto' | 'kiinnostus' | 'jotain-muuta';
  testId?: string;
}

interface PresentationTagProps extends BaseTagProps {
  variant: 'presentation';
  onClick?: never;
}

interface ActionableTagProps extends BaseTagProps {
  variant?: 'selectable' | 'added';
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export type TagProps = PresentationTagProps | ActionableTagProps;

const containerClassNames = (sourceType: TagProps['sourceType'], variant: TagProps['variant']) =>
  cx(
    'ds:group ds:inline-flex ds:select-none ds:items-center ds:rounded-xl ds:text-body-sm ds:font-arial ds:leading-none ds:px-4 ds:py-2 ds:text-left ds:max-w-full',
    {
      'ds:cursor-pointer': variant !== 'presentation',

      'ds:bg-tag-tyopaikka': sourceType === 'tyopaikka' && variant !== 'selectable',
      'ds:bg-tag-koulutus': sourceType === 'koulutus' && variant !== 'selectable',
      'ds:bg-tag-vapaa-ajan-toiminto': sourceType === 'vapaa-ajan-toiminto' && variant !== 'selectable',
      'ds:bg-primary-light-2': sourceType === 'jotain-muuta' && variant !== 'selectable',
      'ds:bg-tag-kiinnostus': sourceType === 'kiinnostus' && variant !== 'selectable',

      'ds:bg-secondary-4-light-2': sourceType === 'tyopaikka' && variant === 'selectable',
      'ds:bg-secondary-2-light-2': sourceType === 'koulutus' && variant === 'selectable',
      'ds:bg-secondary-1-light-2': sourceType === 'vapaa-ajan-toiminto' && variant === 'selectable',
      'ds:bg-bg-gray-2': sourceType === 'jotain-muuta' && variant === 'selectable',
      'ds:bg-secondary-3-light-2': sourceType === 'kiinnostus' && variant === 'selectable',
    },
  );

/** Tags allow users to categorize content. They can represent keywords or people, and are grouped to describe an item or a search request. */
export const Tag = ({
  label,
  tooltip,
  onClick,
  variant = 'selectable',
  sourceType = 'jotain-muuta',
  testId,
}: TagProps) => {
  return (
    <Tooltip clickToToggle={false}>
      <TooltipTrigger asChild>
        {variant === 'presentation' ? (
          <div
            className={containerClassNames(sourceType, variant)}
            data-testid={testId}
            role={tooltip ? 'button' : undefined}
            tabIndex={tooltip ? 0 : undefined}
          >
            <span className="ds:truncate ds:text-primary-gray">{label}</span>
          </div>
        ) : (
          <button
            type="button"
            className={containerClassNames(sourceType, variant)}
            onClick={onClick}
            data-testid={testId}
          >
            <span className="ds:truncate ds:text-primary-gray ds:group-hover:underline">{label}</span>
            <span className="ds:pl-3 ds:text-button-md ds:text-primary-gray" aria-hidden>
              {variant === 'selectable' ? <JodAdd size={16} /> : <JodClose size={16} />}
            </span>
          </button>
        )}
      </TooltipTrigger>
      {tooltip && (
        <TooltipContent>
          <div className="ds:font-arial ds:text-white ds:leading-5 ds:text-card-label">
            <p className="ds:mb-2 ds:capitalize" aria-hidden>
              {label}
            </p>
            <p className="ds:font-normal">{tooltip}</p>
          </div>
        </TooltipContent>
      )}
    </Tooltip>
  );
};
