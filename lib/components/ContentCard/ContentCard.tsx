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
  path: string;
  tags: {
    label: string;
    to: string;
  }[];
  className?: string;
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
  return <li className="ds:px-2 ds:first:pl-0 ds:last:pr-0">{Link ? <Link to={to}>{label}</Link> : <>{label}</>}</li>;
};

const LinkOrDiv = ({
  to,
  linkComponent: Link,
  className,
  children,
}: {
  to?: string;
  linkComponent?: React.ComponentType<{
    to: string;
    className?: string;
    children: React.ReactNode;
  }>;
  className?: string;
  children: React.ReactNode;
}) => {
  return Link && to ? (
    <Link to={to} className={`ds:py-4 ds:flex ds:flex-col ds:gap-3 ${className}`}>
      {children}
    </Link>
  ) : (
    <div className={`ds:py-4 ds:flex ds:flex-col ds:gap-3 ${className}`}>{children}</div>
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
}: ContentCardProps) => {
  return (
    <LinkOrDiv to={to} linkComponent={Link} className={className}>
      <div>
        <div className="ds:text-body-xs ds:text-secondary-gray ds:font-semibold">{path}</div>
        <div className="ds:text-heading-3">{title}</div>
      </div>
      <div className="ds:text-body-sm">{description}</div>
      <div className="ds:flex ds:flex-row ds:gap-3 ds:items-center">
        <ul className="ds:text-attrib-value ds:flex ds:flex-row ds:divide-x ds:flex-wrap ds:text-accent">
          {tags.map((tag) => (
            <Tag key={tag.label} linkComponent={Link} {...tag} />
          ))}
        </ul>
      </div>
    </LinkOrDiv>
  );
};
