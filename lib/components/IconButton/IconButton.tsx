import { cx } from '../../cva';
import {
  getAccentBgClassForService,
  getFocusOutlineClassForService,
  getPressedBgColorClassForService,
  ServiceVariant,
  tidyClasses as tc,
} from '../../utils';

interface IndicativeProps {
  /** Render a span with no interactivity instead of a button */
  indicative: true;
  /** Callback fired on tap/click of the button */
  onClick?: never;
}
interface InteractiveProps {
  indicative?: false;
  onClick: () => void;
}

interface BaseProps {
  /** Aria label for screen readers */
  ariaLabel: string;
  /** Button disabled for any actions */
  disabled?: boolean;
  /** Icon shown on the button. Icon size should be 18px */
  icon: React.ReactNode;
  /** Color variant */
  variant?: 'white' | 'gray' | 'plain';
  /** Data-testid attribute */
  testId?: string;
  /** Selected status */
  selected?: boolean;
  /** Service variant for coloring */
  serviceVariant?: ServiceVariant;
}

export type IconButtonProps = BaseProps & (InteractiveProps | IndicativeProps);

export const IconButton = ({
  ariaLabel,
  testId,
  disabled = false,
  icon,
  indicative,
  onClick,
  selected,
  variant = 'plain',
  serviceVariant = 'yksilo',
}: IconButtonProps) => {
  const serviceBgClasses = getAccentBgClassForService(serviceVariant);

  const spanElement = (
    <span
      aria-hidden
      data-testid={testId}
      className={tc([
        // BG color
        cx({
          'ds:bg-white': variant === 'white',
          'ds:bg-secondary-5-light-3': variant === 'gray',
          [`${serviceBgClasses} ds:text-white`]: !indicative && selected && !disabled,
          'ds:bg-secondary-gray ds:text-white': indicative && selected,
          'ds:bg-bg-gray-2': indicative && !selected,
        }),
        cx({ 'ds:text-inactive-gray': disabled }),
        cx({
          'ds:hover:bg-bg-gray-2': !indicative && !selected,
          [getPressedBgColorClassForService(serviceVariant)]: !indicative && !disabled,
          'ds:active:text-white': !indicative && !disabled,
        }),
        'ds:flex',
        'ds:rounded-full',
        'ds:items-center',
        'ds:justify-center',
        'ds:select-none',
        'ds:size-8',
      ])}
    >
      {icon}
    </span>
  );

  return indicative ? (
    spanElement
  ) : (
    <button
      aria-label={ariaLabel}
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={tc([
        disabled ? 'ds:cursor-not-allowed ds:opacity-50' : 'ds:cursor-pointer',
        getFocusOutlineClassForService(serviceVariant),
        'ds:outline-offset-2',
        'ds:rounded-full',
        'ds:flex',
        'ds:content-center',
      ])}
    >
      {spanElement}
    </button>
  );
};
