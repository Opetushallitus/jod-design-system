import { JodMenu } from '../../icons';

export interface MenuButtonProps {
  onClick: () => void;
  ariaLabel: string;
  label: string;
}

export const MenuButton = ({ onClick, ariaLabel, label }: MenuButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="ds:flex ds:flex-col ds:md:flex-row ds:gap-2 ds:md:gap-3 ds:justify-center ds:items-center ds:select-none ds:cursor-pointer"
      data-testid="open-nav-menu"
      aria-expanded={false}
    >
      <JodMenu className="ds:mx-auto" />
      <span className="ds:md:text-[14px] ds:sm:text-[12px] ds:text-[10px]">{label}</span>
    </button>
  );
};
