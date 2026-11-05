import { cx } from '../../cva';
import { JodCheckmark, JodRemove } from '../../icons';
import { ServiceVariant } from '../../utils';

type ToggleLabelProps = { ariaLabel: string; ariaLabelledBy?: never } | { ariaLabelledBy: string; ariaLabel?: never };

export type ToggleProps = ToggleLabelProps & {
  id?: string;
  ariaDescribedBy?: string;
  checked: boolean;
  disabled?: boolean;
  serviceVariant: ServiceVariant;
  onChange: (newValue: boolean) => void;
  type?: 'button' | 'submit' | 'reset';
  testId?: string;
};

type ToggleState = 'off' | 'on' | 'disabled';

const getToggleState = (checked: boolean, disabled?: boolean): ToggleState => {
  if (disabled) {
    return 'disabled';
  }
  return checked ? 'on' : 'off';
};

// Hover colors use `not-forced-colors:` so they don't override the system colors in forced-colors (high-contrast) mode.
const trackStyles: Record<ToggleState, string> = {
  off: 'ds:cursor-pointer ds:bg-white ds:border-primary-5-light-1 ds:not-forced-colors:hover:border-secondary-gray ds:forced-colors:border-[ButtonText]',
  on: 'ds:cursor-pointer ds:border-transparent ds:forced-colors:border-[Highlight] ds:forced-colors:bg-[Highlight]',
  disabled: 'ds:bg-inactive-gray ds:border-transparent ds:forced-colors:border-[GrayText]',
};

const knobStyles: Record<ToggleState, string> = {
  off: 'ds:bg-primary-5-light-1 ds:not-forced-colors:group-hover:bg-secondary-gray ds:forced-colors:bg-[ButtonText]',
  on: 'ds:bg-white ds:forced-colors:bg-[HighlightText]',
  disabled: 'ds:bg-bg-gray-2 ds:forced-colors:bg-[GrayText]',
};

const iconStyles: Record<ToggleState, string> = {
  off: 'ds:text-white',
  on: '', // serviceStyles takes cares of this color
  disabled: 'ds:text-inactive-gray',
};

// Service-specific colors, used only when checked
const serviceStyles: Record<ServiceVariant, { track: string; icon: string }> = {
  yksilo: {
    track: 'ds:bg-primary-1-dark ds:not-forced-colors:hover:bg-primary-1-dark-2',
    icon: 'ds:text-primary-1-dark ds:not-forced-colors:group-hover:text-primary-1-dark-2',
  },
  ohjaaja: { track: 'ds:bg-primary-2-dark', icon: 'ds:text-primary-2-dark' },
  palveluportaali: { track: 'ds:bg-primary-3-dark', icon: 'ds:text-primary-3-dark' },
  tietopalvelu: { track: 'ds:bg-primary-4-dark', icon: 'ds:text-primary-4-dark' },
};

export const Toggle = ({
  id,
  onChange,
  checked,
  disabled,
  ariaLabel,
  ariaDescribedBy,
  ariaLabelledBy,
  serviceVariant,
  type = 'button',
  testId,
}: ToggleProps) => {
  const state = getToggleState(checked, disabled);
  const serviceStyle = state === 'on' ? serviceStyles[serviceVariant] : undefined;
  const Icon = checked ? JodCheckmark : JodRemove;

  return (
    <button
      id={id}
      type={type}
      role="switch"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      aria-checked={checked}
      data-testid={testId}
      className={cx(
        'ds:group ds:relative ds:flex ds:w-[52px] ds:h-7 ds:rounded-2xl ds:border-2',
        'ds:transition-[background-color,border-color] ds:duration-200',
        'ds:focus-visible:outline-2 ds:focus-visible:outline-solid ds:focus-visible:outline-offset-2 ds:focus-visible:outline-primary-1-dark',
        trackStyles[state],
        serviceStyle?.track,
      )}
    >
      <span
        aria-hidden
        className={cx(
          'ds:flex ds:items-center ds:justify-center ds:size-6 ds:m-1 ds:rounded-full',
          'ds:transition-all ds:duration-200 ds:transform',
          checked ? 'ds:translate-x-[20px]' : 'ds:translate-x-0',
          knobStyles[state],
        )}
      >
        <Icon size={16} className={cx(iconStyles[state], serviceStyle?.icon)} />
      </span>
    </button>
  );
};
