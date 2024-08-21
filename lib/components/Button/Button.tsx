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
    'ds-text-button-sm ds-px-6 ds-rounded-[30px]': size === 'sm',
    'ds-text-button-md ds-px-6 ds-rounded-[30px]': size === 'md',
    'ds-text-button-lg ds-px-[42px] ds-rounded-[50px]': size === 'lg',
  });
};

const getIconClassName = (size: ButtonProps['size'], leftIcon: boolean, rightIcon: boolean) => {
  return cx({
    'ds-pl-4': (size === 'sm' || size === 'md') && leftIcon,
    'ds-pl-[21px]': size === 'lg' && leftIcon,
    'ds-pr-4': (size === 'sm' || size === 'md') && rightIcon,
    'ds-pr-[21px]': size === 'lg' && rightIcon,
  });
};

const getVariantClassName = (variant: ButtonProps['variant'], disabled: ButtonProps['disabled']) => {
  return cx({
    'ds-text-black ds-bg-bg-gray': variant === 'gray',
    'ds-text-black ds-bg-white': variant === 'white',
    'ds-text-alert ds-bg-bg-gray hover:ds-text-alert active:ds-text-white focus-visible:ds-text-alert':
      variant === 'gray-delete',
    'ds-text-alert ds-bg-white hover:ds-text-alert active:ds-text-white focus-visible:ds-text-alert':
      variant === 'white-delete',
    'active:ds-bg-alert focus-visible:ds-outline-alert': variant?.includes('-delete') && !disabled,
  });
};

const getDisabledClassName = (disabled: ButtonProps['disabled']) => {
  return disabled === false
    ? 'hover:ds-text-accent focus-visible:ds-text-accent active:ds-bg-accent focus-visible:ds-outline-accent focus-visible:ds-outline focus-visible:ds-outline-[3px] focus-visible:ds-outline-offset-[1.5px] active:ds-text-white active:ds-outline-0'
    : 'disabled:ds-text-inactive-gray disabled:ds-cursor-not-allowed';
};

const getButtonClassName = ({
  size,
  variant,
  leftIcon,
  rightIcon,
  disabled,
}: Partial<ButtonProps> & { leftIcon: boolean; rightIcon: boolean }) => {
  return `ds-flex ds-items-center ds-gap-4 ds-select-none ds-group
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
  const iconClassName = cx('material-symbols-outlined ds-h-fit ds-select-none', {
    'size-20': size === 'sm',
    'size-24': size === 'md',
    'size-40': size === 'lg',
  });

  const spanClassName = cx({
    'group-hover:ds-underline group-active:ds-no-underline group-focus-visible:ds-no-underline': !disabled,
    'ds-py-3': size === 'sm',
    'ds-py-[10px]': size === 'md',
    'ds-py-[20px]': size === 'lg',
  });

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
