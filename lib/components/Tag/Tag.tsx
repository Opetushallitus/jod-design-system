import { cx } from 'cva';
import { MdAdd, MdClose } from 'react-icons/md';

export interface TagProps {
  label: string;
  onClick: () => void;
  variant?: 'selectable' | 'added';
  sourceType?: 'tyopaikka' | 'koulutus' | 'vapaa-ajan-toiminto' | 'kiinnostus' | 'jotain-muuta' | 'rajoitus';
}

/** Tags allow users to categorize content. They can represent keywords or people, and are grouped to describe an item or a search request. */
export const Tag = ({ label, onClick, variant = 'selectable', sourceType = 'jotain-muuta' }: TagProps) => {
  return (
    <button
      type="button"
      className={cx(
        'ds-group ds-flex ds-select-none ds-items-center ds-rounded-xl ds-text-tag ds-font-arial ds-px-4 ds-py-2',
        {
          'ds-bg-tag-tyopaikka': sourceType === 'tyopaikka',
          'ds-bg-tag-koulutus': sourceType === 'koulutus',
          'ds-bg-tag-vapaa-ajan-toiminto': sourceType === 'vapaa-ajan-toiminto',
          'ds-bg-tag-jotain-muuta': sourceType === 'jotain-muuta',
          'ds-bg-tag-kiinnostus': sourceType === 'kiinnostus',
          'ds-bg-tag-rajoitus': sourceType === 'rajoitus',
        },
      )}
      onClick={onClick}
    >
      <span className="ds-hyphens-auto ds-text-black group-hover:ds-underline">{label}</span>
      <span className="ds-pl-3 ds-text-button-md ds-text-black" aria-hidden>
        {variant === 'selectable' ? <MdAdd size={16} /> : <MdClose size={16} />}
      </span>
    </button>
  );
};
