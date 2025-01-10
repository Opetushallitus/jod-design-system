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
  /** Translations for accessibility */
  translations: {
    nextTrigger: string;
    prevTrigger: string;
    indicator: (index: number) => string;
  };
}
export const CardCarousel = ({ items = [], translations, itemWidth }: CardCarouselProps) => {
  const containerRef = React.createRef<HTMLUListElement>();
  const GAP = 16;
  const [itemsPerPage, setItemsPerPage] = React.useState(1);
  const [pageNr, setPageNr] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(0);
  const [isFirstPage, setIsFirstPage] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);
  const getPageCount = React.useCallback(() => Math.ceil(items.length / itemsPerPage), [itemsPerPage, items.length]);

  React.useEffect(() => {
    const { current } = containerRef;
    if (current) {
      current.scrollTo({ left: pageNr * itemsPerPage * (itemWidth + GAP), behavior: 'smooth' });
    }
  }, [itemsPerPage, containerRef, itemWidth, pageNr]);

  const goToNextPage = () => {
    if (!isLastPage) {
      setPageNr(pageNr + 1);
    }
  };
  const goToPreviousPage = () => {
    if (!isFirstPage) {
      setPageNr(pageNr - 1);
    }
  };

  const goToPage = (page: number) => () => {
    setPageNr(page);
  };

  const handleEnterPress = (callback: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      callback();
    }
  };

  React.useEffect(() => {
    setPageCount(getPageCount());
    setIsFirstPage(pageNr === 0);
    setIsLastPage(pageNr === pageCount - 1);
  }, [itemsPerPage, items.length, pageNr, pageCount, getPageCount]);

  React.useEffect(() => {
    const { current } = containerRef;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.target == current) {
          setItemsPerPage(Math.max(Math.floor(entry.contentRect.width / (itemWidth + GAP)), 1));
          setPageCount(getPageCount());
          setPageNr(Math.min(Math.max(0, pageNr), getPageCount() - 1));
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
  }, [itemsPerPage, getPageCount, itemWidth, items.length, pageNr, containerRef]);

  return (
    <>
      <ul className="ds-flex ds-flex-row ds-gap-5 ds-overflow-hidden ds-p-3" ref={containerRef}>
        {items.map((item, index) => {
          // Change the page according to focused item during tab navigation
          const onFocus = () => {
            const pageWhereFocusedItemIs = Math.floor(index / itemsPerPage);
            const focusedItemIsOutsideCurrentPage = pageWhereFocusedItemIs !== pageNr;

            if (focusedItemIsOutsideCurrentPage) {
              setPageNr(pageWhereFocusedItemIs);
            }
          };
          return (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            <li key={item.id} style={{ width: itemWidth }} tabIndex={0} onFocus={onFocus}>
              {item.component}
            </li>
          );
        })}
      </ul>
      <div className="ds-flex ds-flex-row ds-gap-2 ds-justify-between ds-items-center ds-p-3">
        <button
          onClick={goToPreviousPage}
          onKeyDown={handleEnterPress(goToPreviousPage)}
          aria-label={translations.prevTrigger}
          disabled={isFirstPage}
        >
          <span className="ds-size-8 ds-flex ds-justify-center ds-items-center ds-bg-bg-gray-2 ds-rounded-full">
            <MdChevronLeft size={24} className={isFirstPage ? 'ds-text-inactive-gray' : 'ds-text-black'} />
          </span>
        </button>

        <div className="ds-flex ds-flex-row ds-gap-2 ds-justify-center">
          {Array.from({ length: Math.max(1, pageCount) }, (_, page) => (
            <button
              type="button"
              key={page}
              className={`ds-rounded-full ds-size-4 ${pageNr === page ? 'ds-bg-accent' : 'ds-bg-[#d4d4d4]'}`}
              onClick={goToPage(page)}
              onKeyDown={handleEnterPress(goToPage(page))}
            >
              <span className="ds-sr-only">{translations.indicator(page)}</span>
            </button>
          ))}
        </div>

        <button
          onClick={goToNextPage}
          onKeyDown={handleEnterPress(goToNextPage)}
          aria-label={translations.nextTrigger}
          disabled={isLastPage}
        >
          <span className="ds-size-8 ds-flex ds-justify-center ds-items-center ds-bg-bg-gray-2 ds-rounded-full">
            <MdChevronRight size={24} className={isLastPage ? 'ds-text-inactive-gray' : 'ds-text-black'} />
          </span>
        </button>
      </div>
    </>
  );
};
