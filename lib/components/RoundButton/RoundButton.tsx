export interface RoundButtonProps {
  /** Text shown on the button */
  label: string;
  /** Hide label */
  hideLabel?: boolean;
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
  hideLabel = false,
  onClick,
  disabled = false,
  selected = false,
  className,
  icon,
}: RoundButtonProps) => {
  return (
    <button
      aria-label={label}
      disabled={disabled}
      type="button"
      onClick={onClick}
      className={`${className ? className : ''} group flex flex-col justify-center ${disabled ? 'cursor-not-allowed opacity-50' : ''} min-w-[110px] items-center gap-2`.trim()}
    >
      <span
        aria-hidden
        className={`size-[72px] rounded-full ${selected ? 'bg-accent' : 'bg-bg-gray'} flex items-center justify-center ${selected ? 'text-white' : 'text-primary-gray hover:text-accent'} material-symbols-outlined size-48 select-none`}
      >
        {icon}
      </span>
      <span
        className={`${hideLabel ? 'hidden' : ''} text-button-sm ${selected ? 'text-accent' : 'text-primary-gray'} group-hover:text-accent group-hover:underline`.trim()}
      >
        {label}
      </span>
    </button>
  );
};
