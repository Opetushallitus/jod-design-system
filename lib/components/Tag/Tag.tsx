import { cx } from 'cva';
import { MdAdd, MdClose } from 'react-icons/md';

interface BaseTagProps {
  label: string;
  title?: string;
  variant?: 'selectable' | 'added' | 'presentation';
  sourceType?: 'tyopaikka' | 'koulutus' | 'vapaa-ajan-toiminto' | 'kiinnostus' | 'jotain-muuta' | 'rajoitus';
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
    'ds:group ds:inline-flex ds:select-none ds:items-center ds:rounded-xl ds:text-tag ds:font-arial ds:px-4 ds:py-2 ds:text-left',
    {
      'ds:cursor-pointer': variant !== 'presentation',
      'ds:bg-tag-tyopaikka': sourceType === 'tyopaikka',
      'ds:bg-tag-koulutus': sourceType === 'koulutus',
      'ds:bg-tag-vapaa-ajan-toiminto': sourceType === 'vapaa-ajan-toiminto',
      'ds:bg-tag-jotain-muuta': sourceType === 'jotain-muuta',
      'ds:bg-tag-kiinnostus': sourceType === 'kiinnostus',
      'ds:bg-tag-rajoitus': sourceType === 'rajoitus',
    },
  );

/** Tags allow users to categorize content. They can represent keywords or people, and are grouped to describe an item or a search request. */
export const Tag = ({ label, title, onClick, variant = 'selectable', sourceType = 'jotain-muuta' }: TagProps) => {
  return variant === 'presentation' ? (
    <div className={containerClassNames(sourceType, variant)} title={title}>
      <span className="ds:hyphens-auto ds:text-black">{label}</span>
    </div>
  ) : (
    <button type="button" className={containerClassNames(sourceType, variant)} onClick={onClick} title={title}>
      <span className="ds:hyphens-auto ds:text-black ds:group-hover:underline">{label}</span>
      <span className="ds:pl-3 ds:text-button-md ds:text-black" aria-hidden>
        {variant === 'selectable' ? <MdAdd size={16} /> : <MdClose size={16} />}
      </span>
    </button>
  );
};
