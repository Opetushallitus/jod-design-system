import { ActiveIndicator } from '../ActiveIndicator/ActiveIndicator';

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
    key: React.Key;
    text: string;
    active: boolean;
    component: NavigationBarLink;
  }[];
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
 * This component is a navigation bar that displays a logo, navigation items, and an avatar.
 */
export const NavigationBar = ({ logo, items, user, login }: NavigationBarProps) => {
  const initials = user?.name
    .split(' ')
    .map((part) => part[0])
    .splice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="min-w-min border-b-[4px] border-inactive-gray bg-[#FFFFFFE5]">
      <nav
        role="navigation"
        className="mx-auto flex h-[68px] items-center justify-between gap-4 px-[72px] py-[14px] font-semibold lg:container"
      >
        {logo}
        <ul className="inline-flex items-center gap-6">
          {items?.map((item) => (
            <li key={item.key}>
              <item.component
                aria-current={item.active ? 'location' : undefined}
                className={`flex items-center gap-3 rounded-lg px-5 py-2 ${item.active ? 'text-accent' : 'text-black'}`}
              >
                {item.active && <ActiveIndicator />}
                {item.text}
              </item.component>
            </li>
          ))}
          <li className="ml-6">
            {user ? (
              <user.component
                className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white"
                role="img"
                title={user.name}
              >
                {initials}
              </user.component>
            ) : (
              <a href={login.url} className="flex h-8 w-8 items-center justify-center rounded-full">
                {/* Copyright 2020 Google LLC; http://www.apache.org/licenses/LICENSE-2.0 */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="80 -880 800 800"
                  className="rounded-full fill-black"
                  role="img"
                  aria-label={login.text}
                >
                  <path d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm257.81-195q-57.81 0-97.31-39.69-39.5-39.68-39.5-97.5 0-57.81 39.69-97.31 39.68-39.5 97.5-39.5 57.81 0 97.31 39.69 39.5 39.68 39.5 97.5 0 57.81-39.69 97.31-39.68 39.5-97.5 39.5Zm.66 370Q398-80 325-111.5t-127.5-86q-54.5-54.5-86-127.27Q80-397.53 80-480.27 80-563 111.5-635.5q31.5-72.5 86-127t127.27-86q72.76-31.5 155.5-31.5 82.73 0 155.23 31.5 72.5 31.5 127 86t86 127.03q31.5 72.53 31.5 155T848.5-325q-31.5 73-86 127.5t-127.03 86Q562.94-80 480.47-80Zm-.47-60q55 0 107.5-16T691-212q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480-140Zm0-370q34 0 55.5-21.5T557-587q0-34-21.5-55.5T480-664q-34 0-55.5 21.5T403-587q0 34 21.5 55.5T480-510Zm0-77Zm0 374Z" />
                </svg>
              </a>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};
