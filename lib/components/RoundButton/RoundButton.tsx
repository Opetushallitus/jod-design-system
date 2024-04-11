export interface RoundButtonProps {
  /** Text shown on the button */
  label: string;
  /** Callback fired on tap/click of the button */
  onClick: () => void;
  /** Button disabled for any actions */
  disabled?: boolean;
  /** Selected */
  selected?: boolean;
  /** CSS classname */
  className?: string;
  /** Icon name from Material Design */
  icon: string;
}

export const RoundButton = ({
  label,
  onClick,
  disabled = false,
  selected = false,
  className,
  icon,
}: RoundButtonProps) => {
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={onClick}
      className={`${className ? className : ''} flex flex-col justify-center ${disabled ? 'cursor-not-allowed opacity-50' : ''} min-w-[110px] items-center`.trim()}
    >
      <span
        aria-hidden
        className={`size-[72px] rounded-full ${selected ? 'bg-accent' : 'bg-bg-gray'} flex items-center justify-center ${selected ? 'text-white' : 'text-secondary-gray'} material-symbols-outlined size-48 select-none`}
      >
        {icon}
      </span>
      <span className={`text-sm font-normal ${selected ? 'text-accent' : 'text-primary-gray'}`}>{label}</span>
    </button>
  );
};
