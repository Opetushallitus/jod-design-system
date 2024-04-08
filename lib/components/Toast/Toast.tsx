export interface ToastProps {
  /** Text shown on the toast */
  text: string;
  /** Icon shown on the toast */
  icon?: string;
  /** Aria label for the icon */
  iconAriaLabel?: string;
}

/**
 * Toast component for displaying a text.
 */
export const Toast = ({ text, icon, iconAriaLabel }: ToastProps) => (
  <div
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    className={`inline-flex h-8 items-center gap-3 rounded-[4px] bg-success pl-5 text-body-sm ${icon ? 'pr-7' : 'pr-5'} text-white`}
  >
    {icon && (
      <span className="material-symbols-outlined size-24 select-none" role="img" aria-label={iconAriaLabel}>
        {icon}
      </span>
    )}
    {text}
  </div>
);
