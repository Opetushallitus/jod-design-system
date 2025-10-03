import React from 'react';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { usePopupMenu } from '../../hooks/usePopupMenu';
import { JodCaretDown, JodCaretUp, JodUser } from '../../icons';
import { LinkComponent } from '../../main';
import { PopupList, PopupListItem } from '../PopupList/PopupList';

interface UserButtonProps {
  firstName?: string;
  profileLabel: string;
  ProfileLinkComponent: React.ComponentType<LinkComponent & { onClick: () => void }>;
  isLoggedIn: boolean;
  loginLabel: string;
  LoginLinkComponent: React.ComponentType<LinkComponent>;
  logoutLabel: string;
  onLogout: () => void;
}

export const UserButton = ({
  firstName,
  profileLabel,
  ProfileLinkComponent,
  isLoggedIn,
  loginLabel,
  LoginLinkComponent,
  logoutLabel,
  onLogout,
}: UserButtonProps) => {
  const { md } = useMediaQueries();

  const { isOpen: userMenuOpen, close: closeUserMenu, triggerProps, menuProps } = usePopupMenu();

  const carets = md ? <>{userMenuOpen ? <JodCaretUp size={20} /> : <JodCaretDown size={20} />}</> : null;

  return isLoggedIn ? (
    <div className="ds:relative" data-testid="user-button">
      <button
        {...triggerProps}
        className="ds:flex ds:flex-col ds:md:flex-row ds:justify-center ds:items-center ds:select-none ds:cursor-pointer ds:gap-2 ds:md:gap-3"
        data-testid="user-button-trigger"
      >
        <JodUser className="ds:mx-auto" />
        <span className="ds:whitespace-nowrap ds:md:text-[14px] ds:sm:text-[12px] ds:text-[10px]">{firstName}</span>
        {carets}
      </button>
      {userMenuOpen && (
        <div
          {...menuProps}
          className="ds:z-60 ds:absolute ds:right-0 ds:min-w-max ds:translate-y-8 ds:transform"
          data-testid="user-menu"
        >
          <PopupList classNames="ds:gap-2">
            <ProfileLinkComponent onClick={closeUserMenu} className="" data-testid="user-menu-profile">
              <PopupListItem>{profileLabel}</PopupListItem>
            </ProfileLinkComponent>

            <button
              type="button"
              onClick={() => {
                closeUserMenu();
                onLogout();
              }}
              className="ds:cursor-pointer ds:w-full"
              data-testid="user-menu-logout"
            >
              <PopupListItem classNames="ds:w-full">{logoutLabel}</PopupListItem>
            </button>
          </PopupList>
        </div>
      )}
    </div>
  ) : (
    <LoginLinkComponent
      className="ds:flex ds:flex-col ds:md:flex-row ds:gap-2 ds:md:gap-3 ds:justify-center ds:items-center ds:select-none ds:cursor-pointer"
      data-testid="user-login-link"
    >
      <JodUser className="ds:mx-auto" />
      <span className="ds:whitespace-nowrap ds:md:text-[14px] ds:sm:text-[12px] ds:text-[10px]">{loginLabel}</span>
    </LoginLinkComponent>
  );
};
