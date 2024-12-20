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
  variant?: 'gray' | 'white' | 'gray-delete' | 'white-delete' | 'accent';
  /** Button disabled for any actions */
  disabled?: boolean;
  /** Icon shown on the button */
  icon?: React.ReactNode;
  /** Icon side */
  iconSide?: 'left' | 'right';
  /** For situation where the button needs to act as a link, like NavLink */
  LinkComponent?: React.ComponentType<{ children: React.ReactNode }>;
}

const getSizeClassName = (size: ButtonProps['size']) => {
  return cx({
    'ds-text-button-sm ds-px-6 ds-rounded-[30px]': size === 'sm',
    'ds-text-button-md-mobile sm:ds-text-button-md ds-px-6 ds-rounded-[30px]': size === 'md',
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
    'ds-text-white ds-bg-accent hover:ds-text-white active:ds-bg-white active:ds-text-black focus-visible:ds-text-white':
      variant === 'accent' && !disabled,
    'ds-bg-accent-50 disabled:ds-text-white': variant === 'accent' && disabled,
    'ds-text-black ds-bg-bg-gray': variant === 'gray',
    'ds-text-black ds-bg-white': variant === 'white',
    'ds-text-alert ds-bg-bg-gray hover:ds-text-alert active:ds-text-white focus-visible:ds-text-alert':
      variant === 'gray-delete',
    'ds-text-alert ds-bg-white hover:ds-text-alert active:ds-text-white focus-visible:ds-text-alert':
      variant === 'white-delete',
    'active:ds-bg-alert focus-visible:ds-outline-alert': variant?.includes('-delete') && !disabled,
  });
};

const getDisabledClassName = (disabled: ButtonProps['disabled'], variant: ButtonProps['variant']) => {
  return disabled === false
    ? tc([
        'hover:ds-text-accent',
        'focus-visible:ds-text-accent',
        'active:ds-bg-accent',
        'focus-visible:ds-outline-accent',
        'focus-visible:ds-outline',
        'focus-visible:ds-outline-[3px]',
        'focus-visible:ds-outline-offset-[1.5px]',
        variant === 'accent' ? 'active:ds-text-accent' : 'active:ds-text-white',
        'active:ds-outline-0',
      ])
    : 'disabled:ds-text-inactive-gray disabled:ds-cursor-not-allowed';
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
    LinkComponent ? 'ds-inline-flex' : 'ds-flex',
    'ds-items-center',
    'ds-gap-4',
    'ds-select-none',
    'ds-group',
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
}: ButtonProps) => {
  const leftIcon = icon !== undefined && iconSide === 'left';
  const rightIcon = icon !== undefined && iconSide === 'right';
  const onlyIcon = icon && !leftIcon && !rightIcon;
  const buttonClassName = getButtonClassName({ size, variant, leftIcon, rightIcon, disabled, LinkComponent });

  const spanClassName = cx({
    'group-hover:ds-underline group-active:ds-no-underline group-focus-visible:ds-no-underline': !disabled,
    'ds-py-3': size === 'sm',
    'ds-py-[10px]': size === 'md',
    'ds-py-[18px]': size === 'lg',
  });

  return LinkComponent ? (
    <LinkComponent>
      <span className={buttonClassName}>
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
      className={buttonClassName}
    >
      {leftIcon && icon}
      {onlyIcon ? icon : <span className={spanClassName}>{label}</span>}
      {rightIcon && icon}
    </button>
  );
};
