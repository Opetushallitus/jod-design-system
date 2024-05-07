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
}

/**
 * This component is a footer that displays navigation items, logos, and a copyright.
 */
export const Footer = forwardRef<HTMLDivElement, FooterProps>(function Footer(
  { items, logos, copyright, variant = 'light' }: FooterProps,
  ref,
) {
  return (
    <footer
      ref={ref}
      className={`py-9 text-button-md sm:px-6 print:hidden ${variant === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}
    >
      <div className="mx-auto flex flex-col gap-9 sm:max-w-[1090px]">
        {items && (
          <ul className="px-5 sm:px-4">
            {items?.map((item) => (
              <li key={item.key} className="px-2 py-[6px]">
                <item.component className="hover:underline" />
              </li>
            ))}
          </ul>
        )}
        {logos && (
          <div className="flex flex-col gap-6 px-5 sm:flex-row sm:px-0">
            {logos.map((logo) => (
              <logo.component
                key={logo.key}
                className={`flex h-10 w-full items-center justify-center border-2 border-solid outline-none transition ${
                  variant === 'light'
                    ? 'border-black text-black hover:bg-black hover:text-white focus:bg-black focus:text-white'
                    : 'border-white text-white hover:bg-white hover:text-black focus:bg-white focus:text-black'
                }`}
              />
            ))}
          </div>
        )}
        {copyright && <div className="mt-9 flex justify-end px-5 sm:px-0">{copyright}</div>}
      </div>
    </footer>
  );
});
