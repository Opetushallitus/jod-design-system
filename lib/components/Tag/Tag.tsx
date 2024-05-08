export interface TagProps {
  label: string;
  onClick: () => void;
  variant?: 'selectable' | 'added';
}

export const Tag = ({ label, onClick, variant = 'selectable' }: TagProps) => {
  return (
    <button
      className="group flex select-none items-center gap-3 rounded-sm border-2 border-secondary-gray px-4 text-tag"
      onClick={onClick}
    >
      <span className="hyphens-auto py-[5px] text-secondary-gray group-hover:underline">{label}</span>
      <span className="material-symbols-outlined size-24-bold h-fit select-none text-secondary-gray" aria-hidden>
        {variant === 'selectable' ? 'add' : 'close'}
      </span>
    </button>
  );
};
