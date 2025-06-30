import React from 'react';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { LogoIconRgb } from '../Logo/LogoIcon';
import { LogoRgb } from '../Logo/LogoRgb';

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
    <div className="ds:min-w-min ds:shadow-border ds:bg-white ds:font-poppins ds:text-menu">
      <nav
        role="navigation"
        className="ds:flex ds:items-center ds:justify-between ds:gap-5 ds:mx-auto ds:h-11 ds:px-5 ds:py-3 ds:font-semibold ds:xl:container"
      >
        <div>
          <div className="ds:flex ds:grow ds:justify-center">
            <Link to={logo.to}>
              <div className="ds:inline-flex ds:select-none ds:items-center ds:p-3">
                {sm ? <LogoRgb language={logo.language} size={26} /> : <LogoIconRgb size={39} />}
                <span className="ds:sr-only">{logo.srText}</span>
              </div>
            </Link>
          </div>
        </div>
        <div className="ds:flex ds:items-center">
          <ul className="ds:inline-flex ds:items-center ds:gap-5 ds:ml-auto">
            {languageButtonComponent && <li ref={refs?.langMenuButtonRef}>{languageButtonComponent}</li>}
            {userButtonComponent && <li>{userButtonComponent}</li>}
            {menuComponent && <li>{menuComponent}</li>}
          </ul>
        </div>
      </nav>
    </div>
  );
};
