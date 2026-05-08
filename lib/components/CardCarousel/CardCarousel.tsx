/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';

import { JodPagerNext, JodPagerPrev } from '../../icons';

export interface CardCarouselItem {
  /** Id to be used as key during iteration */
  id: string;
  /** Component to be rendered in the carousel */
  component: React.ReactNode;
}

export interface CardCarouselProps {
  /** Items to show in the carousel */
  items?: CardCarouselItem[];
  /** Width of each item in the carousel */
  itemWidth: number;
  /** Gap between items in the carousel. Default is 16px */
  gap?: number;
  /** Translations for accessibility */
  translations: {
    nextTrigger: string;
    prevTrigger: string;
    indicator: (index: number) => string;
  };
  className?: string;
  testId?: string;
}
export const CardCarousel = ({
  items = [],
  translations,
  itemWidth,
  gap = 16,
  className = '',
  testId,
}: CardCarouselProps) => {
  const containerRef = React.useRef<HTMLUListElement>(null);
  const cardRefs = React.useRef<(HTMLLIElement | null)[]>([]);
  const [itemsPerPage, setItemsPerPage] = React.useState(1);
  const [pageNr, setPageNr] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(0);
  const [isFirstPage, setIsFirstPage] = React.useState(true);
  const [isLastPage, setIsLastPage] = React.useState(false);
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const getPageCount = React.useCallback(() => Math.ceil(items.length / itemsPerPage), [itemsPerPage, items.length]);

  React.useEffect(() => {
    const { current } = containerRef;
    if (current) {
      current.scrollTo({ left: pageNr * itemsPerPage * (itemWidth + gap), behavior: 'smooth' });
    }
  }, [itemsPerPage, itemWidth, pageNr, gap]);

  // Manage tabIndex of focusable elements inside cards so only the active card's content is tabbable
  React.useEffect(() => {
    const selector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]';
    cardRefs.current.forEach((card, index) => {
      if (!card) {
        return;
      }
      const focusableElements = card.querySelectorAll<HTMLElement>(selector);
      const isActive = index === activeCardIndex;
      focusableElements.forEach((el) => {
        el.tabIndex = isActive ? 0 : -1;
      });
    });
  }, [activeCardIndex, items.length]);

  const navigateToCard = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, items.length - 1));
    // Update tabIndex immediately on DOM for responsive focus
    cardRefs.current[activeCardIndex]?.setAttribute('tabindex', '-1');
    cardRefs.current[newIndex]?.setAttribute('tabindex', '0');
    cardRefs.current[newIndex]?.focus();
    setActiveCardIndex(newIndex);
    const newPage = Math.floor(newIndex / itemsPerPage);
    setPageNr(newPage);
  };

  const handleCardListKeyDown = (e: React.KeyboardEvent) => {
    const activeCard = cardRefs.current[activeCardIndex];
    const isOnCard = e.target == activeCard;
    const isInsideCard = activeCard?.contains(e.target as Node);

    // Arrow keys navigate between cards regardless of where focus is within the card
    if (isOnCard || isInsideCard) {
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          if (activeCardIndex < items.length - 1) {
            navigateToCard(activeCardIndex + 1);
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (activeCardIndex > 0) {
            navigateToCard(activeCardIndex - 1);
          }
          break;
        case 'Home':
          e.preventDefault();
          navigateToCard(0);
          break;
        case 'End':
          e.preventDefault();
          navigateToCard(items.length - 1);
          break;
      }
    }

    // Enter activates the card's main link only when focus is on the card itself
    if (isOnCard && e.key === 'Enter') {
      e.preventDefault();
      const mainLink = activeCard?.querySelector<HTMLElement>('a[href]');
      if (mainLink) {
        mainLink.click();
      }
    }

    // Escape from inside card content returns focus to the card
    if (e.key === 'Escape' && !isOnCard && isInsideCard) {
      e.preventDefault();
      activeCard?.focus();
    }
  };

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
          setItemsPerPage(Math.max(Math.floor((entry.contentRect.width + gap) / (itemWidth + gap)), 1));
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
  }, [itemsPerPage, getPageCount, itemWidth, items.length, pageNr, gap]);

  return (
    <>
      <ul
        ref={containerRef}
        aria-roledescription="carousel"
        className={`ds:flex ds:flex-row ds:overflow-hidden ${className}`.trim()}
        style={{ gap }}
        data-testid={testId ? `${testId}-list` : undefined}
        onKeyDown={handleCardListKeyDown}
      >
        {items.map((item, index) => (
          <li
            key={item.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            aria-roledescription="slide"
            tabIndex={index === activeCardIndex ? 0 : -1}
            className={`ds:flex ds:rounded ds:outline-offset-2 ${index === activeCardIndex ? 'ds:ring-2 ds:ring-accent ds:ring-inset' : ''}`}
            style={{ width: itemWidth }}
          >
            {item.component}
          </li>
        ))}
      </ul>
      <div
        className="ds:flex ds:flex-row ds:gap-2 ds:justify-between ds:items-center ds:p-3"
        data-testid={testId ? `${testId}-controls` : undefined}
      >
        <button
          onClick={goToPreviousPage}
          onKeyDown={handleEnterPress(goToPreviousPage)}
          aria-label={translations.prevTrigger}
          disabled={isFirstPage}
          className="ds:size-8 ds:flex ds:justify-center ds:items-center ds:bg-bg-gray-2 ds:rounded-full ds:cursor-pointer ds:disabled:cursor-not-allowed"
        >
          <JodPagerPrev size={24} className={isFirstPage ? 'ds:text-inactive-gray' : 'ds:text-primary-gray'} />
        </button>

        <div className="ds:flex ds:flex-row ds:gap-2 ds:justify-center">
          {Array.from({ length: Math.max(1, pageCount) }, (_, page) => (
            <button
              type="button"
              key={page}
              className={`ds:cursor-pointer ds:rounded-full ds:size-4 ${pageNr === page ? 'ds:bg-accent' : 'ds:bg-[#d4d4d4]'}`}
              disabled={pageNr === page}
              aria-pressed={pageNr === page}
              onClick={goToPage(page)}
              onKeyDown={handleEnterPress(goToPage(page))}
            >
              <span className="ds:sr-only">{translations.indicator(page)}</span>
            </button>
          ))}
        </div>

        <button
          onClick={goToNextPage}
          onKeyDown={handleEnterPress(goToNextPage)}
          aria-label={translations.nextTrigger}
          disabled={isLastPage}
          className="ds:size-8 ds:flex ds:justify-center ds:items-center ds:bg-bg-gray-2 ds:rounded-full ds:cursor-pointer ds:disabled:cursor-not-allowed"
        >
          <JodPagerNext size={24} className={isLastPage ? 'ds:text-inactive-gray' : 'ds:text-primary-gray'} />
        </button>
      </div>
    </>
  );
};
