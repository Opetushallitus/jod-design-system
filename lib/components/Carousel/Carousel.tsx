/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';

import { JodPagerNext, JodPagerPrev } from '../../icons';
import { clamp, tidyClasses } from '../../utils';

export interface CarouselItem {
  /** Id to be used as key during iteration */
  id: string;
  /** Component to be rendered in the carousel */
  component: React.ReactNode;
}

export interface CarouselHandle {
  /** Moves the carousel to the page that contains the item with the given index */
  scrollToItem: (index: number) => void;
}

export interface CarouselProps {
  /** Items to show in the carousel */
  items?: CarouselItem[];
  /** Width of each item in the carousel. With `stretch` this is the minimum width of an item. */
  itemWidth: number;
  /**
   * Whether the items grow to fill the whole width of the carousel. The number of items shown at a time is still
   * decided by `itemWidth`, so there are as many items as fit in the carousel with their minimum width.
   */
  stretch?: boolean;
  /** Gap between items in the carousel. Default is 16px */
  gap?: number;
  /** Translations for accessibility */
  translations: {
    nextTrigger: string;
    prevTrigger: string;
    indicator: (index: number) => string;
  };
  /**
   * Whether the items that are not visible are made inert, so that they cannot be focused with the keyboard.
   * Default is true. Disable if the focus of the items is managed by the parent.
   */
  inertOffscreen?: boolean;
  /** Key down handler of the list of items */
  onKeyDown?: React.KeyboardEventHandler<HTMLUListElement>;
  /** Additional props for the element wrapping an item */
  getSlideProps?: (index: number) => React.ComponentPropsWithRef<'li'>;
  className?: string;
  testId?: string;
  ref?: React.Ref<CarouselHandle>;
}

const handleEnterPress = (callback: () => void) => (e: React.KeyboardEvent) => {
  if (e.key === 'Enter') {
    callback();
  }
};

const pagerButtonClassName =
  'ds:size-8 ds:flex ds:justify-center ds:items-center ds:bg-bg-gray-2 ds:rounded-full ds:cursor-pointer ds:disabled:cursor-not-allowed';

/**
 * A generic carousel that shows its items in pages. The items are changed with the pager buttons or by selecting a page
 * with the indicators. The content of the items is not restricted in any way.
 */
export const Carousel = ({
  items = [],
  itemWidth,
  stretch = false,
  gap = 16,
  translations,
  inertOffscreen = true,
  onKeyDown,
  getSlideProps,
  className = '',
  testId,
  ref,
}: CarouselProps) => {
  const containerRef = React.useRef<HTMLUListElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [pageNr, setPageNr] = React.useState(0);

  const itemsPerPage = Math.max(1, Math.floor((containerWidth + gap) / (itemWidth + gap)));
  const slideWidth =
    stretch && containerWidth > 0 ? (containerWidth - gap * (itemsPerPage - 1)) / itemsPerPage : itemWidth;
  const pageCount = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const currentPage = Math.min(pageNr, pageCount - 1);
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === pageCount - 1;
  // The last page is aligned to the end of the list, as the list cannot be scrolled past its last item
  const firstVisibleIndex = Math.max(0, Math.min(currentPage * itemsPerPage, items.length - itemsPerPage));

  React.useImperativeHandle(
    ref,
    () => ({
      scrollToItem: (index: number) => {
        setPageNr(Math.floor(clamp(index, 0, Math.max(0, items.length - 1)) / itemsPerPage));
      },
    }),
    [items.length, itemsPerPage],
  );

  React.useEffect(() => {
    const { current } = containerRef;
    if (!current) {
      return;
    }
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries.find((e) => e.target === current) ?? entries[0];
      if (entry) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    resizeObserver.observe(current);
    return () => resizeObserver.disconnect();
  }, []);

  React.useEffect(() => {
    containerRef.current?.scrollTo({ left: firstVisibleIndex * (slideWidth + gap), behavior: 'smooth' });
  }, [firstVisibleIndex, slideWidth, gap]);

  const goToNextPage = () => {
    if (!isLastPage) {
      setPageNr(currentPage + 1);
    }
  };
  const goToPreviousPage = () => {
    if (!isFirstPage) {
      setPageNr(currentPage - 1);
    }
  };
  const goToPage = (page: number) => () => {
    setPageNr(page);
  };

  return (
    <>
      <ul
        ref={containerRef}
        aria-roledescription="carousel"
        className={tidyClasses(`ds:flex ds:flex-row ds:overflow-hidden ${className}`)}
        style={{ gap }}
        data-testid={testId ? `${testId}-list` : undefined}
        onKeyDown={onKeyDown}
      >
        {items.map((item, index) => {
          const { className: slideClassName, style: slideStyle, ...slideProps } = getSlideProps?.(index) ?? {};
          const isVisible = index >= firstVisibleIndex && index < firstVisibleIndex + itemsPerPage;
          return (
            <li
              key={item.id}
              aria-roledescription="slide"
              inert={inertOffscreen && !isVisible}
              {...slideProps}
              className={tidyClasses(`ds:flex ds:shrink-0 ${slideClassName ?? ''}`)}
              style={{ width: slideWidth, ...slideStyle }}
            >
              {item.component}
            </li>
          );
        })}
      </ul>
      <div
        className="ds:flex ds:flex-row ds:gap-4 ds:justify-between ds:items-center ds:pt-5"
        data-testid={testId ? `${testId}-controls` : undefined}
      >
        <div className="ds:flex ds:flex-row ds:flex-wrap ds:gap-2 ds:items-center">
          {Array.from({ length: pageCount }, (_, page) => (
            <button
              type="button"
              key={page}
              className={`ds:cursor-pointer ds:rounded-full ds:size-4 ${currentPage === page ? 'ds:bg-accent' : 'ds:bg-[#d4d4d4]'}`}
              disabled={currentPage === page}
              aria-pressed={currentPage === page}
              onClick={goToPage(page)}
              onKeyDown={handleEnterPress(goToPage(page))}
            >
              <span className="ds:sr-only">{translations.indicator(page)}</span>
            </button>
          ))}
        </div>

        <div className="ds:flex ds:flex-row ds:gap-3">
          <button
            type="button"
            onClick={goToPreviousPage}
            onKeyDown={handleEnterPress(goToPreviousPage)}
            aria-label={translations.prevTrigger}
            disabled={isFirstPage}
            className={pagerButtonClassName}
          >
            <JodPagerPrev size={24} className={isFirstPage ? 'ds:text-inactive-gray' : 'ds:text-primary-gray'} />
          </button>
          <button
            type="button"
            onClick={goToNextPage}
            onKeyDown={handleEnterPress(goToNextPage)}
            aria-label={translations.nextTrigger}
            disabled={isLastPage}
            className={pagerButtonClassName}
          >
            <JodPagerNext size={24} className={isLastPage ? 'ds:text-inactive-gray' : 'ds:text-primary-gray'} />
          </button>
        </div>
      </div>
    </>
  );
};
