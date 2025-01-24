import React, { forwardRef } from 'react';
import {
  LogoEuEn,
  LogoEuFi,
  LogoEuSv,
  LogoKehaEn,
  LogoKehaFi,
  LogoKehaSv,
  LogoOkmEn,
  LogoOkmFiSv,
  LogoOphEn,
  LogoOphFiSv,
  LogoTemEn,
  LogoTemFiSv,
} from './logos';

export interface FooterProps {
  /** Navigation items */
  items?: {
    key: React.Key;
    component: React.ComponentType<{ className: string }>;
  }[];
  /** Language of the logos */
  language?: string;
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
  { items, language, copyright, variant = 'light', className = '' }: FooterProps,
  ref,
) {
  const logos = React.useMemo(() => {
    switch (language) {
      case 'sv':
        return [
          <div key="LogoEuSv" className="ds:flex">
            <LogoEuSv className="ds:h-10 ds:max-w-full" />
          </div>,
          <div key="LogoOkmFiSv" className="ds:flex">
            <LogoOkmFiSv className="ds:h-10 ds:max-w-full" />
          </div>,
          <div key="LogoTemFiSv" className="ds:flex">
            <LogoTemFiSv className="ds:h-10 ds:max-w-full" />
          </div>,
          <div key="LogoKehaSv" className="ds:flex">
            <LogoKehaSv className="ds:h-10 ds:max-w-full" />
          </div>,
          <div key="LogoOphFiSv" className="ds:flex">
            <LogoOphFiSv className="ds:h-10 ds:max-w-full" />
          </div>,
        ];
      case 'en':
        return [
          <div key="LogoEuEn" className="ds:flex">
            <LogoEuEn className="ds:h-10 ds:max-w-full" />
          </div>,
          <div key="LogoOkmEn" className="ds:flex">
            <LogoOkmEn className="ds:h-10 ds:max-w-full" />
          </div>,
          <div key="LogoTemEn" className="ds:flex">
            <LogoTemEn className="ds:h-10 ds:max-w-full" />
          </div>,
          <div key="LogoKehaEn" className="ds:flex">
            <LogoKehaEn className="ds:h-10 ds:max-w-full" />
          </div>,
          <div key="LogoOphEn" className="ds:flex">
            <LogoOphEn className="ds:h-10 ds:max-w-full" />
          </div>,
        ];
      default:
        return [
          <div key="LogoEuFi" className="ds:flex">
            <LogoEuFi className="ds:h-10 ds:max-w-full" />
          </div>,
          <div key="LogoOkmFiSv" className="ds:flex">
            <LogoOkmFiSv className="ds:h-10 ds:max-w-full" />
          </div>,
          <div key="LogoTemFiSv" className="ds:flex">
            <LogoTemFiSv className="ds:h-10 ds:max-w-full" />
          </div>,
          <div key="LogoKehaFi" className="ds:flex">
            <LogoKehaFi className="ds:h-10 ds:max-w-full" />
          </div>,
          <div key="LogoOphFiSv" className="ds:flex">
            <LogoOphFiSv className="ds:h-10 ds:max-w-full" />
          </div>,
        ];
    }
  }, [language]);

  return (
    <footer
      ref={ref}
      className={`ds:py-9 ds:text-button-md ds:sm:px-6 ds:print:hidden ${variant === 'light' ? 'ds:bg-white ds:text-black' : 'ds:bg-black ds:text-white'} ${className}`.trim()}
    >
      <div className="ds:mx-auto ds:flex ds:flex-col ds:gap-9 ds:sm:max-w-[1090px]">
        {items && (
          <ul className="ds:px-5 ds:sm:px-4">
            {items?.map((item) => (
              <li key={item.key} className="ds:px-2 ds:py-[6px]">
                <item.component className="ds:hover:underline" />
              </li>
            ))}
          </ul>
        )}
        <div className="ds:px-5 ds:sm:px-0 ds:grid ds:sm:grid-cols-3 ds:gap-6 ds:sm:gap-9 ds:items-center">{logos}</div>
        {copyright && <div className="ds:mt-9 ds:flex ds:justify-end ds:px-5 ds:sm:px-0">{copyright}</div>}
      </div>
    </footer>
  );
});
