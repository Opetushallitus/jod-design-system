import React from 'react';
import { cx } from '../../cva';
import { tidyClasses as tc } from '../../utils';

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
  variant?: 'gray' | 'white' | 'gray-delete' | 'red-delete' | 'white-delete' | 'accent';
  /** Button disabled for any actions */
  disabled?: boolean;
  /** Icon shown on the button */
  icon?: React.ReactNode;
  /** Icon side */
  iconSide?: 'left' | 'right';
  /** For situation where the button needs to act as a link, like NavLink */
  LinkComponent?: React.ComponentType<{ children: React.ReactNode }>;
  /** Ref to the button element */
  ref?: React.Ref<HTMLButtonElement>;
  /** Additional class names */
  className?: string;
}

const getSizeClassName = (size: ButtonProps['size']) => {
  return cx({
    'ds:text-button-sm ds:px-6 ds:rounded-[30px] ds:font-poppins': size === 'sm',
    'ds:text-button-md ds:px-6 ds:rounded-[30px] ds:font-poppins': size === 'md',
    'ds:text-button-lg ds:px-[42px] ds:rounded-[50px] ds:font-arial': size === 'lg',
  });
};

const getIconClassName = (size: ButtonProps['size'], leftIcon: boolean, rightIcon: boolean) => {
  return cx({
    'ds:pl-4': (size === 'sm' || size === 'md') && leftIcon,
    'ds:pl-[21px]': size === 'lg' && leftIcon,
    'ds:pr-4': (size === 'sm' || size === 'md') && rightIcon,
    'ds:pr-[21px]': size === 'lg' && rightIcon,
  });
};

const getVariantClassName = (variant: ButtonProps['variant'], disabled: ButtonProps['disabled']) => {
  return cx({
    'ds:text-white ds:bg-accent ds:hover:text-white ds:active:bg-white ds:active:text-black ds:focus-visible:text-white':
      variant === 'accent' && !disabled,
    'ds:bg-accent-50 ds:disabled:text-white': variant === 'accent' && disabled,
    'ds:text-black ds:bg-bg-gray': variant === 'gray',
    'ds:text-black ds:bg-white': variant === 'white',
    'ds:text-alert ds:bg-bg-gray ds:hover:text-alert ds:active:text-white ds:focus-visible:text-alert':
      variant === 'gray-delete',
    'ds:bg-[#E35750] ds:text-white': variant === 'red-delete',
    'ds:text-alert ds:bg-white ds:hover:text-alert ds:active:text-white ds:focus-visible:text-alert':
      variant === 'white-delete',
    'ds:active:bg-alert ds:focus-visible:outline-alert': variant?.includes('-delete') && !disabled,
  });
};

const getDisabledClassName = (disabled: ButtonProps['disabled'], variant: ButtonProps['variant']) => {
  return disabled === false
    ? tc([
        'ds:hover:text-accent',
        'ds:focus-visible:text-accent',
        'ds:active:bg-accent',
        'ds:focus-visible:outline-accent',
        'ds:focus-visible:outline',
        'ds:focus-visible:outline-[3px]',
        'ds:focus-visible:outline-offset-[1.5px]',
        variant === 'accent' ? 'ds:active:text-accent' : 'ds:active:text-white',
        'ds:active:outline-0',
      ])
    : 'ds:disabled:text-inactive-gray ds:disabled:cursor-not-allowed';
};

const getButtonClassName = ({
  size,
  variant,
  leftIcon,
  rightIcon,
  disabled,
  LinkComponent,
}: Partial<ButtonProps> & { leftIcon: boolean; rightIcon: boolean }) =>
  tc([
    'ds:cursor-pointer',
    LinkComponent ? 'ds:inline-flex' : 'ds:flex',
    'ds:items-center',
    'ds:gap-4',
    'ds:select-none',
    'ds:group',
    getSizeClassName(size),
    getIconClassName(size, leftIcon, rightIcon),
    getVariantClassName(variant, disabled),
    getDisabledClassName(disabled, variant),
  ]);

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
  LinkComponent,
  ref,
  className,
}: ButtonProps) => {
  const leftIcon = icon !== undefined && iconSide === 'left';
  const rightIcon = icon !== undefined && iconSide === 'right';
  const onlyIcon = icon && !leftIcon && !rightIcon;
  const buttonClassName = getButtonClassName({ size, variant, leftIcon, rightIcon, disabled, LinkComponent });

  const spanClassName = cx({
    'ds:group-hover:underline ds:group-active:no-underline ds:group-focus-visible:no-underline': !disabled,
    'ds:py-3': size === 'sm',
    'ds:py-[10px]': size === 'md',
    'ds:py-[18px]': size === 'lg',
  });

  return LinkComponent ? (
    <LinkComponent>
      <span className={`${buttonClassName} ${className ?? ''}`.trim()}>
        {leftIcon && icon}
        {onlyIcon ? icon : <span className={spanClassName}>{label}</span>}
        {rightIcon && icon}
      </span>
    </LinkComponent>
  ) : (
    <button
      form={form}
      disabled={disabled}
      type={onClick ? 'button' : 'submit'}
      onClick={onClick}
      className={`${buttonClassName} ${className ?? ''}`.trim()}
      ref={ref}
    >
      {leftIcon && icon}
      {onlyIcon ? icon : <span className={spanClassName}>{label}</span>}
      {rightIcon && icon}
    </button>
  );
};
