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
 * Toast component for displaying a text.
 */
export const Toast = ({ text, icon, iconAriaLabel, variant = 'success' }: ToastProps) => (
  <div
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    className={`
        ${variant === 'success' ? 'bg-success text-white' : ''}
        ${variant === 'warning' ? 'bg-warning text-black' : ''}
        ${variant === 'error' ? 'bg-alert text-white' : ''}
        inline-flex h-8 items-center gap-3 rounded-[4px] pl-5
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
