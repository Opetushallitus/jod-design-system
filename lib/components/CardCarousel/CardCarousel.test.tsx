import { fireEvent, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';

import { CardCarousel, CardCarouselProps } from './CardCarousel';

const renderComponent = (props: Partial<CardCarouselProps> = {}) => {
  const defaultProps: CardCarouselProps = {
    items: [
      { id: '1', component: <div>Item 1</div> },
      { id: '2', component: <div>Item 2</div> },
      { id: '3', component: <div>Item 3</div> },
    ],
    itemWidth: 200,
    gap: 16,
    translations: {
      nextTrigger: 'Next',
      prevTrigger: 'Previous',
      indicator: (index) => `Page ${index + 1}`,
    },
  };

  return render(<CardCarousel {...defaultProps} {...props} />);
};

describe('CardCarousel', () => {
  it('renders the carousel items', () => {
    const { container, getByText } = renderComponent();
    expect(getByText('Item 1')).toBeInTheDocument();
    expect(getByText('Item 2')).toBeInTheDocument();
    expect(getByText('Item 3')).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });

  it('navigates to the next page', () => {
    const { getByLabelText } = renderComponent();
    const nextButton = getByLabelText('Next');
    fireEvent.click(nextButton);
    expect(nextButton).not.toBeDisabled();
  });

  it('navigates to the previous page', () => {
    const { getByLabelText } = renderComponent();
    const prevButton = getByLabelText('Previous');
    fireEvent.click(prevButton);
    expect(prevButton).toBeDisabled();
  });

  it('disables the next button on the last page', () => {
    const { getByLabelText } = renderComponent();
    const nextButton = getByLabelText('Next');
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    expect(nextButton).toBeDisabled();
  });

  it('disables the previous button on the first page', () => {
    const { getByLabelText } = renderComponent();
    const prevButton = getByLabelText('Previous');
    expect(prevButton).toBeDisabled();
  });

  it('navigates to a specific page', () => {
    const { getByText } = renderComponent();
    const pageButton = getByText('Page 2');
    fireEvent.click(pageButton);
    expect(pageButton.parentElement).toHaveClass('ds:bg-accent');
  });

  it('handles enter key press for navigation', () => {
    const { getByLabelText } = renderComponent();
    const nextButton = getByLabelText('Next');
    fireEvent.keyDown(nextButton, { key: 'Enter' });
    fireEvent.keyDown(nextButton, { key: 'Enter' });
    expect(nextButton).toBeDisabled();
  });

  it('emits data-testid when testId is provided', () => {
    const { container } = renderComponent({ testId: 'cc' });
    expect(container.querySelector('[data-testid="cc-list"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="cc-controls"]')).toBeInTheDocument();
  });

  describe('keyboard navigation', () => {
    const renderWithLinks = () =>
      renderComponent({
        items: [
          {
            id: '1',
            component: (
              <div>
                <a href="/card-1">Card 1</a>
                <a href="/tag-1a">Tag 1A</a>
              </div>
            ),
          },
          {
            id: '2',
            component: (
              <div>
                <a href="/card-2">Card 2</a>
                <a href="/tag-2a">Tag 2A</a>
              </div>
            ),
          },
          {
            id: '3',
            component: (
              <div>
                <a href="/card-3">Card 3</a>
              </div>
            ),
          },
        ],
      });

    it('first card has tabIndex 0 and others have tabIndex -1', () => {
      const { container } = renderWithLinks();
      const items = container.querySelectorAll('li[aria-roledescription="slide"]');
      expect(items[0]).toHaveAttribute('tabindex', '0');
      expect(items[1]).toHaveAttribute('tabindex', '-1');
      expect(items[2]).toHaveAttribute('tabindex', '-1');
    });

    it('ArrowRight moves focus to the next card', () => {
      const { container } = renderWithLinks();
      const items = container.querySelectorAll('li[aria-roledescription="slide"]');
      const firstCard = items[0] as HTMLElement;
      firstCard.focus();

      fireEvent.keyDown(firstCard, { key: 'ArrowRight' });
      expect(items[1]).toHaveAttribute('tabindex', '0');
      expect(items[0]).toHaveAttribute('tabindex', '-1');
    });

    it('ArrowLeft moves focus to the previous card', () => {
      const { container } = renderWithLinks();
      const items = container.querySelectorAll('li[aria-roledescription="slide"]');
      const firstCard = items[0] as HTMLElement;
      firstCard.focus();

      // Move right first, then left
      fireEvent.keyDown(firstCard, { key: 'ArrowRight' });
      fireEvent.keyDown(items[1], { key: 'ArrowLeft' });
      expect(items[0]).toHaveAttribute('tabindex', '0');
    });

    it('ArrowLeft does nothing on the first card', () => {
      const { container } = renderWithLinks();
      const items = container.querySelectorAll('li[aria-roledescription="slide"]');
      const firstCard = items[0] as HTMLElement;
      firstCard.focus();

      fireEvent.keyDown(firstCard, { key: 'ArrowLeft' });
      expect(items[0]).toHaveAttribute('tabindex', '0');
    });

    it('ArrowRight does nothing on the last card', () => {
      const { container } = renderWithLinks();
      const items = container.querySelectorAll('li[aria-roledescription="slide"]');
      const firstCard = items[0] as HTMLElement;
      firstCard.focus();

      fireEvent.keyDown(firstCard, { key: 'ArrowRight' });
      fireEvent.keyDown(items[1], { key: 'ArrowRight' });
      fireEvent.keyDown(items[2], { key: 'ArrowRight' });
      // Still on last card
      expect(items[2]).toHaveAttribute('tabindex', '0');
    });

    it('Home moves focus to the first card', () => {
      const { container } = renderWithLinks();
      const items = container.querySelectorAll('li[aria-roledescription="slide"]');
      const firstCard = items[0] as HTMLElement;
      firstCard.focus();

      fireEvent.keyDown(firstCard, { key: 'ArrowRight' });
      fireEvent.keyDown(items[1], { key: 'ArrowRight' });
      fireEvent.keyDown(items[2], { key: 'Home' });
      expect(items[0]).toHaveAttribute('tabindex', '0');
    });

    it('End moves focus to the last card', () => {
      const { container } = renderWithLinks();
      const items = container.querySelectorAll('li[aria-roledescription="slide"]');
      const firstCard = items[0] as HTMLElement;
      firstCard.focus();

      fireEvent.keyDown(firstCard, { key: 'End' });
      expect(items[2]).toHaveAttribute('tabindex', '0');
    });

    it('non-active cards have their focusable children set to tabIndex -1', () => {
      const { container } = renderWithLinks();
      const items = container.querySelectorAll('li[aria-roledescription="slide"]');

      // Active card (first) children should be focusable
      const activeLinks = items[0].querySelectorAll('a');
      activeLinks.forEach((link) => {
        expect(link.tabIndex).toBe(0);
      });

      // Non-active card children should not be focusable
      const inactiveLinks = items[1].querySelectorAll('a');
      inactiveLinks.forEach((link) => {
        expect(link.tabIndex).toBe(-1);
      });
    });

    it('Escape from inside card content returns focus to the card', () => {
      const { container } = renderWithLinks();
      const items = container.querySelectorAll('li[aria-roledescription="slide"]');
      const firstCard = items[0] as HTMLElement;
      const innerLink = items[0].querySelector('a') as HTMLElement;

      firstCard.focus();
      innerLink.focus();

      fireEvent.keyDown(innerLink, { key: 'Escape' });
      expect(document.activeElement).toBe(firstCard);
    });
  });
});

it('has no a11y violations', async () => {
  const { container } = renderComponent();
  expect(await axe(container)).toHaveNoViolations();
});
