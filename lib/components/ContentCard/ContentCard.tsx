type LinkComponent =
  | {
      to: string;
      linkComponent: React.ComponentType<{
        to: string;
        className?: string;
        children: React.ReactNode;
      }>;
    }
  | {
      to?: never;
      linkComponent?: never;
    };
export type ContentCardProps = {
  title: string;
  description: string;
  path: string[];
  tags: {
    label: string;
    to: string;
  }[];
  className?: string;
  testId?: string;
} & LinkComponent;

const Tag = ({
  label,
  to,
  linkComponent: Link,
}: {
  label: string;
  to: string;
  linkComponent?: React.ComponentType<{
    to: string;
    className?: string;
    children: React.ReactNode;
  }>;
}) => {
  return (
    <li className="ds:px-2 ds:first:pl-0 ds:last:pr-0">
      {Link ? (
        <Link to={to} className="ds:z-1 ds:relative">
          {label}
        </Link>
      ) : (
        <>{label}</>
      )}
    </li>
  );
};

const LinkOrDiv = ({
  to,
  linkComponent: Link,
  children,
}: {
  to?: string;
  linkComponent?: React.ComponentType<{
    to: string;
    className?: string;
    children: React.ReactNode;
  }>;
  children: React.ReactNode;
}) => {
  return Link && to ? (
    <Link
      to={to}
      className="ds:flex ds:flex-col ds:gap-3 ds:z-1 ds:before:content-[''] ds:before:absolute ds:before:w-full ds:before:h-full"
    >
      {children}
    </Link>
  ) : (
    <div className={`ds:flex ds:flex-col ds:gap-3`}>{children}</div>
  );
};

export const ContentCard = ({
  title,
  description,
  path,
  tags,
  linkComponent: Link,
  to,
  className = '',
  testId,
}: ContentCardProps) => {
  return (
    <div className={`ds:relative ds:py-4 ds:flex ds:flex-col ds:gap-3 ${className}`} data-testid={testId}>
      <LinkOrDiv to={to} linkComponent={Link}>
        <div>
          <div className="ds:text-body-xs ds:text-secondary-gray ds:font-semibold">{path.join(' / ')}</div>
          <div className="ds:text-heading-3">{title}</div>
        </div>
        <div className="ds:text-body-sm ds:line-clamp-2 ds:min-h-[40px]">{description}</div>
      </LinkOrDiv>
      <div className="ds:flex ds:flex-row ds:gap-3 ds:items-center">
        <ul className="ds:text-attrib-value ds:flex ds:flex-row ds:divide-x ds:flex-wrap ds:text-accent">
          {tags.map((tag) => (
            <Tag key={tag.label} linkComponent={Link} {...tag} />
          ))}
        </ul>
      </div>
    </div>
  );
};
