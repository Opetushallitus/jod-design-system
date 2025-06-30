import { cx } from '../../cva';
import { Variant } from '../../utils';

export interface ToggleProps {
  ariaLabel: string;
  checked?: boolean;
  disabled?: boolean;
  variant: Variant;
  onChange: (newValue: boolean) => void;
}
export const Toggle = ({ onChange, checked, disabled, ariaLabel, variant }: ToggleProps) => {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={checked}
      className={cx('ds:transition-all ds:duration-200 ds:w-[52px] ds:h-[32px] ds:relative ds:rounded-2xl ds:flex', {
        'ds:cursor-pointer': !disabled,
        'ds:bg-inactive-gray': !checked || disabled,
        'ds:bg-accent': checked && !disabled && variant === 'YKSILO',
        'ds:bg-secondary-2-dark': checked && !disabled && variant === 'OHJAAJA',
        'ds:bg-secondary-4-dark': checked && !disabled && variant === 'TIETOPALVELU',
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
