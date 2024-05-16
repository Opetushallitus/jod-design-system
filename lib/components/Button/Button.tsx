import { cx } from '../../cva';

export interface ButtonProps {
  /** Form ID to associate the button with */
  form?: string;
  /** Text shown on the button */
  label: string;
  /** Callback fired on tap/click of the button */
  onClick?: () => void;
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
  return cx({
    'text-button-sm px-6': size === 'sm',
    'text-button-md px-6': size === 'md',
    'text-button-lg px-[42px]': size === 'lg',
  });
};

const getIconClassName = (size: ButtonProps['size'], leftIcon: boolean, rightIcon: boolean) => {
  return cx({
    'pl-4': (size === 'sm' || size === 'md') && leftIcon,
    'pl-[21px]': size === 'lg' && leftIcon,
    'pr-4': (size === 'sm' || size === 'md') && rightIcon,
    'pr-[21px]': size === 'lg' && rightIcon,
  });
};

const getVariantClassName = (variant: ButtonProps['variant'], disabled: ButtonProps['disabled']) => {
  return cx({
    'text-primary-gray bg-bg-gray': variant === 'gray',
    'text-primary-gray bg-white': variant === 'white',
    'text-alert bg-bg-gray hover:text-alert active:text-white focus-visible:text-alert': variant === 'gray-delete',
    'text-alert bg-white hover:text-alert active:text-white focus-visible:text-alert': variant === 'white-delete',
    'active:bg-alert': (variant === 'gray-delete' || variant === 'white-delete') && !disabled,
  });
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
    ${getVariantClassName(variant, disabled)}
    ${getDisabledClassName(disabled)}
  `
    .replace(/\s+/g, ' ')
    .trim();
};

/** Button component for user actions. */
export const Button = ({
  form,
  label,
  onClick,
  size = 'md',
  variant = 'gray',
  disabled = false,
  icon,
  iconSide,
}: ButtonProps) => {
  const leftIcon = icon !== undefined && iconSide === 'left';
  const rightIcon = icon !== undefined && iconSide === 'right';
  const onlyIcon = icon && !leftIcon && !rightIcon;
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
    <button
      form={form}
      disabled={disabled}
      type={onClick ? 'button' : 'submit'}
      onClick={onClick}
      className={buttonClassName}
    >
      {leftIcon && (
        <span className={iconClassName} aria-hidden>
          {icon}
        </span>
      )}
      {onlyIcon ? (
        <span className={iconClassName} aria-label={label}>
          {icon}
        </span>
      ) : (
        <span className={spanClassName}>{label}</span>
      )}
      {rightIcon && (
        <span className={iconClassName} aria-hidden>
          {icon}
        </span>
      )}
    </button>
  );
};
