export interface NavigationBarLinkProps {
  className?: string;
  children: React.ReactNode;
}

export type NavigationBarLink = React.ComponentType<NavigationBarLinkProps>;

export interface NavigationBarProps {
  /** Navigation items */
  items?: {
    text: string;
    active: boolean;
    component: NavigationBarLink;
  }[];
  /** Navigation avatar */
  user?: {
    name: string;
    src: string;
    component?: NavigationBarLink;
  };
}

/**
 * This component is a navigation bar that displays a logo, navigation items, and an avatar.
 */
export const NavigationBar = ({ items, user }: NavigationBarProps) => (
  <div className="min-w-min border-b-2 border-[#808080] bg-[#FFFFFFE5]">
    <nav className="mx-auto flex h-[72px] items-center justify-between gap-4 p-4 font-semibold lg:container">
      <div className="inline-flex select-none items-center gap-2 text-[24px] leading-[140%] text-[#888]">
        <div className="h-8 w-8 bg-[#808080]"></div>JOD
      </div>
      {(items ?? user) && (
        <ul className="inline-flex items-center gap-4">
          {items?.map((item, index) => (
            <li key={index}>
              <item.component
                aria-current={item.active ? 'location' : undefined}
                className={`block rounded-lg px-4 py-2 ${item.active ? 'bg-[#697077] text-white' : 'hover:bg-[#edeff0] focus:bg-[#edeff0]'}`}
              >
                {item.text}
              </item.component>
            </li>
          ))}
          {user && (
            <li>
              {user.component ? (
                <user.component className="block h-[40px] w-[40px] rounded-full">
                  <img className="rounded-full" src={user.src} alt={user.name} />
                </user.component>
              ) : (
                <img className="block h-[40px] w-[40px] rounded-full" src={user.src} alt={user.name} />
              )}
            </li>
          )}
        </ul>
      )}
    </nav>
  </div>
);
