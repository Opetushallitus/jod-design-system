import { useMediaQueries } from '../../hooks/useMediaQueries';

interface MainLayoutProps {
  children: React.ReactNode;
  navChildren?: React.ReactNode;
  hideBreadcrumb?: boolean;
  breadcrumbComponent: React.ReactNode;
  testId?: string;
}

export const MainLayout = ({
  children,
  navChildren,
  hideBreadcrumb = false,
  breadcrumbComponent,
  testId,
}: MainLayoutProps) => {
  const { lg } = useMediaQueries();
  const getTestId = (suffix: string) => (testId ? `${testId}-${suffix}` : suffix);

  return (
    <div
      className="ds:mx-auto ds:grid ds:w-full ds:max-w-[1140px] ds:grow ds:grid-cols-3 ds:gap-6 ds:pt-11 ds:pb-6 ds:print:flex ds:print:p-0"
      data-testid={getTestId('root')}
    >
      {!hideBreadcrumb && <div className="ds:col-span-3 ds:px-5 ds:sm:px-6">{breadcrumbComponent}</div>}

      {lg && navChildren && (
        <aside
          className="ds:order-last ds:col-span-1 ds:mr-5 ds:sm:mr-6 ds:print:hidden"
          data-testid={getTestId('sidebar')}
        >
          <nav data-testid={getTestId('sidebar-nav')}>{navChildren}</nav>
        </aside>
      )}
      <main
        role="main"
        className="ds:col-span-3 ds:lg:col-span-2 ds:print:col-span-3"
        id="jod-main"
        data-testid={getTestId('main-content')}
      >
        {children}
      </main>
    </div>
  );
};
