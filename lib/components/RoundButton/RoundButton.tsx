import { useId } from 'react';

export interface RoundButtonProps {
  /** Text shown on the button */
  label: string;
  /** Callback fired on tap/click of the button */
  onClick: () => void;
  /** Button disabled for any actions */
  disabled?: boolean;
  /** Selected */
  selected?: boolean;
  /** CSS classname */
  className?: string;
}

export const RoundButton = ({ label, onClick, disabled = false, selected = false, className }: RoundButtonProps) => {
  const labelId = useId();
  return (
    <div
      className={`${className ? className : ''} flex flex-col items-center justify-center px-1 ${disabled ? 'cursor-not-allowed opacity-50' : ''}`.trim()}
    >
      <button
        aria-labelledby={labelId}
        disabled={disabled}
        type="button"
        onClick={onClick}
        className={`focus:ring-purple-500 size-[72px] rounded-full border border-none hover:ring hover:ring-accent focus:outline-none focus:ring focus:hover:border-none ${selected ? 'bg-[#697077]' : 'bg-[#f5f5f5]'}`}
      >
        {/** TODO: Need real icons and alignment and styles to be adjusted then */}
        <span className={`text-center text-[42px] leading-6 ${selected ? 'text-[#ffffff]' : 'text-[#4d5358]'}`}>
          &#9776;
        </span>
      </button>
      <span id={labelId} className="text-sm font-normal">
        {label}
      </span>
    </div>
  );
};
