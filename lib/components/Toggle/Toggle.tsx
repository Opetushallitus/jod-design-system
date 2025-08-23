import { cx } from '../../cva';
import { ServiceVariant } from '../../utils';

export interface ToggleProps {
  ariaLabel: string;
  checked: boolean;
  disabled?: boolean;
  serviceVariant: ServiceVariant;
  onChange: (newValue: boolean) => void;
  type?: 'button' | 'submit' | 'reset';
  dataTestId?: string;
}
export const Toggle = ({
  onChange,
  checked,
  disabled,
  ariaLabel,
  serviceVariant = 'yksilo',
  type,
  dataTestId,
}: ToggleProps) => {
  return (
    <button
      type={type}
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={checked}
      data-testid={dataTestId}
      className={cx('ds:transition-all ds:duration-200 ds:w-[52px] ds:h-[32px] ds:relative ds:rounded-2xl ds:flex', {
        'ds:cursor-pointer': !disabled,
        'ds:bg-inactive-gray': !checked || disabled,
        'ds:bg-secondary-1-dark': checked && !disabled && serviceVariant === 'yksilo',
        'ds:bg-secondary-2-dark': checked && !disabled && serviceVariant === 'ohjaaja',
        'ds:bg-secondary-3-dark': checked && !disabled && serviceVariant === 'palveluportaali',
        'ds:bg-secondary-4-dark': checked && !disabled && serviceVariant === 'tietopalvelu',
      })}
    >
      <span
        className={cx(
          'ds:size-6 ds:bg-white ds:rounded-full ds:m-2 ds:transition-all ds:duration-200 ds:transform ds:translate-x-0',
          { 'ds:translate-x-[20px]': checked },
        )}
      />
    </button>
  );
};
