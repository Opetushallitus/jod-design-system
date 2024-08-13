export interface ToastProps {
  /** Text shown on the toast */
  text: string;
  /** Icon shown on the toast */
  icon?: string;
  /** Aria label for the icon */
  iconAriaLabel?: string;
  /** Variant of the toast */
  variant?: 'success' | 'warning' | 'error';
}

/**
 * Toasts display brief, temporary notifications. They are noticeable but do not disrupt the user experience and do not require an action to be taken.
 */
export const Toast = ({ text, icon, iconAriaLabel, variant = 'success' }: ToastProps) => (
  <div
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    className={`
        ${variant === 'success' ? 'bg-success' : ''}
        ${variant === 'warning' ? 'bg-warning' : ''}
        ${variant === 'error' ? 'bg-alert' : ''}
        inline-flex h-8 items-center gap-3 rounded-sm pl-5 text-black
        text-body-sm ${icon ? 'pr-7' : 'pr-5'}`
      .replace(/\s+/g, ' ')
      .trim()}
  >
    {icon && (
      <span className="material-symbols-outlined size-24 select-none" role="img" aria-label={iconAriaLabel}>
        {icon}
      </span>
    )}
    {text}
  </div>
);
