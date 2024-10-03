import { forwardRef } from 'react';

export interface FooterProps {
  /** Navigation items */
  items?: {
    key: React.Key;
    component: React.ComponentType<{ className: string }>;
  }[];
  /** Collection of logos */
  logos?: React.ReactNode;
  /** Copyright text */
  copyright?: string;
  /** Variant of the footer */
  variant?: 'light' | 'dark';
  /** Additional class name */
  className?: string;
}

/**
 * This component is a footer that displays navigation items, logos, and a copyright.
 */
export const Footer = forwardRef<HTMLDivElement, FooterProps>(function Footer(
  { items, logos, copyright, variant = 'light', className = '' }: FooterProps,
  ref,
) {
  return (
    <footer
      ref={ref}
      className={`ds-py-9 ds-text-button-md sm:ds-px-6 print:ds-hidden ${variant === 'light' ? 'ds-bg-white ds-text-black' : 'ds-bg-black ds-text-white'} ${className}`.trim()}
    >
      <div className="ds-mx-auto ds-flex ds-flex-col ds-gap-9 sm:ds-max-w-[1090px]">
        {items && (
          <ul className="ds-px-5 sm:ds-px-4">
            {items?.map((item) => (
              <li key={item.key} className="ds-px-2 ds-py-[6px]">
                <item.component className="hover:ds-underline" />
              </li>
            ))}
          </ul>
        )}
        {logos}
        {copyright && <div className="ds-mt-9 ds-flex ds-justify-end ds-px-5 sm:ds-px-0">{copyright}</div>}
      </div>
    </footer>
  );
});
