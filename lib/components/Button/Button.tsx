import React from 'react';
import { cx } from '../../cva';
import {
  getAccentBgClassForService,
  getFocusOutlineClassForService,
  getPressedBgColorClassForService,
  getTextColorClassForService,
  ServiceVariant,
  tidyClasses as tc,
} from '../../utils';

export interface ButtonProps {
  /** Form ID to associate the button with */
  form?: string;
  /** Text shown on the button */
  label: string;
  /** Callback fired on tap/click of the button */
  onClick?: () => void;
  /** Size of the button */
  size?: 'sm' | 'lg';
  /** Button variant (primary = accent, secondary = white, tertiary = plain) */
  variant?: 'white' | 'red-delete' | 'white-delete' | 'accent' | 'plain' | 'gray';
  /** Service variant */
  serviceVariant?: ServiceVariant;
  /** Button disabled for any actions */
  disabled?: boolean;
  /** Icon shown on the button */
  icon?: React.ReactNode;
  /** Icon side */
  iconSide?: 'left' | 'right';
  /** For situation where the button needs to act as a link, like NavLink */
  linkComponent?: React.ComponentType<{
    children: React.ReactNode;
    className: string;
    ariaLabel?: string;
    testId?: string;
  }>;
  /** Ref to the button element */
  ref?: React.Ref<HTMLButtonElement>;
  /** Additional class names */
  className?: string;
  /** Test id for querying in tests */
  testId?: string;
}

const getVariantClassName = (
  variant: ButtonProps['variant'],
  serviceVariant: ServiceVariant,
  disabled: ButtonProps['disabled'],
) => {
  const accentBg = getAccentBgClassForService(serviceVariant);
  const pressedBg = getPressedBgColorClassForService(serviceVariant);
  const textColor = getTextColorClassForService(serviceVariant);
  const focusColor = getFocusOutlineClassForService(serviceVariant);
  const hoverColor = cx({
    'ds:hover:text-secondary-1-dark': serviceVariant === 'yksilo',
    'ds:hover:text-secondary-2-dark': serviceVariant === 'ohjaaja',
    'ds:hover:text-secondary-3-dark': serviceVariant === 'palveluportaali',
    'ds:hover:text-secondary-4-dark': serviceVariant === 'tietopalvelu',
  });
  const activeTextColor = cx({
    'ds:active:text-secondary-1-dark-2': serviceVariant === 'yksilo',
    'ds:active:text-secondary-2-dark-2': serviceVariant === 'ohjaaja',
    'ds:active:text-secondary-3-dark-2': serviceVariant === 'palveluportaali',
    'ds:active:text-secondary-4-dark-2': serviceVariant === 'tietopalvelu',
  });
  const focusTextColor = cx({
    'ds:focus-visible:text-secondary-1-dark': serviceVariant === 'yksilo',
    'ds:focus-visible:text-secondary-2-dark': serviceVariant === 'ohjaaja',
    'ds:focus-visible:text-secondary-3-dark': serviceVariant === 'palveluportaali',
    'ds:focus-visible:text-secondary-4-dark': serviceVariant === 'tietopalvelu',
  });

  return cx('ds:outline-offset-2 ds:disabled:cursor-not-allowed', {
    // Accent
    [`${accentBg} ${pressedBg} ${focusColor} ds:text-white`]: variant === 'accent' && !disabled,

    // White
    [`ds:bg-white ds:text-black ${focusColor} ${hoverColor} ${activeTextColor} ${focusTextColor}`]:
      variant === 'white' && !disabled,

    // Gray
    [`ds:bg-bg-gray ds:text-black ${focusColor} ${hoverColor} ${activeTextColor} ${focusTextColor}`]:
      variant === 'gray' && !disabled,

    // Plain
    [`${textColor} ${hoverColor} ${focusColor} ${activeTextColor}`]: variant === 'plain' && !disabled,
    [`ds:text-inactive-gray`]: variant === 'plain' && disabled,

    // Red Delete
    'ds:bg-alert ds:active:bg-alert-text-2 ds:focus-visible:outline-alert ds:text-white':
      variant === 'red-delete' && !disabled,

    // White Delete
    'ds:bg-white ds:text-alert-text ds:active:text-alert-text-2 ds:focus-visible:text-alert-text-2 ds:focus-visible ds:outline-alert-text-2':
      variant === 'white-delete' && !disabled,

    // Shared disabled styles
    [`ds:bg-white ds:text-inactive-gray`]:
      variant && ['red-delete', 'white', 'white-delete'].includes(variant) && disabled,
    [`ds:bg-inactive-gray ds:text-secondary-5-light-3`]:
      variant && ['accent', 'red-delete'].includes(variant) && disabled,
    [`ds:bg-bg-gray ds:text-secondary-gray`]: variant === 'gray' && disabled,
  });
};

const getButtonClassName = ({
  size,
  variant,
  leftIcon,
  rightIcon,
  disabled,
  linkComponent,
  onlyIcon,
  serviceVariant = 'yksilo',
}: Partial<ButtonProps> & { leftIcon?: boolean; rightIcon?: boolean; onlyIcon?: boolean }) =>
  tc([
    linkComponent ? 'ds:inline-flex' : 'ds:flex',
    'ds:cursor-pointer',
    'ds:items-center',
    'ds:gap-4',
    'ds:select-none',
    'ds:group',
    cx({
      'ds:pl-4': leftIcon,
      'ds:pr-4': rightIcon && variant !== 'plain',
      'ds:text-button-sm': size === 'sm',
      'ds:text-button-md': size === 'lg',
      'ds:rounded-full ds:aspect-square ds:p-1! ds:justify-center ds:size-8': onlyIcon,
      'ds:px-6 ds:rounded-[30px]': variant !== 'plain',
    }),
    getVariantClassName(variant, serviceVariant, disabled),
  ]);

/** Button component for user actions. */
export const Button = ({
  testId,
  className,
  disabled = false,
  form,
  icon,
  iconSide,
  label,
  linkComponent: LinkComponent,
  onClick,
  ref,
  serviceVariant = 'yksilo',
  size = 'lg',
  variant = 'white',
}: ButtonProps) => {
  const leftIcon = icon !== undefined && iconSide === 'left';
  const rightIcon = icon !== undefined && iconSide === 'right';
  const onlyIcon = !!icon && !leftIcon && !rightIcon;
  const buttonClassName = getButtonClassName({
    size,
    variant,
    leftIcon,
    rightIcon,
    disabled,
    linkComponent: LinkComponent,
    serviceVariant,
    onlyIcon,
  });

  const spanClassName = cx('ds:text-center', {
    'ds:group-hover:underline ds:group-active:underline ds:group-focus-visible:underline': !disabled,
    'ds:py-3 ds:min-h-7': size === 'sm',
    'ds:py-4': size === 'lg' && variant !== 'plain',
  });

  const buttonContent = (
    <>
      {leftIcon && icon}
      {onlyIcon ? icon : <span className={spanClassName}>{label}</span>}
      {rightIcon && icon}
    </>
  );
  const classNameTrimmed = `${buttonClassName} ${className ?? ''}`.trim();

  return LinkComponent ? (
    <LinkComponent ariaLabel={label} className={classNameTrimmed} testId={testId}>
      {buttonContent}
    </LinkComponent>
  ) : (
    <button
      ref={ref}
      aria-label={label}
      form={form}
      disabled={disabled}
      type={onClick ? 'button' : 'submit'}
      onClick={onClick}
      className={classNameTrimmed}
      data-testid={testId}
    >
      {buttonContent}
    </button>
  );
};
