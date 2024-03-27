export type ButtonVariant =
  | 'base' // default button to be used
  | 'primary' // should be only appear once in a page
  | 'outlined'
  | 'text'; // for less-pronounced actions

export interface ButtonProps {
  /** Text shown on the button */
  label: string;
  /** Callback fired on tap/click of the button */
  onClick: () => void;
  /** Variant of the button */
  variant?: ButtonVariant;
  /** Button disabled for any actions */
  disabled?: boolean;
}

export const Button = ({ label, onClick, variant = 'base', disabled = false }: ButtonProps) => {
  const className = `m-2 px-4 py-2 font-bold
      ${variant === 'base' ? 'bg-jod-base text-jod-white' : ''}
      ${variant === 'primary' ? 'bg-jod-primary text-jod-white' : ''}
      ${variant === 'outlined' ? 'border border-jod-black text-jod-black' : ''}
      ${variant === 'text' ? 'text-jod-black' : ''}
      ${disabled ? 'cursor-not-allowed opacity-50' : ''}`
    .replace(/\s+/g, ' ')
    .trim();

  return (
    <button disabled={disabled} type="button" onClick={onClick} className={className}>
      {label}
    </button>
  );
};
