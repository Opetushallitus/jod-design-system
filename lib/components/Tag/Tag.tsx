import { cx } from 'cva';

import { Tooltip } from '../../components/Tooltip/Tooltip';
import { TooltipContent } from '../../components/Tooltip/TooltipContent';
import { TooltipTrigger } from '../../components/Tooltip/TooltipTrigger';
import { cva } from '../../cva';
import { JodAdd, JodClose } from '../../icons';

type SourceType = 'tyopaikka' | 'koulutus' | 'vapaa-ajan-teema' | 'kiinnostus' | 'jotain-muuta';

interface BaseTagProps {
  label: string;
  tooltip?: string;
  screenReaderTooltip?: string;
  variant?: 'selectable' | 'added' | 'presentation';
  hollow?: boolean;
  sourceType?: SourceType;
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

const colorClasses = {
  'vapaa-ajan-teema': {
    default: { filled: 'ds:bg-primary-1-light-1', hollow: 'ds:ring-primary-1-light-1' },
    selectable: { filled: 'ds:bg-primary-1-light-2', hollow: 'ds:ring-primary-1-light-2' },
  },
  koulutus: {
    default: { filled: 'ds:bg-primary-2-light-1', hollow: 'ds:ring-primary-2-light-1' },
    selectable: { filled: 'ds:bg-primary-2-light-2', hollow: 'ds:ring-primary-2-light-2' },
  },
  kiinnostus: {
    default: { filled: 'ds:bg-primary-3-light-1', hollow: 'ds:ring-primary-3-light-1' },
    selectable: { filled: 'ds:bg-primary-3-light-2', hollow: 'ds:ring-primary-3-light-2' },
  },
  tyopaikka: {
    default: { filled: 'ds:bg-primary-4-light-1', hollow: 'ds:ring-primary-4-light-1' },
    selectable: { filled: 'ds:bg-primary-4-light-2', hollow: 'ds:ring-primary-4-light-2' },
  },
  'jotain-muuta': {
    default: { filled: 'ds:bg-primary-5-light-2', hollow: 'ds:ring-primary-5-light-2' },
    selectable: { filled: 'ds:bg-bg-gray-2', hollow: 'ds:ring-bg-gray-2' },
  },
} satisfies Record<SourceType, Record<'default' | 'selectable', Record<'filled' | 'hollow', string>>>;

const tagStyles = cva({
  base: 'ds:group ds:inline-flex ds:select-none ds:items-center ds:rounded-xl ds:px-4 ds:py-2 ds:text-body-sm ds:font-arial ds:leading-none ds:text-left ds:max-w-full',
  variants: {
    interactive: { true: 'ds:cursor-pointer', false: '' },
    hollow: {
      true: 'ds:bg-white ds:ring-2 ds:ring-inset',
      false: '',
    },
  },
});

const containerClassNames = (sourceType: SourceType, variant: TagProps['variant'], hollow: boolean) =>
  cx(
    tagStyles({ interactive: variant !== 'presentation', hollow }),
    colorClasses[sourceType][variant === 'selectable' ? 'selectable' : 'default'][hollow ? 'hollow' : 'filled'],
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
