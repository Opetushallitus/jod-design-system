type TagColors = 'secondary-2' | 'secondary-3' | 'secondary-4' | 'secondary-5';
export interface TagProps {
  label: string;
  onClick: () => void;
  variant?: 'selectable' | 'added';
  color?: TagColors;
}

export const Tag = ({ label, onClick, variant = 'selectable', color = 'secondary-4' }: TagProps) => {
  const colorMap: Record<TagColors, string> = {
    'secondary-2': 'bg-secondary-2-50',
    'secondary-3': 'bg-secondary-3-50',
    'secondary-4': 'bg-secondary-4-50',
    'secondary-5': 'bg-secondary-5',
  };
  return (
    <button
      type="button"
      className={`group flex select-none items-center rounded-xl text-tag px-4 py-2 ${colorMap[color]}`}
      onClick={onClick}
    >
      <span className="hyphens-auto text-black group-hover:underline">{label}</span>
      <span className="material-symbols-outlined pl-3 select-none text-button-md text-black" aria-hidden>
        {variant === 'selectable' ? 'add' : 'close'}
      </span>
    </button>
  );
};
