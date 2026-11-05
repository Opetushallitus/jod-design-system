/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';

import { JodPagerNext, JodPagerPrev } from '../../icons';
import { tidyClasses } from '../../utils';

export interface CardCarouselItem {
  /** Id to be used as key during iteration */
  id: string;
  /** Component to be rendered in the carousel */
  component: React.ReactNode;
}

export interface CardCarouselProps {
  /** Items to show in the carousel */
  items?: CardCarouselItem[];
  /** Width of each item in the carousel. With `stretch` this is the minimum width of an item. */
  itemWidth: number;
  /**
   * Whether the cards grow to fill the whole width of the carousel. The number of cards shown at a time is still
   * decided by `itemWidth`, so there are as many cards as fit in the carousel with their minimum width.
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
  className?: string;
  testId?: string;
}

const pagerButtonClassName =
  'ds:size-8 ds:flex ds:justify-center ds:items-center ds:bg-bg-gray-2 ds:rounded-full ds:cursor-pointer ds:disabled:cursor-not-allowed';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]';

/**
 * Makes the content of the card reachable with the tab key only when the card is active. A card without any focusable
 * content is focusable itself when it is active, so that it can still be navigated to.
 */
const setCardTabStop = (card: HTMLElement | null, isActive: boolean) => {
  if (!card) {
    return;
  }
  const focusableElements = card.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
  focusableElements.forEach((el) => {
    el.tabIndex = isActive ? 0 : -1;
  });
  card.tabIndex = isActive && focusableElements.length === 0 ? 0 : -1;
};

/**
 * A carousel for cards that shows the cards in pages. The pages are changed with the pager buttons or by selecting a
 * page with the indicators. Only the content of the active card can be reached with the tab key, and the arrow keys
 * move the focus to the first focusable element of the previous or the next card. The cards that are not on the
 * current page are not hidden from assistive technologies, and the carousel moves to the page of a card that gets
 * focus.
 */
export const CardCarousel = ({
  items = [],
  translations,
  itemWidth,
  stretch = false,
  gap = 16,
  className = '',
  testId,
}: CardCarouselProps) => {
  const containerRef = React.useRef<HTMLUListElement>(null);
  const cardRefs = React.useRef<(HTMLLIElement | null)[]>([]);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [pageNr, setPageNr] = React.useState(0);
  const [activeCard, setActiveCard] = React.useState(0);

  const itemsPerPage = Math.max(1, Math.floor((containerWidth + gap) / (itemWidth + gap)));
  const cardWidth =
    stretch && containerWidth > 0 ? (containerWidth - gap * (itemsPerPage - 1)) / itemsPerPage : itemWidth;
  const pageCount = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const currentPage = Math.min(pageNr, pageCount - 1);
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === pageCount - 1;
  // The last page is aligned to the end of the list, as the list cannot be scrolled past its last item
  const firstVisibleIndex = Math.max(0, Math.min(currentPage * itemsPerPage, items.length - itemsPerPage));
  const activeCardIndex = Math.min(activeCard, Math.max(0, items.length - 1));

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
    containerRef.current?.scrollTo({ left: firstVisibleIndex * (cardWidth + gap), behavior: 'smooth' });
  }, [firstVisibleIndex, cardWidth, gap]);

  // Manage tabIndex of focusable elements inside cards so only the active card's content is tabbable
  React.useEffect(() => {
    cardRefs.current.forEach((card, index) => setCardTabStop(card, index === activeCardIndex));
  }, [activeCardIndex, items.length]);

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

  const navigateToCard = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, items.length - 1));
    // Update tabIndex immediately on DOM for responsive focus
    setCardTabStop(cardRefs.current[activeCardIndex], false);
    const newCard = cardRefs.current[newIndex];
    setCardTabStop(newCard, true);
    (newCard?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR) ?? newCard)?.focus();
    setActiveCard(newIndex);
    setPageNr(Math.floor(newIndex / itemsPerPage));
  };

  // Focus can move to a card without the arrow keys, for example with a screen reader, also to a card that is not
  // visible. The carousel moves to the page of the card.
  const handleCardFocus = (index: number) => () => {
    setActiveCard(index);
    if (index < firstVisibleIndex || index >= firstVisibleIndex + itemsPerPage) {
      setPageNr(Math.floor(index / itemsPerPage));
    }
  };

  const handleCardListKeyDown = (e: React.KeyboardEvent) => {
    // Shortcuts of the browser (e.g. Alt or Cmd with the arrows to go back) and the screen reader (e.g. the VoiceOver
    // modifier with the arrows) are not handled
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
      return;
    }
    // Arrow keys navigate between cards regardless of where focus is within the active card
    if (!cardRefs.current[activeCardIndex]?.contains(e.target as Node)) {
      return;
    }
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
  };

  return (
    <>
      <ul // NOSONAR: the role is needed, as VoiceOver does not expose a list without the list style as a list
        ref={containerRef}
        // VoiceOver does not expose a list without the list style as a list, unless it has the role
        // oxlint-disable-next-line jsx-a11y/no-redundant-roles
        role="list"
        className={tidyClasses(`ds:flex ds:flex-row ds:overflow-hidden ${className}`)}
        style={{ gap }}
        data-testid={testId ? `${testId}-list` : undefined}
        onKeyDown={handleCardListKeyDown}
      >
        {items.map((item, index) => (
          <li // NOSONAR: see the role of the list
            key={item.id}
            // oxlint-disable-next-line jsx-a11y/no-redundant-roles
            role="listitem"
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            // The tab stops are managed by setCardTabStop. The card itself is only focusable if it has no focusable content.
            // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={-1}
            onFocus={handleCardFocus(index)}
            className="ds:flex ds:shrink-0 ds:rounded ds:outline-offset-2"
            style={{ width: cardWidth }}
          >
            {item.component}
          </li>
        ))}
      </ul>
      {/* The controls are for the mouse and touch users. Assistive technologies can reach all the cards, and the keyboard
          users change the page with the arrow keys, so the buttons are hidden and not in the tab order. */}
      <div
        aria-hidden="true"
        className="ds:flex ds:flex-row ds:gap-4 ds:justify-between ds:items-center ds:pt-5 ds:px-4"
        data-testid={testId ? `${testId}-controls` : undefined}
      >
        <div className="ds:flex ds:flex-row ds:flex-wrap ds:gap-2 ds:items-center">
          {Array.from({ length: pageCount }, (_, page) => (
            <button
              type="button"
              tabIndex={-1}
              key={page}
              className={`ds:cursor-pointer ds:rounded-full ds:size-4 ${currentPage === page ? 'ds:bg-accent' : 'ds:bg-[#d4d4d4]'}`}
              disabled={currentPage === page}
              aria-pressed={currentPage === page}
              onClick={goToPage(page)}
            >
              <span className="ds:sr-only">{translations.indicator(page)}</span>
            </button>
          ))}
        </div>

        <div className="ds:flex ds:flex-row ds:gap-6">
          <button
            type="button"
            tabIndex={-1}
            onClick={goToPreviousPage}
            aria-label={translations.prevTrigger}
            disabled={isFirstPage}
            className={pagerButtonClassName}
          >
            <JodPagerPrev size={24} className={isFirstPage ? 'ds:text-inactive-gray' : 'ds:text-primary-gray'} />
          </button>
          <button
            type="button"
            tabIndex={-1}
            onClick={goToNextPage}
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
