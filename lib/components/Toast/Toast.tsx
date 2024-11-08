export interface ToastProps {
  /** Text shown on the toast */
  text: string;
  /** Icon shown on the toast */
  icon?: React.ReactNode;
  /** Variant of the toast */
  variant?: 'success' | 'warning' | 'error';
}

/**
 * Toasts display brief, temporary notifications. They are noticeable but do not disrupt the user experience and do not require an action to be taken.
 */
export const Toast = ({ text, icon, variant = 'success' }: ToastProps) => (
  <div
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    className={`
        ${variant === 'success' ? 'ds-bg-success' : ''}
        ${variant === 'warning' ? 'ds-bg-warning' : ''}
        ${variant === 'error' ? 'ds-bg-alert' : ''}
        ds-inline-flex ds-h-8 ds-items-center ds-gap-3 ds-rounded-sm ds-pl-5 ds-text-black
        ds-text-body-sm ds-font-arial ${icon ? 'ds-pr-7' : 'ds-pr-5'}`
      .replace(/\s+/g, ' ')
      .trim()}
  >
    {icon ?? null}
    {text}
  </div>
);
