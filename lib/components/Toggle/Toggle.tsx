import { cx } from '../../cva';
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
export const Toggle = ({
  id,
  onChange,
  checked,
  disabled,
  ariaLabel,
  ariaDescribedBy,
  ariaLabelledBy,
  serviceVariant,
  type,
  testId,
}: ToggleProps) => {
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
      className={cx('ds:transition-all ds:duration-200 ds:w-[52px] ds:h-7 ds:relative ds:rounded-2xl ds:flex', {
        'ds:cursor-pointer': !disabled,
        'ds:bg-inactive-gray': !checked || disabled,
        'ds:bg-primary-1-dark': checked && !disabled && serviceVariant === 'yksilo',
        'ds:bg-primary-2-dark': checked && !disabled && serviceVariant === 'ohjaaja',
        'ds:bg-primary-3-dark': checked && !disabled && serviceVariant === 'palveluportaali',
        'ds:bg-primary-4-dark': checked && !disabled && serviceVariant === 'tietopalvelu',
      })}
    >
      <span
        aria-hidden
        className={cx(
          'ds:size-6 ds:bg-white ds:rounded-full ds:m-2 ds:transition-all ds:duration-200 ds:transform ds:translate-x-0',
          { 'ds:translate-x-[20px]': checked },
        )}
      />
    </button>
  );
};
