/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';

import { Carousel, type CarouselHandle, type CarouselItem } from '../Carousel/Carousel';

export type CardCarouselItem = CarouselItem;

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

/**
 * A carousel for cards. The cards can be navigated with the arrow keys, and only the content of the active card can be
 * reached with the tab key.
 */
export const CardCarousel = ({
  items = [],
  translations,
  itemWidth,
  gap = 16,
  className = '',
  testId,
}: CardCarouselProps) => {
  const carouselRef = React.useRef<CarouselHandle>(null);
  const cardRefs = React.useRef<(HTMLLIElement | null)[]>([]);
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);

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
    carouselRef.current?.scrollToItem(newIndex);
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

  return (
    <Carousel
      ref={carouselRef}
      items={items}
      itemWidth={itemWidth}
      gap={gap}
      translations={translations}
      className={className}
      testId={testId}
      // The focus of the cards is managed here, and a card has to be focusable before the carousel has moved to it
      inertOffscreen={false}
      onKeyDown={handleCardListKeyDown}
      getSlideProps={(index) => ({
        ref: (el) => {
          cardRefs.current[index] = el;
        },
        tabIndex: index === activeCardIndex ? 0 : -1,
        className: `ds:rounded ds:outline-offset-2 ${index === activeCardIndex ? 'ds:ring-2 ds:ring-accent ds:ring-inset' : ''}`,
      })}
    />
  );
};
