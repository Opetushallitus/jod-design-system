export interface PopupListProps {
  children: React.ReactNode;
  classNames?: string;
}

export type PopupListItemProps = PopupListProps;

/** Popup lists allow users to choose from a list of options in a limited space. The list of options can change based on the context. */
export const PopupList = ({ children, classNames = '' }: PopupListProps) => {
  return (
    <div
      className={`ds-inline-flex ds-flex-col ds-items-start ds-rounded ds-bg-white ds-py-6 ds-px-[20px] ds-shadow-border ds-w-[257px] ${classNames}`.trim()}
    >
      {children}
    </div>
  );
};

export const PopupListItem = ({ children, classNames = '' }: PopupListItemProps) => {
  return (
    <div
      className={`ds-flex ds-items-center ds-gap-3 ds-py-3 ds-text-heading-4 ds-font-poppins hover:ds-text-accent hover:ds-underline focus:ds-left-auto focus:ds-underline ds-w-full ds-pl-5 ds-rounded ${classNames}`.trim()}
    >
      {children}
    </div>
  );
};
