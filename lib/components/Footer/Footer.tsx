import { forwardRef } from 'react';

export interface FooterProps {
  /** Navigation items */
  items?: {
    key: React.Key;
    component: React.ComponentType<{ className: string }>;
  }[];
  /** Collection of logos */
  logos?: {
    key: React.Key;
    component: React.ComponentType<{ key: React.Key; className: string }>;
  }[];
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
        {logos && (
          <div className="ds-flex ds-flex-col ds-gap-6 ds-px-5 sm:ds-flex-row sm:ds-px-0">
            {logos.map((logo) => (
              <logo.component
                key={logo.key}
                className={`ds-flex ds-h-10 ds-w-full ds-items-center ds-justify-center ds-border-2 ds-border-solid ds-outline-none ds-transition ${
                  variant === 'light'
                    ? 'ds-border-black ds-text-black hover:ds-bg-black hover:ds-text-white focus:ds-bg-black focus:ds-text-white'
                    : 'ds-border-white ds-text-white hover:ds-bg-white hover:ds-text-black focus:ds-bg-white focus:ds-text-black'
                }`}
              />
            ))}
          </div>
        )}
        {copyright && <div className="ds-mt-9 ds-flex ds-justify-end ds-px-5 sm:ds-px-0">{copyright}</div>}
      </div>
    </footer>
  );
});
