import { cx } from '../../cva';

type ActionButtonProps = {
  label: string;
  icon: React.ReactNode;
  className?: string;
  onClick: () => void;
  testId?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ActionButton = ({ label, icon, className, onClick, testId, ...rest }: ActionButtonProps) => {
  return (
    <button
      aria-label={label}
      className={cx(
        'ds:font-semibold ds:text-[0.75rem] ds:leading-[1.125rem] ds:text-nowrap',
        'ds:rounded-2xl ds:flex ds:cursor-pointer ds:items-center ds:gap-x-2 ds:py-1 ds:pr-5 ds:pl-4 ds:outline-accent ds:hover:underline',
        className,
      )}
      onClick={onClick}
      type="button"
      data-testid={testId}
      {...rest}
    >
      {icon}
      {label}
    </button>
  );
};
