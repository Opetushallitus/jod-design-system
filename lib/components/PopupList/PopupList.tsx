import React from 'react';

export interface PopupListProps {
  children: React.ReactNode;
  classNames?: string;
  testId?: string;
}

/**
 * Where a PopupListItem is rendered:
 * - 'list': a direct child of PopupList, so it renders the list item itself.
 * - 'item': inside a list item that PopupList created (e.g. inside a link), so it renders a plain element.
 * - undefined: outside a PopupList, so it renders a plain element.
 */
const PopupListContext = React.createContext<'list' | 'item' | undefined>(undefined);

/**
 * Marks a component that renders its own `<li>` element(s), so PopupList does not wrap it in another one.
 * For internal use, e.g. `MyItems.rendersPopupListItems = true`.
 */
export type PopupListItemsComponent = { rendersPopupListItems?: boolean };

/** Flattens fragments, so that each option inside a fragment becomes its own list item. */
const flattenChildren = (children: React.ReactNode, keyPrefix = ''): React.ReactNode[] =>
  React.Children.toArray(children).flatMap((child) => {
    if (!React.isValidElement<{ children?: React.ReactNode }>(child)) {
      return [child];
    }
    const key = `${keyPrefix}${child.key}`;
    return child.type === React.Fragment
      ? flattenChildren(child.props.children, key)
      : [React.cloneElement(child, { key })];
  });

const rendersListItem = (child: React.ReactNode) =>
  React.isValidElement(child) &&
  (child.type === 'li' || Boolean((child.type as PopupListItemsComponent).rendersPopupListItems));

/** Popup lists allow users to choose from a list of options in a limited space. The list of options can change based on the context. */
export const PopupList = ({ children, classNames = '', testId }: PopupListProps) => {
  return (
    <ul
      className={`ds:inline-flex ds:flex-col ds:items-start ds:list-none ds:rounded-lg ds:bg-white ds:py-6 ds:px-4 ds:shadow-border ds:w-[229px] ${classNames}`.trim()}
      data-testid={testId}
    >
      <PopupListContext.Provider value="list">
        {/* Every option is a list item, so screen readers announce the number of options. */}
        {flattenChildren(children).map((child, index) =>
          rendersListItem(child) ? (
            child
          ) : (
            <li
              key={React.isValidElement(child) ? child.key : index}
              className="ds:flex ds:flex-col ds:items-start ds:w-full"
            >
              <PopupListContext.Provider value="item">{child}</PopupListContext.Provider>
            </li>
          ),
        )}
      </PopupListContext.Provider>
    </ul>
  );
};

export const PopupListItem = ({ children, classNames = '', testId }: PopupListProps) => {
  const context = React.useContext(PopupListContext);
  const Element = context === 'list' ? 'li' : 'div';
  return (
    <Element
      className={`ds:flex ds:items-center ds:gap-3 ds:py-3 ds:text-heading-4 ds:hover:underline ds:focus:left-auto ds:focus:underline ds:w-full ds:px-5 ds:rounded ${classNames}`.trim()}
      data-testid={testId}
    >
      {children}
    </Element>
  );
};
(PopupListItem as PopupListItemsComponent).rendersPopupListItems = true;
