import React from 'react';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { LogoIconRgb, LogoRgbEn, LogoRgbFi, LogoRgbSv } from '../../main';

export interface NavigationBarLinkProps {
  className?: string;
  role?: string;
  title?: string;
  children: React.ReactNode;
}

export type NavigationBarLink = React.ComponentType<NavigationBarLinkProps>;

export interface NavigationBarProps {
  /** Place for menu opener button */
  menuComponent?: React.ReactNode;
  /** For language selection button **/
  languageButtonComponent?: React.ReactNode;
  /** For user logout button **/
  userButtonComponent?: React.ReactNode;
  /** For navigation link component */
  renderLink: React.ComponentType<{
    to: object | string;
    className?: string;
    children: React.ReactNode;
  }>;
  logo: {
    to: object | string;
    language: string;
    srText: string;
  };
  /** HTML Element refs */
  refs?: {
    langMenuButtonRef: React.Ref<HTMLLIElement>;
  };
}

const LogoRgb = ({ language, size }: { language: string; size: number }) => {
  switch (language) {
    case 'sv':
      return <LogoRgbSv size={size} />;
    case 'en':
      return <LogoRgbEn size={size} />;
    default:
      return <LogoRgbFi size={size} />;
  }
};

/**
 * This component is a navigation bar that displays a logo, and an avatar.
 */
export const NavigationBar = ({
  menuComponent,
  languageButtonComponent,
  userButtonComponent,
  renderLink: Link,
  logo,
  refs,
}: NavigationBarProps) => {
  const { sm } = useMediaQueries();

  return (
    <div className="ds:min-w-min ds:shadow-border ds:bg-white">
      <nav
        role="navigation"
        className="ds:mx-auto ds:flex ds:h-11 ds:items-center ds:gap-4 ds:px-5 ds:sm:px-7 ds:py-3 ds:font-semibold ds:xl:container"
      >
        <Link to={logo.to} className="ds:flex">
          <div className="ds:inline-flex ds:select-none ds:items-center ds:p-3">
            {sm ? <LogoRgb language={logo.language} size={32} /> : <LogoIconRgb size={32} />}
            <span className="ds:sr-only">{logo.srText}</span>
          </div>
        </Link>
        <ul className="ds:inline-flex ds:items-center ds:gap-3 ds:sm:gap-5 ds:ml-auto">
          {menuComponent && <li className="ds:ml-3 ds:sm:ml-0">{menuComponent}</li>}
          {sm && (
            <>
              {languageButtonComponent && (
                <li className="ds:ml-5" ref={refs?.langMenuButtonRef}>
                  {languageButtonComponent}
                </li>
              )}
              {userButtonComponent && <li>{userButtonComponent}</li>}
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};
