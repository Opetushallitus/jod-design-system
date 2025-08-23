import type { TestIdProps } from '../../utils';
import { tidyClasses as tc } from '../../utils';
import { MenuList, type MenuListProps } from '../NavigationMenu';

export type PageNavigationProps = MenuListProps &
  TestIdProps & {
    className?: string;
  };

export const PageNavigation = (props: PageNavigationProps) => {
  return (
    <div className={tc(`ds:p-6 ds:bg-white ds:rounded-lg ${props.className}`)} data-testid={props.dataTestId}>
      <MenuList hideAccentBorder={props.hideAccentBorder ?? true} {...props} />
    </div>
  );
};
