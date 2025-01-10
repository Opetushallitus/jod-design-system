import { MdOutlineStar } from 'react-icons/md';
import { cx } from '../../cva';

type Variant = 'vertical' | 'horizontal';

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

export type MediaCardProps = {
  variant?: Variant;
  imageSrc: string;
  imageAlt: string;
  label: string;
  description: string;
  tags: string[];
  /** Rating between 0-5*/
  rating?: number;
  ratingAriaLabel?: string;
} & LinkComponent;

const getVariantContainerClassNames = ({ variant }: { variant: Variant }) => {
  return cx({
    'ds-flex ds-flex-col ds-w-[260px] ds-h-[329px]': variant === 'vertical',
    'ds-flex ds-flex-row ds-w-full ds-h-[147px]': variant === 'horizontal',
  });
};

const getVariantImageClassNames = ({ variant }: { variant: Variant }) => {
  return cx('ds-object-cover', {
    'ds-min-h-[147px]': variant === 'vertical',
    'ds-h-full ds-min-w-[265px]': variant === 'horizontal',
  });
};

const Tag = ({ label }: { label: string }) => {
  return <li className="ds-px-2 first:ds-pl-0 last:ds-pr-0">{label}</li>;
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
    <Link to={to} className={`ds-overflow-clip ds-rounded ds-shadow-border ds-bg-white ${className}`}>
      {children}
    </Link>
  ) : (
    <div className={`ds-overflow-clip ds-rounded ds-shadow-border ds-bg-white ${className}`}>{children}</div>
  );
};

interface RatingElementProps {
  /** Amount of the rating, possible values between 0-5 */
  amount: number;
  ariaLabel: string;
}

const RatingElement = ({ amount, ariaLabel }: RatingElementProps) => {
  return (
    <div role="figure" className="ds-flex ds-flex-row ds-gap-2" aria-label={ariaLabel}>
      {Array.from({ length: 5 }).map((_, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <MdOutlineStar key={idx} className={idx < amount ? 'ds-text-black' : 'ds-text-accent-25'} />
      ))}
    </div>
  );
};

export const MediaCard = ({
  variant = 'vertical',
  imageSrc,
  imageAlt,
  label,
  description,
  tags,
  linkComponent: Link,
  to,
  rating,
  ratingAriaLabel,
}: MediaCardProps) => {
  const variantContainerClassNames = getVariantContainerClassNames({ variant });
  const variantImageClassNames = getVariantImageClassNames({ variant });

  return (
    <LinkOrDiv to={to} linkComponent={Link} className={variantContainerClassNames}>
      {imageSrc ? (
        <img className={`${variantImageClassNames}`} src={imageSrc} alt={imageAlt} />
      ) : (
        <span className="ds-w-full ds-h-full ds-bg-secondary-5"></span>
      )}
      <div className="ds-px-5 ds-pt-4 ds-pb-5 ds-text-black ds-flex ds-flex-col ds-justify-between ds-h-full ds-flex-nowrap">
        <div className="ds-gap-3 ds-flex ds-flex-col">
          <div className="ds-text-heading-3-mobile sm:ds-text-heading-3">{label}</div>
          <div className="ds-text-body-sm-mobile sm:ds-text-body-sm ds-line-clamp-3">{description}</div>
        </div>
        {rating !== undefined && <RatingElement amount={rating} ariaLabel={ratingAriaLabel ?? ''} />}
        <ul className="ds-text-attrib-value ds-flex ds-flex-row ds-divide-x ds-flex-wrap ds-text-accent ds-pt-3">
          {tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </ul>
      </div>
    </LinkOrDiv>
  );
};
