import React from 'react';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { LogoRgbEn, LogoRgbFi, LogoRgbSv } from '../../main';

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
  const { md } = useMediaQueries();

  return (
    <div className="ds:min-w-min ds:shadow-border ds:bg-white">
      <nav
        role="navigation"
        className="ds:flex ds:items-center ds:gap-5 ds:mx-auto ds:h-11 ds:px-6 ds:py-3 ds:font-semibold ds:xl:container"
      >
        {menuComponent && (
          <ul>
            <li>{menuComponent}</li>
          </ul>
        )}
        {md && (
          <div className="ds:flex ds:grow ds:justify-center">
            <Link to={logo.to}>
              <div className="ds:inline-flex ds:select-none ds:items-center ds:p-3">
                <LogoRgb language={logo.language} size={26} />
                <span className="ds:sr-only">{logo.srText}</span>
              </div>
            </Link>
          </div>
        )}
        <ul className="ds:inline-flex ds:items-center ds:gap-5 ds:ml-auto">
          {md && languageButtonComponent && (
            <li className="ds:ml-5" ref={refs?.langMenuButtonRef}>
              {languageButtonComponent}
            </li>
          )}
          {userButtonComponent && <li>{userButtonComponent}</li>}
        </ul>
      </nav>
    </div>
  );
};
