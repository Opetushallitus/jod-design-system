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
  /** Navigation items */
  items?: {
    text: string;
    active: boolean;
    component: NavigationBarLink;
  }[];
  /** Navigation avatar */
  user?: {
    name: string;
    component?: NavigationBarLink;
  };
}

/**
 * This component is a navigation bar that displays a logo, navigation items, and an avatar.
 */
export const NavigationBar = ({ logo, items, user }: NavigationBarProps) => {
  const initials = user?.name
    .split(' ')
    .map((part) => part[0])
    .splice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="min-w-min border-b-[4px] border-inactive-gray bg-[#FFFFFFE5]">
      <nav className="mx-auto flex h-[68px] items-center justify-between gap-4 px-[72px] py-[14px] font-semibold lg:container">
        {logo}
        {(items ?? user) && (
          <ul className="inline-flex items-center gap-6">
            {items?.map((item, index) => (
              <li key={index}>
                <item.component
                  aria-current={item.active ? 'location' : undefined}
                  className={`flex items-center gap-3 rounded-lg px-5 py-2 ${item.active ? 'text-accent' : 'text-primary-gray'}`}
                >
                  {item.active && <div className="h-5 w-5 rounded-full bg-accent" />}
                  {item.text}
                </item.component>
              </li>
            ))}
            {user ? (
              <li className="ml-6">
                {user.component ? (
                  <user.component
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white"
                    role="img"
                    title={user.name}
                  >
                    {initials}
                  </user.component>
                ) : (
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white"
                    role="img"
                    title={user.name}
                  >
                    {initials}
                  </div>
                )}
              </li>
            ) : (
              <span className="material-symbols-outlined size-48 m-[-4px] select-none text-primary-gray">
                account_circle
              </span>
            )}
          </ul>
        )}
      </nav>
    </div>
  );
};
