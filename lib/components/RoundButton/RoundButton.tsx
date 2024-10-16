import { tidyClasses } from '../../utils';

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
  /** Icon shown on the link */
  icon: React.ReactNode;
  /** Icon size: sm = 32px, md = 40px, lg = 64px  */
  size?: 'sm' | 'md' | 'lg';
  /** Background color */
  bgColor?: 'gray' | 'white';
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
  size = 'md',
  bgColor = 'gray',
}: RoundButtonProps) => {
  const buttonSizeClass = tidyClasses(`
    ${size === 'sm' ? 'ds-size-[32px]' : ''}
    ${size === 'md' ? 'ds-size-[40px]' : ''}
    ${size === 'lg' ? 'ds-size-[64px]' : ''}
  `);

  const bgColorClass = tidyClasses(`
    ${!selected && bgColor === 'gray' ? 'ds-bg-bg-gray-2' : ''}
    ${!selected && bgColor === 'white' ? 'ds-bg-white' : ''}
  `);

  return (
    <button
      aria-label={label}
      disabled={disabled}
      type="button"
      onClick={onClick}
      className={tidyClasses(`
        ${className ?? ''}
        ${disabled ? 'ds-cursor-not-allowed ds-opacity-50' : ''}
        ds-group
        ds-flex
        ds-flex-col
        ds-justify-center 
        ds-items-center
        ds-gap-2
      `)}
    >
      <div
        aria-hidden
        className={tidyClasses(`
          ${buttonSizeClass}
          ${selected ? 'ds-bg-accent' : bgColorClass}
          ${selected ? 'ds-text-white' : 'ds-text-black group-hover:ds-text-accent'}
          ds-rounded-full
          ds-flex
          ds-items-center
          ds-justify-center
          ds-select-none
      `)}
      >
        {icon}
      </div>
      <LabelPart label={label} hideLabel={hideLabel} selected={selected} />
    </button>
  );
};

const LabelPart = ({ label, hideLabel, selected }: Pick<RoundButtonProps, 'label' | 'hideLabel' | 'selected'>) => (
  <span
    className={tidyClasses(`
      ${hideLabel ? 'ds-hidden' : ''}
      ${selected ? 'ds-text-accent' : 'ds-text-black'}
      ds-text-button-sm-mobile sm:ds-text-button-md
      group-hover:ds-text-accent
      group-hover:ds-underline
    `)}
  >
    {label}
  </span>
);
