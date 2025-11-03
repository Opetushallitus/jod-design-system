import { cx } from 'cva';
import { JodAdd, JodClose } from '../../icons';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../main';

interface BaseTagProps {
  label: string;
  tooltip?: string;
  variant?: 'selectable' | 'added' | 'presentation';
  sourceType?: 'tyopaikka' | 'koulutus' | 'vapaa-ajan-toiminto' | 'kiinnostus' | 'jotain-muuta' | 'rajoitus';
  dataTestId?: string;
}

interface PresentationTagProps extends BaseTagProps {
  variant: 'presentation';
  onClick?: never;
}

interface ActionableTagProps extends BaseTagProps {
  variant?: 'selectable' | 'added';
  onClick: () => void;
}

export type TagProps = PresentationTagProps | ActionableTagProps;

const containerClassNames = (sourceType: TagProps['sourceType'], variant: TagProps['variant']) =>
  cx(
    'ds:group ds:inline-flex ds:select-none ds:items-center ds:rounded-xl ds:text-body-sm ds:font-poppins ds:px-4 ds:py-2 ds:text-left',
    {
      'ds:cursor-pointer': variant !== 'presentation',
      'ds:bg-tag-tyopaikka': sourceType === 'tyopaikka',
      'ds:bg-tag-koulutus': sourceType === 'koulutus',
      'ds:bg-tag-vapaa-ajan-toiminto': sourceType === 'vapaa-ajan-toiminto',
      'ds:bg-primary-light-2': sourceType === 'jotain-muuta',
      'ds:bg-tag-kiinnostus': sourceType === 'kiinnostus',
      'ds:bg-tag-rajoitus': sourceType === 'rajoitus',
    },
  );

/** Tags allow users to categorize content. They can represent keywords or people, and are grouped to describe an item or a search request. */
export const Tag = ({
  label,
  tooltip,
  onClick,
  variant = 'selectable',
  sourceType = 'jotain-muuta',
  dataTestId,
}: TagProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {variant === 'presentation' ? (
          <div
            className={containerClassNames(sourceType, variant)}
            data-testid={dataTestId}
            role={tooltip ? 'button' : undefined}
            tabIndex={tooltip ? 0 : undefined}
          >
            <span className="ds:hyphens-auto ds:text-primary-gray">{label}</span>
          </div>
        ) : (
          <button
            type="button"
            className={containerClassNames(sourceType, variant)}
            onClick={onClick}
            data-testid={dataTestId}
          >
            <span className="ds:hyphens-auto ds:text-primary-gray ds:group-hover:underline">{label}</span>
            <span className="ds:pl-3 ds:text-button-md ds:text-primary-gray" aria-hidden>
              {variant === 'selectable' ? <JodAdd size={16} /> : <JodClose size={16} />}
            </span>
          </button>
        )}
      </TooltipTrigger>
      {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
    </Tooltip>
  );
};
