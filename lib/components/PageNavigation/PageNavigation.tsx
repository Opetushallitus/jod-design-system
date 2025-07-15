import { tidyClasses as tc } from '../../utils';
import { MenuList, type MenuListProps } from '../NavigationMenu';

export type PageNavigationProps = MenuListProps & {
  className?: string;
};

export const PageNavigation = (props: PageNavigationProps) => {
  return (
    <div className={tc(`ds:p-6 ds:bg-white ds:rounded-lg ${props.className}`)}>
      <MenuList hideAccentBorder={props.hideAccentBorder ?? true} {...props} />
    </div>
  );
};
