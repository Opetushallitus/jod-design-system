import classNames from 'classnames';
/**
 * base = default button to be used
 * primary = should be only appear once in a page
 * text = for less-pronounced actions
 */
export type ButtonVariant = 'base' | 'primary' | 'outlined' | 'text';

export interface ButtonProps {
  /* Text shown on the button*/
  label: string;
  /* Callback fired on tap/click of the button */
  onClick: () => void;
  /** 
   Variant of the button 
   */
  variant?: ButtonVariant;
  /* Button disabled for any actions */
  disabled?: boolean;
}

export const Button = ({ label, onClick, variant = 'base', disabled = false }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={onClick}
      className={classNames('jod-button', 'm-2 px-4 py-2 font-bold', {
        'bg-jod-base text-jod-white': variant === 'base',
        'bg-jod-primary text-jod-white': variant === 'primary',
        'border border-jod-black text-jod-black': variant === 'outlined',
        'text-jod-black': variant === 'text',
        'cursor-not-allowed opacity-50': disabled,
      })}
    >
      {label}
    </button>
  );
};
