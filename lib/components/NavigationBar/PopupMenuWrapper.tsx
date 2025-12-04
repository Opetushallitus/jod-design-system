interface PopupMenuWrapperProps {
  menuProps: {
    ref: React.RefObject<HTMLDivElement | null>;
  };
  testId?: string;
  children: React.ReactNode;
}

export const PopupMenuWrapper = ({ menuProps, testId, children }: PopupMenuWrapperProps) => {
  return (
    <div
      {...menuProps}
      className="ds:z-60 ds:absolute ds:right-0 ds:translate-y-5 ds:md:translate-y-6 ds:md:mt-2"
      data-testid={testId}
    >
      {children}
    </div>
  );
};
