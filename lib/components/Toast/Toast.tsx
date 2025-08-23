import { cx } from '../../cva';
import { JodCheckmark, JodError, JodInfo, JodWarning } from '../../icons';
import { tidyClasses } from '../../utils';

export interface ToastProps {
  /** Text shown on the toast */
  text: string;
  /** Override default toast icon */
  icon?: React.ReactNode;
  /** Variant of the toast */
  variant?: 'success' | 'warning' | 'error' | 'neutral';
  dataTestId?: string; // Added dataTestId property
}

/**
 * Toasts display brief, temporary notifications. They are noticeable but do not disrupt the user experience and do not require an action to be taken.
 */
export const Toast = ({ text, icon, variant = 'success', dataTestId }: ToastProps) => {
  const getDefaultIcon = () => {
    switch (variant) {
      case 'success':
        return <JodCheckmark className="ds:text-success" />;
      case 'warning':
        return <JodWarning className="ds:text-secondary-3" />;
      case 'error':
        return <JodError className="ds:text-alert-text" />;
      case 'neutral':
        return <JodInfo className="ds:text-secondary-gray" />;
      default:
        return null;
    }
  };
  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-testid={dataTestId}
      className={tidyClasses([
        cx({
          'ds:text-secondary-gray': variant === 'neutral',
          'ds:border-success ': variant === 'success',
          'ds:border-warning ': variant === 'warning',
          'ds:border-alert ': variant === 'error',
        }),
        variant === 'neutral' ? 'ds:bg-bg-gray' : 'ds:bg-white ds:border-2',
        'ds:min-w-[240px]',
        'ds:max-w-[480px]',
        'ds:inline-flex',
        'ds:min-h-8',
        'ds:items-center',
        'ds:gap-3',
        'ds:rounded-sm',
        'ds:py-3',
        'ds:pl-4',
        'ds:pr-5',
        'ds:text-primary-gray',
        'ds:text-body-sm',
        'ds:font-arial',
      ])}
    >
      <span className="ds:shrink-0">{icon ?? getDefaultIcon()}</span>
      <span>{text}</span>
    </div>
  );
};
