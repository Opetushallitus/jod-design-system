type TagColors = 'secondary-2' | 'secondary-3' | 'secondary-4' | 'secondary-5';
export interface TagProps {
  label: string;
  onClick: () => void;
  variant?: 'selectable' | 'added';
  color?: TagColors;
}

/** Tags allow users to categorize content. They can represent keywords or people, and are grouped to describe an item or a search request. */
export const Tag = ({ label, onClick, variant = 'selectable', color = 'secondary-4' }: TagProps) => {
  const colorMap: Record<TagColors, string> = {
    'secondary-2': 'ds-bg-secondary-2-50',
    'secondary-3': 'ds-bg-secondary-3-50',
    'secondary-4': 'ds-bg-secondary-4-50',
    'secondary-5': 'ds-bg-secondary-5',
  };
  return (
    <button
      type="button"
      className={`ds-group ds-flex ds-select-none ds-items-center ds-rounded-xl ds-text-tag ds-font-arial ds-px-4 ds-py-2 ${colorMap[color]}`}
      onClick={onClick}
    >
      <span className="ds-hyphens-auto ds-text-black group-hover:ds-underline">{label}</span>
      <span className="material-symbols-outlined ds-pl-3 ds-select-none ds-text-button-md ds-text-black" aria-hidden>
        {variant === 'selectable' ? 'add' : 'close'}
      </span>
    </button>
  );
};
