import React from 'react';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { usePopupMenu } from '../../hooks/usePopupMenu';
import { JodCaretDown, JodCaretUp, JodUser } from '../../icons';
import { LinkComponent } from '../../main';
import {
  getAccentBgClassForService,
  getPressedBgColorClassForService,
  ServiceVariant,
  tidyClasses as tc,
} from '../../utils';
import { PopupList, PopupListItem } from '../PopupList/PopupList';

interface UserButtonLinkComponent extends LinkComponent {
  'data-testid': string;
}

export interface UserButtonProps {
  serviceVariant: ServiceVariant;
  firstName?: string;
  isProfileActive: boolean;
  profileLabel: string;
  profileLinkComponent: (props: { onClick: () => void } & UserButtonLinkComponent) => React.ReactElement;
  isLoggedIn: boolean;
  loginLabel: string;
  loginLinkComponent: (props: UserButtonLinkComponent) => React.ReactElement;
  logoutLabel: string;
  onLogout: () => void;
}

export const UserButton = ({
  serviceVariant,
  firstName,
  isProfileActive,
  profileLabel,
  profileLinkComponent,
  isLoggedIn,
  loginLabel,
  loginLinkComponent,
  logoutLabel,
  onLogout,
}: UserButtonProps): React.ReactElement => {
  const { md } = useMediaQueries();

  const { isOpen: userMenuOpen, close: closeUserMenu, triggerProps, menuProps } = usePopupMenu();

  const carets = md ? <>{userMenuOpen ? <JodCaretUp size={20} /> : <JodCaretDown size={20} />}</> : null;

  const username = firstName && firstName.length > 10 ? `${firstName.slice(0, 10)}…` : firstName;

  const profileLinkActiveClasses = `ds:text-white ${getPressedBgColorClassForService(serviceVariant)} ${getAccentBgClassForService(serviceVariant)}`;

  return isLoggedIn ? (
    <div className="ds:relative" data-testid="user-button">
      <button
        {...triggerProps}
        className="ds:flex ds:flex-col ds:md:flex-row ds:justify-center ds:items-center ds:select-none ds:cursor-pointer ds:gap-2 ds:md:gap-3"
        data-testid="user-button-trigger"
      >
        <JodUser className="ds:mx-auto" />
        <span
          className="ds:whitespace-nowrap ds:md:text-[14px] ds:sm:text-[12px] ds:text-[10px] ds:font-semibold"
          aria-label={firstName}
        >
          {username}
        </span>
        {carets}
      </button>
      {userMenuOpen && (
        <div
          {...menuProps}
          className="ds:z-60 ds:absolute ds:right-0 ds:min-w-max ds:translate-y-8 ds:transform"
          data-testid="user-menu"
        >
          <PopupList classNames="ds:gap-2">
            {profileLinkComponent({
              onClick: closeUserMenu,
              'data-testid': 'user-menu-profile',
              className: tc([
                'ds:w-full',
                'ds:rounded-sm',
                'ds:hover:underline',
                !isProfileActive ? 'ds:hover:bg-bg-gray' : '',
                isProfileActive ? profileLinkActiveClasses : '',
              ]),
              children: <PopupListItem>{profileLabel}</PopupListItem>,
            })}
            <button
              type="button"
              onClick={() => {
                closeUserMenu();
                onLogout();
              }}
              className="ds:cursor-pointer ds:w-full ds:hover:bg-bg-gray"
              data-testid="user-menu-logout"
            >
              <PopupListItem classNames="ds:w-full">{logoutLabel}</PopupListItem>
            </button>
          </PopupList>
        </div>
      )}
    </div>
  ) : (
    loginLinkComponent({
      className:
        'ds:flex ds:flex-col ds:md:flex-row ds:gap-2 ds:md:gap-3 ds:justify-center ds:items-center ds:select-none ds:cursor-pointer',
      'data-testid': 'user-login-link',
      children: (
        <>
          <JodUser className="ds:mx-auto" />
          <span className="ds:whitespace-nowrap ds:md:text-[14px] ds:sm:text-[12px] ds:text-[10px] ds:font-semibold">
            {loginLabel}
          </span>
        </>
      ),
    })
  );
};
