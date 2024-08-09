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
export const NavigationBar = ({ logo, menuComponent, user, login }: NavigationBarProps) => {
  const { sm } = useMediaQueries();

  const initials = user?.name
    .split(' ')
    .map((part) => part[0])
    .splice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="min-w-min shadow-border bg-white">
      <nav
        role="navigation"
        className="mx-auto flex h-[56px] items-center justify-between gap-4 px-7 py-3 font-semibold lg:container"
      >
        {logo}
        <ul className="inline-flex items-center gap-3 sm:gap-5">
          {menuComponent && sm && <li>{menuComponent}</li>}
          {/** TODO: Language selection */}
          <li className="ml-5 flex h-8 w-8 items-center justify-center rounded-full bg-bg-gray-2">
            <span className="material-symbols-outlined size-24 select-none text-black">language</span>
          </li>
          <li>
            {user ? (
              <user.component
                className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-3 text-white"
                role="img"
                title={user.name}
              >
                {initials}
              </user.component>
            ) : (
              <a href={login.url} className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-gray-2">
                <span className="material-symbols-outlined size-24 select-none text-black">person</span>
              </a>
            )}
          </li>
          {menuComponent && !sm && <li className="ml-3">{menuComponent}</li>}
        </ul>
      </nav>
    </div>
  );
};
