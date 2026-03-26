import { cva as cvaBase } from 'cva';
import React from 'react';
import { cx } from '../../cva';
import { serviceColors, type ServiceVariant } from '../../utils';

// Generate compound variants for service-specific styling
const createServiceVariants = () =>
  (Object.entries(serviceColors) as [ServiceVariant, (typeof serviceColors)[ServiceVariant]][]).flatMap(
    ([service, colors]) => [
      {
        variant: 'accent' as const,
        serviceVariant: service,
        disabled: false,
        class: `${colors.bg} ${colors.bgActive} ${colors.outline}`,
      },
      {
        variant: 'white' as const,
        serviceVariant: service,
        disabled: false,
        class: `${colors.textHover} ${colors.textActive} ${colors.textFocus} ${colors.outline}`,
      },
      {
        variant: 'gray' as const,
        serviceVariant: service,
        disabled: false,
        class: `${colors.textHover} ${colors.textActive} ${colors.textFocus} ${colors.outline}`,
      },
      {
        variant: 'plain' as const,
        serviceVariant: service,
        disabled: false,
        class: `${colors.text} ${colors.textHover} ${colors.textActive} ${colors.outline}`,
      },
    ],
  );

export interface ButtonProps {
  /** ARIA popup type for accessibility (e.g., "dialog", "menu") */
  ariaHaspopup?: React.ButtonHTMLAttributes<HTMLButtonElement>['aria-haspopup'];
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

const buttonVariants = cvaBase({
  base: 'ds:cursor-pointer ds:items-center ds:gap-2 ds:select-none ds:group ds:outline-offset-2 ds:disabled:cursor-not-allowed',
  variants: {
    display: {
      flex: 'ds:flex',
      'inline-flex': 'ds:inline-flex',
    },
    size: {
      sm: 'ds:text-button-sm',
      lg: 'ds:text-button-md',
    },
    variant: {
      accent: 'ds:text-white',
      white: 'ds:bg-white ds:text-primary-gray',
      gray: 'ds:bg-bg-gray ds:text-primary-gray',
      plain: '',
      'red-delete': 'ds:bg-alert ds:active:bg-alert-text-2 ds:focus-visible:outline-alert ds:text-white',
      'white-delete':
        'ds:bg-white ds:text-alert-text ds:active:text-alert-text-2 ds:focus-visible:text-alert-text-2 ds:focus-visible ds:outline-alert-text-2',
    },
    serviceVariant: {
      yksilo: '',
      ohjaaja: '',
      palveluportaali: '',
      tietopalvelu: '',
    },
    isPlain: {
      true: 'ds:px-0',
      false: 'ds:rounded-[30px]',
    },
    onlyIcon: {
      true: 'ds:rounded-full ds:p-1! ds:justify-center ds:min-w-[56px]',
      false: '',
    },
    leftIcon: {
      true: '',
      false: '',
    },
    rightIcon: {
      true: '',
      false: '',
    },
    disabled: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    // Size + non-plain padding (not for onlyIcon)
    { size: 'sm', isPlain: false, onlyIcon: false, class: 'ds:px-5 ds:min-h-7' },
    { size: 'lg', isPlain: false, onlyIcon: false, class: 'ds:px-6 ds:min-h-9' },

    // Only icon sizing
    { onlyIcon: true, size: 'lg', class: 'ds:aspect-square' },

    // Left icon padding by size
    { leftIcon: true, size: 'sm', class: 'ds:pl-4' },
    { leftIcon: true, size: 'lg', class: 'ds:pl-[20px]' },

    // Right icon padding by size (only for non-plain)
    { rightIcon: true, size: 'sm', isPlain: false, class: 'ds:pr-4' },
    { rightIcon: true, size: 'lg', isPlain: false, class: 'ds:pr-[20px]' },

    // Service-specific colors (accent, white, gray, plain)
    ...createServiceVariants(),

    // Disabled styles
    { variant: 'plain', disabled: true, class: 'ds:text-inactive-gray' },
    { variant: 'white', disabled: true, class: 'ds:text-inactive-gray' },
    { variant: 'white-delete', disabled: true, class: 'ds:text-inactive-gray' },
    { variant: 'accent', disabled: true, class: 'ds:bg-inactive-gray ds:text-secondary-5-light-3' },
    { variant: 'red-delete', disabled: true, class: 'ds:bg-inactive-gray ds:text-secondary-5-light-3' },
    { variant: 'gray', disabled: true, class: 'ds:bg-bg-gray ds:text-secondary-gray' },
  ],
  defaultVariants: {
    display: 'flex',
    size: 'lg',
    variant: 'white',
    serviceVariant: 'yksilo',
    isPlain: false,
    onlyIcon: false,
    leftIcon: false,
    rightIcon: false,
    disabled: false,
  },
});

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
  buttonVariants({
    display: linkComponent ? 'inline-flex' : 'flex',
    size,
    variant,
    serviceVariant,
    isPlain: variant === 'plain',
    onlyIcon: onlyIcon ?? false,
    leftIcon: leftIcon ?? false,
    rightIcon: rightIcon ?? false,
    disabled: disabled ?? false,
  });

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
  ariaHaspopup,
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
      aria-haspopup={ariaHaspopup}
    >
      {buttonContent}
    </button>
  );
};
