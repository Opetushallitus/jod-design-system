export interface PopupListProps {
  children: React.ReactNode;
  classNames?: string;
}

export type PopupListItemProps = PopupListProps;

export const PopupList = ({ children, classNames = '' }: PopupListProps) => {
  return (
    <div
      className={`inline-flex flex-col items-start rounded bg-white py-6 px-[20px] shadow-border w-[257px] ${classNames}`.trim()}
    >
      {children}
    </div>
  );
};

export const PopupListItem = ({ children, classNames = '' }: PopupListItemProps) => {
  return (
    <div
      className={`flex items-center gap-3 py-3 text-heading-4 font-poppins hover:text-accent hover:underline focus:left-auto focus:underline w-full pl-5 rounded ${classNames}`.trim()}
    >
      {children}
    </div>
  );
};
