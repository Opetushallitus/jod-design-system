import { tidyClasses } from '../../utils';

export interface IconButtonProps {
  /** Text shown on the button */
  label: string;
  /** Hide label */
  hideLabel?: boolean;
  /** Callback fired on tap/click of the button */
  onClick: () => void;
  /** Button disabled for any actions */
  disabled?: boolean;
  /** Icon shown on the button. Icon size should be 18px */
  icon: React.ReactNode;
  /** Background color */
  bgColor?: 'gray' | 'white';
  dataTestId?: string;
}

export const IconButton = ({
  dataTestId,
  label,
  hideLabel = false,
  onClick,
  disabled = false,
  icon,
  bgColor = 'white',
}: IconButtonProps) => {
  const buttonBgColorClass = tidyClasses(`
    ${bgColor === 'gray' ? 'ds:bg-gray-500' : ''}
    ${bgColor === 'white' ? 'ds:bg-white' : ''}
  `);

  return (
    <button
      aria-label={label}
      type="button"
      onClick={onClick}
      disabled={disabled}
      data-testid={dataTestId}
      className={tidyClasses(`
        ${disabled ? 'ds:cursor-not-allowed ds:opacity-50' : 'ds:cursor-pointer'}
        ds:group
        ds:flex
        ds:flex-row
        ds:justify-center 
        ds:items-center
        ds:gap-4
      `)}
    >
      {!hideLabel && (
        <span
          className={tidyClasses(
            `ds:text-button-md ${disabled ? '' : 'ds:group-hover:text-accent ds:group-hover:underline'}`,
          )}
        >
          {label}
        </span>
      )}

      <div
        aria-hidden
        className={tidyClasses(`
            ${buttonBgColorClass}    
            ds:rounded-full
            ds:flex
            ds:items-center
            ds:justify-center
            ds:select-none
            ds:size-7
          `)}
      >
        {icon}
      </div>
    </button>
  );
};
