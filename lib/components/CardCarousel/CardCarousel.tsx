import { Carousel as ArkCarousel, useCarousel } from '@ark-ui/react/carousel';
import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export interface CardCarouselProps {
  items?: React.ReactNode[];
}
export const CardCarousel = ({ items = [] }: CardCarouselProps) => {
  const carousel = useCarousel();
  const rootRef = React.createRef<HTMLDivElement>();
  const CARD_WIDTH = 260;
  const GAP = 16;
  const [cardsPerSlide, setCardsPerSlide] = React.useState(1);
  const [pageNr, setPageNr] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(0);

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
          setCardsPerSlide(Math.max(Math.floor(entry.contentRect.width / (CARD_WIDTH + GAP)), 1));
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
  }, [cardsPerSlide, carousel, items.length, pageNr, rootRef]);

  return (
    <ArkCarousel.RootProvider value={carousel} style={{ '--slide-spacing': `${GAP}px` } as React.CSSProperties}>
      <ArkCarousel.Viewport className="ds-overflow-hidden" ref={rootRef}>
        <ArkCarousel.ItemGroup>
          {items.map((item, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <ArkCarousel.Item key={index} index={index} asChild>
                <div className={`ds-max-w-[${CARD_WIDTH}px]`}>{item}</div>
              </ArkCarousel.Item>
            );
          })}
        </ArkCarousel.ItemGroup>
      </ArkCarousel.Viewport>
      <div className="ds-mt-5">
        <ArkCarousel.Control className="ds-flex ds-flex-row ds-justify-between">
          <button onClick={goToPreviousPage}>
            <span className="ds-size-8 ds-flex ds-justify-center ds-items-center ds-bg-bg-gray-2 ds-rounded-full">
              <MdChevronLeft size={24} />
            </span>
          </button>
          <ArkCarousel.IndicatorGroup className="ds-flex ds-gap-3 ds-items-center">
            {Array.from({ length: pageCount < 1 ? 1 : pageCount }, (_, page) => (
              <button
                key={page}
                className={`ds-rounded-full ds-size-4 ${pageNr === page ? 'ds-bg-accent' : 'ds-bg-[#d4d4d4]'}`}
                onClick={goToPage(page)}
              >
                <span className="ds-sr-only">Go to page {page}</span>
              </button>
            ))}
          </ArkCarousel.IndicatorGroup>
          <button onClick={goToNextPage}>
            <span className="ds-size-8 ds-flex ds-justify-center ds-items-center ds-bg-bg-gray-2 ds-rounded-full">
              <MdChevronRight size={24} />
            </span>
          </button>
        </ArkCarousel.Control>
      </div>
    </ArkCarousel.RootProvider>
  );
};
