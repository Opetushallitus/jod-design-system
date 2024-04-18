export interface ButtonProps {
  /** Text shown on the button */
  label: string;
  /** Callback fired on tap/click of the button */
  onClick: () => void;
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Button variant */
  variant?: 'gray' | 'white' | 'gray-delete' | 'white-delete';
  /** Button disabled for any actions */
  disabled?: boolean;
  /** Icon shown on the button */
  icon?: string;
  /** Icon side */
  iconSide?: 'left' | 'right';
}

const getSizeClassName = (size: ButtonProps['size']) => {
  switch (size) {
    case 'sm':
      return 'text-button-sm px-6';
    case 'md':
      return 'text-button-md px-6';
    case 'lg':
      return 'text-button-lg px-[42px]';
    default:
      return '';
  }
};

const getIconClassName = (size: ButtonProps['size'], leftIcon: boolean, rightIcon: boolean) => {
  return `
    ${size === 'sm' && leftIcon ? 'pl-4' : ''}
    ${size === 'md' && leftIcon ? 'pl-4' : ''}
    ${size === 'lg' && leftIcon ? 'pl-[21px]' : ''}
    ${size === 'sm' && rightIcon ? 'pr-4' : ''}
    ${size === 'md' && rightIcon ? 'pr-4' : ''}
    ${size === 'lg' && rightIcon ? 'pr-[21px]' : ''}
  `;
};

const getVariantClassName = (variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'gray':
      return 'text-primary-gray bg-bg-gray';
    case 'white':
      return 'text-primary-gray bg-white';
    case 'gray-delete':
      return 'text-alert bg-bg-gray hover:text-alert active:text-white active:bg-alert focus-visible:text-alert';
    case 'white-delete':
      return 'text-alert bg-white hover:text-alert active:text-white active:bg-alert focus-visible:text-alert';
    default:
      return '';
  }
};

const getDisabledClassName = (disabled: ButtonProps['disabled']) => {
  return disabled === false
    ? 'hover:text-accent focus-visible:text-accent active:bg-accent focus-visible:outline-accent focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[1.5px] active:text-white active:outline-0'
    : 'disabled:text-inactive-gray disabled:cursor-not-allowed';
};

const getButtonClassName = ({
  size,
  variant,
  leftIcon,
  rightIcon,
  disabled,
}: Partial<ButtonProps> & { leftIcon: boolean; rightIcon: boolean }) => {
  return `flex items-center gap-4 rounded-[30px] select-none group
    ${getSizeClassName(size)}
    ${getIconClassName(size, leftIcon, rightIcon)}
    ${getVariantClassName(variant)}
    ${getDisabledClassName(disabled)}
  `
    .replace(/\s+/g, ' ')
    .trim();
};

/** Button component for user actions. */
export const Button = ({
  label,
  onClick,
  size = 'md',
  variant = 'gray',
  disabled = false,
  icon,
  iconSide = 'left',
}: ButtonProps) => {
  const leftIcon = icon !== undefined && iconSide === 'left';
  const rightIcon = icon !== undefined && iconSide === 'right';
  const buttonClassName = getButtonClassName({ size, variant, leftIcon, rightIcon, disabled });
  const iconClassName = `material-symbols-outlined size-24 h-fit select-none
      ${size === 'sm' ? 'size-20' : ''}
      ${size === 'md' ? 'size-24' : ''}
      ${size === 'lg' ? 'size-40' : ''}`
    .replace(/\s+/g, ' ')
    .trim();
  const spanClassName = `
      ${!disabled ? 'group-hover:underline group-active:no-underline group-focus-visible:no-underline' : ''}
      ${size === 'sm' ? 'py-[10px]' : ''}
      ${size === 'md' ? 'py-[10px]' : ''}
      ${size === 'lg' ? 'py-[20px]' : ''}`
    .replace(/\s+/g, ' ')
    .trim();

  return (
    <button disabled={disabled} type="button" onClick={onClick} className={buttonClassName}>
      {leftIcon && (
        <span className={iconClassName} aria-hidden>
          {icon}
        </span>
      )}
      <span className={spanClassName}>{label}</span>
      {rightIcon && (
        <span className={iconClassName} aria-hidden>
          {icon}
        </span>
      )}
    </button>
  );
};
