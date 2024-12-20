import { Carousel as ArkCarousel, useCarousel } from '@ark-ui/react/carousel';
import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
export interface CarouselItem {
  /** Id to be used as key during iteration */
  id: string;
  /** Component to be rendered in the carousel */
  component: React.ReactNode;
}
export interface CardCarouselProps {
  /** Items to show in the carousel */
  items?: CarouselItem[];
  /** Width of each item in the carousel */
  itemWidth: number;
  /** Translations for accessability */
  translations: {
    goToPage: string;
    previousPage: string;
    nextPage: string;
  };
}
export const CardCarousel = ({ items = [], translations, itemWidth }: CardCarouselProps) => {
  // Using the useCarousel hook in order to use the RootProvider of the carousel,
  // which is required to allow calling the scrollTo methods on the carousel.
  const carousel = useCarousel();
  const rootRef = React.createRef<HTMLDivElement>();
  const GAP = 16;
  const [cardsPerSlide, setCardsPerSlide] = React.useState(1);
  const [pageNr, setPageNr] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(0);

  const isFirstPage = pageNr === 0;
  const isLastPage = pageNr === pageCount - 1;

  const goToNextPage = () => {
    if (pageNr + 1 < Math.ceil(items.length / cardsPerSlide)) {
      setPageNr(pageNr + 1);
      carousel.scrollTo((pageNr + 1) * cardsPerSlide);
    }
  };
  const goToPreviousPage = () => {
    if (pageNr - 1 >= 0) {
      setPageNr(pageNr - 1);
      carousel.scrollTo((pageNr - 1) * cardsPerSlide);
    }
  };
  const goToPage = (page: number) => () => {
    setPageNr(page);
    carousel.scrollTo(page * cardsPerSlide);
  };

  React.useEffect(() => {
    const current = rootRef.current;
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.target == current) {
          setCardsPerSlide(Math.max(Math.floor(entry.contentRect.width / (itemWidth + GAP)), 1));
          setPageCount(Math.ceil(items.length / cardsPerSlide));
          setPageNr(Math.min(Math.max(0, pageNr), Math.ceil(items.length / cardsPerSlide) - 1));
          carousel.scrollTo(pageNr * cardsPerSlide);
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (current) {
      resizeObserver.observe(current);
    }

    return () => {
      if (current) {
        resizeObserver.unobserve(current);
      }
    };
  }, [cardsPerSlide, carousel, itemWidth, items.length, pageNr, rootRef]);

  // Since carousel RootProvider is being used, setting the gap and slide size via props is not possible.
  // Instead, we need to set the CSS variables directly on the RootProvider element.
  const carouselCssVariables = {
    '--slide-spacing': `${GAP}px`,
    '--slide-size': `${itemWidth}px`,
  } as Readonly<React.CSSProperties>;

  return (
    <ArkCarousel.RootProvider value={carousel} style={carouselCssVariables}>
      <ArkCarousel.Viewport className="ds-overflow-hidden ds-p-3" ref={rootRef}>
        <ArkCarousel.ItemGroup>
          {items.map((item, index) => {
            // Change the page according to focused item
            const handleFocus = () => {
              const pageWhereFocusedItemIs = Math.floor(index / cardsPerSlide);
              const focusedItemIsOutsideCurrentPage = pageWhereFocusedItemIs !== pageNr;
              if (focusedItemIsOutsideCurrentPage) {
                setPageNr(pageWhereFocusedItemIs);
                goToPage(pageWhereFocusedItemIs)();
              }
            };
            return (
              <ArkCarousel.Item key={item.id} index={index} asChild>
                {/* The item inside the div will be a link in most cases, and tabindex is required for keyboard navigation to work */}
                {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
                <div className={`ds-max-w-[${itemWidth}px]`} tabIndex={0} onFocus={handleFocus}>
                  {item.component}
                </div>
              </ArkCarousel.Item>
            );
          })}
        </ArkCarousel.ItemGroup>
      </ArkCarousel.Viewport>
      <div className="ds-mt-3">
        <ArkCarousel.Control className="ds-flex ds-flex-row ds-justify-between">
          <button onClick={goToPreviousPage} aria-label={translations.previousPage} disabled={isFirstPage}>
            <span className="ds-size-8 ds-flex ds-justify-center ds-items-center ds-bg-bg-gray-2 ds-rounded-full">
              <MdChevronLeft size={24} className={isFirstPage ? 'ds-text-inactive-gray' : 'ds-text-black'} />
            </span>
          </button>
          <ArkCarousel.IndicatorGroup className="ds-flex ds-gap-3 ds-items-center">
            {Array.from({ length: Math.max(1, pageCount) }, (_, page) => (
              <button
                key={page}
                className={`ds-rounded-full ds-size-4 ${pageNr === page ? 'ds-bg-accent' : 'ds-bg-[#d4d4d4]'}`}
                onClick={goToPage(page)}
              >
                <span className="ds-sr-only">{`${translations.goToPage} ${page}`}</span>
              </button>
            ))}
          </ArkCarousel.IndicatorGroup>
          <button onClick={goToNextPage} aria-label={translations.nextPage} disabled={isLastPage}>
            <span className="ds-size-8 ds-flex ds-justify-center ds-items-center ds-bg-bg-gray-2 ds-rounded-full">
              <MdChevronRight size={24} className={isLastPage ? 'ds-text-inactive-gray' : 'ds-text-black'} />
            </span>
          </button>
        </ArkCarousel.Control>
      </div>
    </ArkCarousel.RootProvider>
  );
};
