import { tidyClasses as tc } from '../../utils';
import { Accordion } from '../Accordion/Accordion';
import { MenuList, type MenuListProps } from '../NavigationMenu';

export interface PageNavigationProps extends MenuListProps {
  className?: string;
}

export const PageNavigation = (props: PageNavigationProps) => {
  const { collapsed, menuSection, className = '', testId, hideAccentBorder = true } = props;
  const title = menuSection?.title ?? '';

  return (
    <div className={tc(['ds:p-4 ds:bg-white ds:rounded-md', className])} data-testid={testId}>
      {collapsed ? (
        <Accordion
          ariaLabel={title}
          title={<span className="ds:text-body-sm">{title}</span>}
          initialState={false}
          testId={`${testId}-accordion`}
        >
          <div className="ds:mt-4 ds:ml-4">
            <MenuList
              {...props}
              hideAccentBorder={hideAccentBorder}
              menuSection={menuSection ? { ...menuSection, title: undefined } : undefined}
            />
          </div>
        </Accordion>
      ) : (
        <MenuList {...props} hideAccentBorder={hideAccentBorder} />
      )}
    </div>
  );
};
