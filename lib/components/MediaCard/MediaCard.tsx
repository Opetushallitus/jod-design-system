import React from 'react';

import { useMediaQueries } from '../../hooks/useMediaQueries';
import { JodFavorite, JodFavoriteFilled } from '../../icons';
import { LazyImage } from '../LazyImage/LazyImage';

type CardLinkComponent = React.ComponentType<{
  to: string;
  className?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  children: React.ReactNode;
}>;

type LinkComponent =
  | {
      to: string;
      linkComponent: CardLinkComponent;
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
  variant?: 'vertical' | 'horizontal';
  imageSrc: string;
  imageAlt: string;
  label: string;
  description: string;
  tags: {
    label: string;
    to: string;
  }[];
} & LinkComponent &
  FavoriteButtonProps & { testId?: string };

type MediaCardImplProps = {
  imageSrc: string;
  imageAlt: string;
  label: string;
  description: string;
  children: React.ReactNode;
} & LinkComponent;

const Tag = ({ label, to, linkComponent: Link }: { label: string; to: string; linkComponent?: CardLinkComponent }) => {
  return (
    <li className="ds:pb-1">
      {Link ? (
        // At least 24px high, so that the tag link meets the minimum target size (WCAG 2.5.8)
        <Link to={to} className="ds:relative ds:z-1 ds:inline-flex ds:items-center ds:min-h-6">
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
  className,
  labelledBy,
  children,
  testId,
}: {
  to?: string;
  linkComponent?: CardLinkComponent;
  className?: string;
  /**
   * Ids of the elements that name the link. Without them the whole content of the link is its name.
   * The name must contain all the visible text of the link (WCAG 2.5.3 Label in Name).
   */
  labelledBy?: string;
  children: React.ReactNode;
  testId?: string;
}) => {
  return Link && to ? (
    <Link
      to={to}
      className={`ds:z-1 ds:before:content-[''] ds:before:absolute ds:before:w-full ds:before:h-full ds:before:rounded ds:focus-visible:outline-none ds:focus-visible:before:outline-2 ds:focus-visible:before:outline-solid ds:focus-visible:before:outline-accent ds:focus-visible:before:outline-offset-[-2px] ${className}`}
      aria-labelledby={labelledBy}
      data-testid={testId}
    >
      {children}
    </Link>
  ) : (
    <div className={`${className}`} data-testid={testId}>
      {children}
    </div>
  );
};

const FavoriteButton = ({ isFavorite, favoriteLabel, onFavoriteClick }: FavoriteButtonProps) => {
  return (
    <button
      className="ds:cursor-pointer ds:absolute ds:top-0 ds:right-0 ds:p-4 ds:bg-white ds:rounded-bl ds:z-2"
      aria-label={favoriteLabel}
      onClick={onFavoriteClick}
      data-testid={isFavorite ? 'favorite-button-active' : 'favorite-button-inactive'}
    >
      {isFavorite ? (
        <JodFavoriteFilled size={24} aria-hidden className="ds:text-accent" />
      ) : (
        <JodFavorite aria-hidden size={24} />
      )}
    </button>
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
  isFavorite,
  onFavoriteClick,
  favoriteLabel,
  testId,
}: MediaCardProps) => {
  const favoriteButtonAndTags = (
    <>
      {isFavorite !== undefined && (
        <FavoriteButton isFavorite={isFavorite} favoriteLabel={favoriteLabel} onFavoriteClick={onFavoriteClick} />
      )}
      <ul
        className="ds:text-attrib-value ds:flex ds:flex-row ds:divide-x ds:divide-border-gray ds:flex-wrap ds:text-accent ds:pt-3 ds:px-5 ds:*:px-2 ds:-mx-2"
        data-testid={testId ? `${testId}-tags` : undefined}
      >
        {tags.filter(Boolean).map((tag) => (
          <Tag key={tag.label} linkComponent={Link} {...tag} />
        ))}
      </ul>
    </>
  );
  const linkProps = to && Link ? { to, linkComponent: Link } : {};
  const MediaCardComponent = variant === 'vertical' ? MediaCardVertical : MediaCardHorizontal;

  return (
    <MediaCardComponent
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      label={label}
      description={description}
      {...linkProps}
      testId={testId}
    >
      {favoriteButtonAndTags}
    </MediaCardComponent>
  );
};

/**
 * The link of a card covers the whole card, including the area of the children (tags), so that the focus indicator of
 * the assistive technologies surrounds the whole card. The text of the link is kept above the children with padding.
 */
const useChildrenPadding = () => {
  const textContainerRef = React.useRef<HTMLDivElement>(null);
  const childrenContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!textContainerRef.current || !childrenContainerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target.isSameNode(childrenContainerRef.current) && textContainerRef.current) {
          textContainerRef.current.style.paddingBottom = `${entry.target.clientHeight}px`;
        }
      }
    });

    resizeObserver.observe(childrenContainerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { textContainerRef, childrenContainerRef };
};

type CardLinkProps = {
  image: React.ReactNode;
  label: string;
  description: string;
  linkClassName: string;
  textContainerClassName: string;
  /** Class name of the element that wraps the texts inside the text container. The texts are not wrapped without it. */
  textsClassName?: string;
  labelClassName: string;
  descriptionClassName: string;
  textContainerRef: React.Ref<HTMLDivElement>;
  testId?: string;
} & LinkComponent;

/**
 * The link of the card with the image and the texts. The label and the description, which are the visible text of the
 * link, name it together, so that the name matches what is seen (WCAG 2.5.3 Label in Name). The image is left out.
 */
const CardLink = ({
  to,
  linkComponent,
  image,
  label,
  description,
  linkClassName,
  textContainerClassName,
  textsClassName,
  labelClassName,
  descriptionClassName,
  textContainerRef,
  testId,
}: CardLinkProps) => {
  const labelId = React.useId();
  const descriptionId = React.useId();
  const texts = (
    <>
      <div>
        <p id={labelId} className={labelClassName} data-testid={testId ? `${testId}-label` : undefined}>
          {label}
        </p>
      </div>
      {/* Separates the words of the label and the description in the text content of the link. It is not rendered in
          the flex container. */}{' '}
      <div className="ds:grow ds:content-center">
        <p
          id={descriptionId}
          className={descriptionClassName}
          data-testid={testId ? `${testId}-description` : undefined}
        >
          {description}
        </p>
      </div>
    </>
  );

  return (
    <LinkOrDiv
      to={to}
      linkComponent={linkComponent}
      className={linkClassName}
      labelledBy={`${labelId} ${descriptionId}`}
      testId={testId ? `${testId}-link` : undefined}
    >
      {image}
      <div className={textContainerClassName} ref={textContainerRef}>
        {textsClassName ? <div className={textsClassName}>{texts}</div> : texts}
      </div>
    </LinkOrDiv>
  );
};

const MediaCardVertical = ({
  imageSrc,
  imageAlt,
  label,
  description,
  linkComponent,
  to,
  children,
  testId,
}: MediaCardImplProps & { testId?: string }) => {
  const variantImageClassNames = 'ds:object-cover ds:h-[147px] ds:min-h-[147px]';
  const { textContainerRef, childrenContainerRef } = useChildrenPadding();

  return (
    <div
      className="ds:relative ds:grid ds:grid-cols-1 ds:grid-rows-[1fr_auto] ds:w-[261px] ds:min-h-[380px] ds:overflow-clip ds:rounded ds:shadow-border ds:bg-white"
      data-testid={testId}
    >
      <CardLink
        {...({ to, linkComponent } as LinkComponent)}
        image={
          imageSrc ? (
            <LazyImage className={`${variantImageClassNames}`} src={imageSrc} alt={imageAlt} />
          ) : (
            <span
              className={`ds:w-full ds:h-full ds:bg-border-gray ${variantImageClassNames}`}
              data-testid={testId ? `${testId}-image-placeholder` : undefined}
            ></span>
          )
        }
        label={label}
        description={description}
        linkClassName="ds:flex ds:flex-col ds:col-start-1 ds:row-start-1 ds:row-end-3"
        textContainerClassName="ds:px-5 ds:pt-4 ds:text-primary-gray ds:flex ds:flex-col ds:justify-between ds:h-full ds:flex-nowrap ds:gap-3"
        labelClassName="ds:text-heading-4-mobile ds:sm:text-heading-4 ds:line-clamp-3"
        descriptionClassName="ds:text-body-sm-mobile ds:sm:text-body-sm ds:line-clamp-3 ds:hyphens-auto"
        textContainerRef={textContainerRef}
        testId={testId}
      />
      <div className="ds:col-start-1 ds:row-start-2 ds:pb-5" ref={childrenContainerRef}>
        {children}
      </div>
    </div>
  );
};

const MediaCardHorizontal = ({
  imageSrc,
  imageAlt,
  label,
  description,
  linkComponent,
  to,
  children,
  testId,
}: MediaCardImplProps & { testId?: string }) => {
  const { sm } = useMediaQueries();
  const { textContainerRef, childrenContainerRef } = useChildrenPadding();

  return (
    <div
      className="ds:relative ds:sm:min-h-[143px] ds:w-full ds:overflow-clip ds:rounded ds:shadow-border ds:bg-white ds:grid ds:grid-cols-1 ds:grid-rows-[1fr_auto] ds:sm:grid-cols-[255px_1fr]"
      data-testid={testId}
    >
      <CardLink
        {...({ to, linkComponent } as LinkComponent)}
        image={
          <div className="ds:shrink-0">
            {imageSrc ? (
              sm && (
                <LazyImage
                  className="ds:sm:w-[255px] ds:sm:min-w-full ds:sm:min-h-full ds:sm:h-0 ds:object-cover"
                  src={imageSrc}
                  alt={imageAlt}
                />
              )
            ) : (
              <div
                className={`ds:sm:w-[255px] ds:sm:min-w-full ds:sm:min-h-full ds:bg-primary-5`}
                data-testid={testId ? `${testId}-image-placeholder` : undefined}
              ></div>
            )}
          </div>
        }
        label={label}
        description={description}
        linkClassName="ds:flex ds:flex-row ds:col-start-1 ds:col-end-2 ds:sm:col-end-3 ds:row-start-1 ds:row-end-3"
        textContainerClassName="ds:px-5 ds:pt-4 ds:pb-5 ds:text-primary-gray ds:flex ds:flex-col ds:justify-between ds:flex-nowrap"
        textsClassName="ds:gap-3 ds:flex ds:flex-col ds:grow"
        labelClassName="ds:pr-6 ds:text-heading-4-mobile ds:sm:text-heading-4 ds:line-clamp-4 ds:sm:line-clamp-2"
        descriptionClassName="ds:text-body-sm-mobile ds:sm:text-body-sm ds:line-clamp-3 ds:sm:line-clamp-2"
        textContainerRef={textContainerRef}
        testId={testId}
      />
      <div
        className="ds:pb-5 ds:col-start-1 ds:sm:col-start-2 ds:md-col-start-1 ds:row-start-2"
        data-testid={testId ? `${testId}-footer` : undefined}
        ref={childrenContainerRef}
      >
        {children}
      </div>
    </div>
  );
};
