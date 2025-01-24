import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

type LinkComponent =
  | {
      to: object | string;
      linkComponent: React.ComponentType<{
        to: object | string;
        className?: string;
        children: React.ReactNode;
      }>;
    }
  | {
      to?: never;
      linkComponent?: never;
    };

type FavoriteButtonProps =
  | {
      isFavorite?: never;
      onFavoriteClick?: never;
      favoriteLabel?: never;
    }
  | {
      isFavorite: boolean;
      onFavoriteClick: () => void;
      favoriteLabel: string;
    };

export type MediaCardProps = {
  imageSrc: string;
  imageAlt: string;
  label: string;
  description: string;
  tags: string[];
} & LinkComponent &
  FavoriteButtonProps;

const Tag = ({ label }: { label: string }) => {
  return <li className="ds:px-2 ds:first:pl-0 ds:last:pr-0">{label}</li>;
};

const LinkOrDiv = ({
  to,
  linkComponent: Link,
  className,
  children,
}: {
  to?: object | string;
  linkComponent?: React.ComponentType<{
    to: object | string;
    className?: string;
    children: React.ReactNode;
  }>;
  className?: string;
  children: React.ReactNode;
}) => {
  return Link && to ? (
    <Link to={to} className={`ds:overflow-clip ds:rounded ds:shadow-border ds:bg-white ${className}`}>
      {children}
    </Link>
  ) : (
    <div className={`ds:overflow-clip ds:rounded ds:shadow-border ds:bg-white ${className}`}>{children}</div>
  );
};

const FavoriteButton = ({ isFavorite, favoriteLabel, onFavoriteClick }: FavoriteButtonProps) => {
  return (
    <button
      className="ds:cursor-pointer ds:absolute ds:top-0 ds:right-0 ds:p-[12px] ds:bg-white ds:rounded-bl"
      aria-label={favoriteLabel}
      onClick={onFavoriteClick}
    >
      {isFavorite ? (
        <MdFavorite size={24} aria-hidden className="ds:text-accent" />
      ) : (
        <MdFavoriteBorder aria-hidden size={24} />
      )}
    </button>
  );
};

export const MediaCard = ({
  imageSrc,
  imageAlt,
  label,
  description,
  tags,
  linkComponent: Link,
  to,
  isFavorite,
  onFavoriteClick,
  favoriteLabel,
}: MediaCardProps) => {
  const variantImageClassNames = 'ds:object-cover ds:min-h-[147px]';

  return (
    <LinkOrDiv to={to} linkComponent={Link} className="ds:relative ds:flex ds:flex-col ds:w-[261px] ds:h-[299px]">
      {imageSrc ? (
        <img className={`${variantImageClassNames}`} src={imageSrc} alt={imageAlt} />
      ) : (
        <span className={`ds:w-full ds:h-full ds:bg-secondary-5 ds:max-w-[265px] ${variantImageClassNames}`}></span>
      )}
      <div className="ds:px-5 ds:pt-4 ds:pb-5 ds:text-black ds:flex ds:flex-col ds:justify-between ds:h-full ds:flex-nowrap">
        <div className="ds:gap-3 ds:flex ds:flex-col">
          <div className="ds:text-heading-3-mobile ds:sm:text-heading-3">{label}</div>
          <div className="ds:text-body-sm-mobile ds:sm:text-body-sm ds:line-clamp-3">{description}</div>
        </div>
        {isFavorite !== undefined && (
          <FavoriteButton isFavorite={isFavorite} favoriteLabel={favoriteLabel} onFavoriteClick={onFavoriteClick} />
        )}
        <ul className="ds:text-attrib-value ds:flex ds:flex-row ds:divide-x ds:flex-wrap ds:text-accent ds:pt-3">
          {tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </ul>
      </div>
    </LinkOrDiv>
  );
};
