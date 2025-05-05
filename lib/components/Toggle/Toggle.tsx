import { MdCheck, MdClose } from 'react-icons/md';
import { cx } from '../../cva';

export interface ToggleProps {
  ariaLabel: string;
  checked?: boolean;
  disabled?: boolean;
  onChange: (newValue: boolean) => void;
}
export const Toggle = ({ onChange, checked, disabled, ariaLabel }: ToggleProps) => {
  const IconComponent = checked ? MdCheck : MdClose;
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={checked}
      className={cx('ds:transition-all ds:duration-200 ds:w-[52px] ds:h-[32px] ds:relative ds:rounded-2xl ds:flex', {
        'ds:cursor-pointer': !disabled,
        'ds:bg-tag-jotain-muuta': !checked || disabled,
        'ds:bg-success ds:hover:bg-secondary-2': checked && !disabled,
      })}
    >
      <span
        className={cx(
          'ds:size-6 ds:bg-white ds:flex ds:items-center ds:justify-center ds:rounded-full ds:m-2 ds:transition-all ds:duration-200 ds:transform ds:translate-x-0',
          { 'ds:translate-x-[20px]': checked },
        )}
      >
        <IconComponent
          size={20}
          aria-hidden="true"
          className={cx({
            'ds:text-success ds:hover:text-secondary-2': checked && !disabled,
            'ds:text-tag-jotain-muuta': !checked || disabled,
          })}
        />
      </span>
    </button>
  );
};
