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

/** Round button component for single-step user actions. */
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
      className={`${className ? className : ''} ds-group ds-flex ds-flex-col ds-justify-center ${disabled ? 'ds-cursor-not-allowed ds-opacity-50' : ''} ds-min-w-[110px] ds-items-center ds-gap-2`.trim()}
    >
      <span
        aria-hidden
        className={`ds-size-[72px] ds-rounded-full ${selected ? 'ds-bg-accent ds-text-white' : 'ds-bg-bg-gray-2 ds-text-black group-hover:ds-text-accent'} ds-flex ds-items-center ds-justify-center material-symbols-outlined size-48 ds-select-none`}
      >
        {icon}
      </span>
      <span
        className={`${hideLabel ? 'ds-hidden' : ''} ds-text-button-sm ${selected ? 'ds-text-accent' : 'ds-text-black'} group-hover:ds-text-accent group-hover:ds-underline`.trim()}
      >
        {label}
      </span>
    </button>
  );
};
