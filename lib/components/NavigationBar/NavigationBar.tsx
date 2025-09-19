import React from 'react';
import { useCollapseOnScroll } from '../../hooks/useCollapseOnScroll';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { getAccentBgClassForService, type ServiceVariant, tidyClasses as tc } from '../../utils';
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
  /** Test id for querying in tests */
  dataTestId?: string;
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
  dataTestId,
}: NavigationBarProps) => {
  const { sm, lg, xl } = useMediaQueries();
  const [serviceBarCollapsed, setServiceBarCollapsed] = React.useState(false);

  const onCollapse = React.useCallback(() => {
    setServiceBarCollapsed(true);
  }, []);

  const onUncollapse = React.useCallback(() => {
    setServiceBarCollapsed(false);
  }, []);

  useCollapseOnScroll({
    onCollapse,
    onUncollapse,
  });

  const serviceBarContents = (
    <>
      {serviceBarTitle ? <span>{serviceBarTitle}</span> : null}
      {serviceBarContent ? <div>{serviceBarContent}</div> : null}
    </>
  );

  return (
    <>
      <div
        className="ds:min-w-min ds:shadow-border ds:bg-white ds:font-poppins ds:text-menu ds:relative"
        data-testid={dataTestId}
      >
        <nav
          role="navigation"
          className="ds:flex ds:items-center ds:justify-between ds:gap-5 ds:mx-auto ds:h-11 ds:px-5 ds:py-3 ds:font-semibold ds:xl:container"
          data-testid={dataTestId ? `${dataTestId}-nav` : undefined}
        >
          <div>
            <div className="ds:flex ds:grow ds:justify-center ds:items-center ds:flex-direction-row">
              <Link to={logo.to}>
                <div
                  className="ds:inline-flex ds:select-none ds:items-center ds:p-3"
                  data-testid={dataTestId ? `${dataTestId}-logo` : undefined}
                >
                  {sm ? <LogoRgb language={logo.language} size={26} /> : <LogoIconRgb size={39} />}
                  <span className="ds:sr-only">{logo.srText}</span>
                </div>
              </Link>
              <div className="ds:flex ds:items-center ds:bg-secondary-3 ds:rounded ds:px-3 ds:mx-2 ds:h-6 ds:text-[12px]">
                {'Beta'}
              </div>
              {(lg || xl) && <div className="ds:text-secondary-gray ds:font-normal ds:ml-2">{'Testausversio'}</div>}
            </div>
          </div>
          <div className="ds:flex ds:items-center">
            <ul
              className="ds:inline-flex ds:items-center ds:gap-5 ds:ml-auto"
              data-testid={dataTestId ? `${dataTestId}-actions` : undefined}
            >
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
            'ds:duration-100',
            serviceBarCollapsed ? 'ds:h-2' : 'ds:h-8',
            getAccentBgClassForService(serviceBarVariant),
          ])}
          data-testid={dataTestId ? `${dataTestId}-servicebar` : undefined}
        >
          {serviceBarCollapsed ? null : serviceBarContents}
        </div>
      )}
    </>
  );
};
