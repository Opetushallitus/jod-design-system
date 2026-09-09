import { cx } from 'cva';

import { JodAdd, JodClose } from '../../icons';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../main';

interface BaseTagProps {
  label: string;
  tooltip?: string;
  screenReaderTooltip?: string;
  variant?: 'selectable' | 'added' | 'presentation';
  hollow?: boolean;
  sourceType?: 'tyopaikka' | 'koulutus' | 'vapaa-ajan-teema' | 'kiinnostus' | 'jotain-muuta';
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

const containerClassNames = (
  sourceType: TagProps['sourceType'],
  variant: TagProps['variant'],
  hollow: TagProps['hollow'],
) =>
  cx(
    'ds:group ds:inline-flex ds:select-none ds:items-center ds:rounded-xl ds:text-body-sm ds:font-arial ds:leading-none ds:text-left ds:max-w-full',
    {
      'ds:cursor-pointer': variant !== 'presentation',
      'ds:px-4 ds:py-2': !hollow,
      'ds:border-2 ds:bg-white ds:px-[10px] ds:py-[2px]': hollow,

      'ds:bg-primary-4-light-1': !hollow && sourceType === 'tyopaikka' && variant !== 'selectable',
      'ds:bg-primary-2-light-1': !hollow && sourceType === 'koulutus' && variant !== 'selectable',
      'ds:bg-primary-1-light-1': !hollow && sourceType === 'vapaa-ajan-teema' && variant !== 'selectable',
      'ds:bg-primary-5-light-2': !hollow && sourceType === 'jotain-muuta' && variant !== 'selectable',
      'ds:bg-primary-3-light-1': !hollow && sourceType === 'kiinnostus' && variant !== 'selectable',

      'ds:bg-primary-4-light-2': !hollow && sourceType === 'tyopaikka' && variant === 'selectable',
      'ds:bg-primary-2-light-2': !hollow && sourceType === 'koulutus' && variant === 'selectable',
      'ds:bg-primary-1-light-2': !hollow && sourceType === 'vapaa-ajan-teema' && variant === 'selectable',
      'ds:bg-bg-gray-2': !hollow && sourceType === 'jotain-muuta' && variant === 'selectable',
      'ds:bg-primary-3-light-2': !hollow && sourceType === 'kiinnostus' && variant === 'selectable',

      'ds:border-primary-4-light-1': hollow && sourceType === 'tyopaikka' && variant !== 'selectable',
      'ds:border-primary-2-light-1': hollow && sourceType === 'koulutus' && variant !== 'selectable',
      'ds:border-primary-1-light-1': hollow && sourceType === 'vapaa-ajan-teema' && variant !== 'selectable',
      'ds:border-primary-5-light-2': hollow && sourceType === 'jotain-muuta' && variant !== 'selectable',
      'ds:border-primary-3-light-1': hollow && sourceType === 'kiinnostus' && variant !== 'selectable',

      'ds:border-primary-4-light-2': hollow && sourceType === 'tyopaikka' && variant === 'selectable',
      'ds:border-primary-2-light-2': hollow && sourceType === 'koulutus' && variant === 'selectable',
      'ds:border-primary-1-light-2': hollow && sourceType === 'vapaa-ajan-teema' && variant === 'selectable',
      'ds:border-bg-gray-2': hollow && sourceType === 'jotain-muuta' && variant === 'selectable',
      'ds:border-primary-3-light-2': hollow && sourceType === 'kiinnostus' && variant === 'selectable',
    },
  );

/** Tags allow users to categorize content. They can represent keywords or people, and are grouped to describe an item or a search request. */
export const Tag = ({
  label,
  tooltip,
  screenReaderTooltip = tooltip,
  onClick,
  variant = 'selectable',
  sourceType = 'jotain-muuta',
  hollow = false,
  testId,
}: TagProps) => {
  return (
    <Tooltip clickToToggle={false} delay={{ open: 500, close: 150 }}>
      <TooltipTrigger asChild noAriaDescribedby noAriaExpanded>
        {variant === 'presentation' ? (
          <button type="button" className={containerClassNames(sourceType, variant, hollow)} data-testid={testId}>
            <span className="ds:truncate ds:text-primary-gray ds:leading-5">{label}</span>
            {screenReaderTooltip && <span className="ds:sr-only">{screenReaderTooltip}</span>}
          </button>
        ) : (
          <button
            type="button"
            className={containerClassNames(sourceType, variant, hollow)}
            onClick={onClick}
            data-testid={testId}
          >
            <span className="ds:truncate ds:text-primary-gray ds:group-hover:underline ds:leading-5">{label}</span>
            <span className="ds:pl-3 ds:text-button-md ds:text-primary-gray ds:leading-5" aria-hidden>
              {variant === 'selectable' ? <JodAdd size={16} /> : <JodClose size={16} />}
            </span>
            {screenReaderTooltip && <span className="ds:sr-only">{screenReaderTooltip}</span>}
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
