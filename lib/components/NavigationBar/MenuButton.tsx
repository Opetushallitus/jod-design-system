import { JodMenu } from '../../icons';

export interface MenuButtonProps {
  onClick: () => void;
  label: string;
}

export const MenuButton = ({ onClick, label }: MenuButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="ds:flex ds:flex-col ds:md:flex-row ds:gap-2 ds:md:gap-3 ds:justify-center ds:items-center ds:select-none ds:cursor-pointer"
      data-testid="open-nav-menu"
      aria-haspopup="dialog"
    >
      <JodMenu className="ds:mx-auto" />
      <span className="ds:md:text-[14px] ds:sm:text-[12px] ds:text-[10px] ds:font-semibold">{label}</span>
    </button>
  );
};
