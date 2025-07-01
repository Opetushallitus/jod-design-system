import React from 'react';
import { cx } from '../../cva';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { type ServiceVariant, tidyClasses as tc } from '../../utils';
import { LogoIconRgb } from '../Logo/LogoIcon';
import { LogoRgb } from '../Logo/LogoRgb';

export interface NavigationBarLinkProps {
  className?: string;
  role?: string;
  title?: string;
  children: React.ReactNode;
}

type ServiceBarProps =
  | {
      /** Should the service bar be displayed under the navigation bar */
      showServiceBar: true;
      /** Service variant for styling */
      serviceBarVariant: ServiceVariant;
      /** Service bar title */
      serviceBarTitle?: string;
      /** Component to display on the right side of the service bar */
      serviceBarContent?: React.ReactNode;
    }
  | {
      showServiceBar?: false;
      serviceBarVariant?: never;
      serviceBarTitle?: never;
      serviceBarContent?: never;
    };

export type NavigationBarLink = React.ComponentType<NavigationBarLinkProps>;

export type NavigationBarProps = {
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
} & ServiceBarProps;

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
  showServiceBar,
  serviceBarVariant,
  serviceBarTitle,
  serviceBarContent,
}: NavigationBarProps) => {
  const { sm } = useMediaQueries();

  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceBarBackground = cx({
    'ds:bg-secondary-1-dark': !serviceBarVariant || serviceBarVariant === 'yksilo',
    'ds:bg-secondary-2-dark': serviceBarVariant === 'ohjaaja',
    'ds:bg-secondary-3-dark': serviceBarVariant === 'palveluportaali',
    'ds:bg-secondary-4-dark': serviceBarVariant === 'tietopalvelu',
  });

  const serviceBarContents = (
    <>
      {serviceBarTitle ? <span>{serviceBarTitle}</span> : null}
      {serviceBarContent ? <div>{serviceBarContent}</div> : null}
    </>
  );

  return (
    <>
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
      {showServiceBar && (
        <div
          className={tc([
            'ds:fixed',
            'ds:w-full',
            'ds:flex',
            'ds:items-center',
            'ds:justify-between',
            'ds:px-5',
            'ds:sm:px-9',
            'ds:text-white',
            'ds:text-[12px]',
            'ds:sm:text-[14px]',
            'ds:transition-[height]',
            'ds:duration-300',
            scrolled ? 'ds:h-2' : 'ds:h-8',
            serviceBarBackground,
          ])}
        >
          {scrolled ? null : serviceBarContents}
        </div>
      )}
    </>
  );
};
