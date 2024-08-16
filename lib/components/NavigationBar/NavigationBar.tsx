import { useMediaQueries } from '../../hooks/useMediaQueries';

export interface NavigationBarLinkProps {
  className?: string;
  role?: string;
  title?: string;
  children: React.ReactNode;
}

export type NavigationBarLink = React.ComponentType<NavigationBarLinkProps>;

export interface NavigationBarProps {
  /** Navigation logo */
  logo: React.ReactNode;
  /** Place for menu opener button */
  menuComponent?: React.ReactNode;
  /** For language selection button **/
  onLanguageClick?: () => void;
  /** Navigation avatar */
  user?: {
    name: string;
    component: NavigationBarLink;
  };
  login: {
    url: string;
    text: string;
  };
}

/**
 * This component is a navigation bar that displays a logo, and an avatar.
 */
export const NavigationBar = ({ logo, menuComponent, onLanguageClick, user, login }: NavigationBarProps) => {
  const { sm } = useMediaQueries();

  const initials = user?.name
    .split(' ')
    .map((part) => part[0])
    .splice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="ds-min-w-min ds-shadow-border ds-bg-white">
      <nav
        role="navigation"
        className="ds-mx-auto ds-flex ds-h-[56px] ds-items-center ds-justify-between ds-gap-4 ds-px-7 ds-py-3 ds-font-semibold lg:ds-container"
      >
        {logo}
        <ul className="ds-inline-flex ds-items-center ds-gap-3 sm:ds-gap-5">
          {menuComponent && sm && <li>{menuComponent}</li>}
          <li className="ds-ml-5">
            <button
              className="ds-flex ds-h-8 ds-w-8 ds-items-center ds-justify-center ds-rounded-full ds-bg-bg-gray-2"
              onClick={onLanguageClick}
            >
              <span className="material-symbols-outlined size-24 ds-select-none ds-text-black">language</span>
            </button>
          </li>
          <li>
            {user ? (
              <user.component
                className="ds-flex ds-h-8 ds-w-8 ds-items-center ds-justify-center ds-rounded-full ds-bg-secondary-3 ds-text-white"
                role="img"
                title={user.name}
              >
                {initials}
              </user.component>
            ) : (
              <a
                href={login.url}
                className="ds-flex ds-h-8 ds-w-8 ds-items-center ds-justify-center ds-rounded-full ds-bg-bg-gray-2"
              >
                <span className="material-symbols-outlined size-24 ds-select-none ds-text-black">person</span>
              </a>
            )}
          </li>
          {menuComponent && !sm && <li className="ds-ml-3">{menuComponent}</li>}
        </ul>
      </nav>
    </div>
  );
};
