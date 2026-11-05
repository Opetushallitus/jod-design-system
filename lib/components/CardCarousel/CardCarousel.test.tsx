import { act, fireEvent, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { afterEach, describe, expect, it, vi } from 'vitest';

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

type ResizeCallback = (entries: { target: Element; contentRect: { width: number } }[]) => void;

/** Replaces the ResizeObserver mock with one that lets the test decide the width of the observed element */
const mockContainerWidth = () => {
  let callback: ResizeCallback | undefined;
  let observed: Element | undefined;
  vi.stubGlobal(
    'ResizeObserver',
    class {
      constructor(cb: ResizeCallback) {
        callback = cb;
      }
      observe = (element: Element) => {
        observed = element;
      };
      unobserve = vi.fn<() => void>();
      disconnect = vi.fn<() => void>();
    },
  );
  return (width: number) =>
    act(() => {
      callback?.([{ target: observed as Element, contentRect: { width } }]);
    });
};

const fiveItems = Array.from({ length: 5 }, (_, i) => ({
  id: `${i + 1}`,
  component: <button type="button">{i + 1}</button>,
}));

const slides = (container: HTMLElement) => Array.from(container.querySelectorAll<HTMLElement>('li'));

afterEach(() => {
  vi.unstubAllGlobals();
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe = vi.fn<() => void>();
      unobserve = vi.fn<() => void>();
      disconnect = vi.fn<() => void>();
    },
  );
});

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

  it('hides the controls from assistive technologies and keeps them out of the tab order', () => {
    const { getByTestId } = renderComponent({ testId: 'cc' });
    const controls = getByTestId('cc-controls');

    expect(controls).toHaveAttribute('aria-hidden', 'true');
    controls.querySelectorAll('button').forEach((button) => expect(button).toHaveAttribute('tabindex', '-1'));
  });

  it('emits data-testid when testId is provided', () => {
    const { container } = renderComponent({ testId: 'cc' });
    expect(container.querySelector('[data-testid="cc-list"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="cc-controls"]')).toBeInTheDocument();
  });

  it('renders the cards as the items of a list without a custom role description', () => {
    const { container, getAllByRole, getByRole } = renderComponent({ items: fiveItems });

    // The roles are explicit, as VoiceOver does not expose a list without the list style as a list
    expect(getByRole('list')).toHaveAttribute('role', 'list');
    expect(getByRole('list')).not.toHaveAttribute('aria-roledescription');
    expect(getAllByRole('listitem')).toHaveLength(5);
    expect(container.querySelector('[aria-roledescription]')).toBeNull();
  });

  it('shows the page indicators first and the pager buttons last in the controls', () => {
    const { getByTestId } = renderComponent({ items: fiveItems, testId: 'cc' });
    const controls = getByTestId('cc-controls');

    expect(controls.children).toHaveLength(2);
    expect(controls.children[0].querySelectorAll('button')).toHaveLength(5);
    const pagerButtons = controls.children[1].querySelectorAll('button');
    expect(pagerButtons[0]).toHaveAttribute('aria-label', 'Previous');
    expect(pagerButtons[1]).toHaveAttribute('aria-label', 'Next');
  });

  it('scrolls the list to the current page', () => {
    const scrollTo = vi.spyOn(Element.prototype, 'scrollTo');
    const { getByLabelText } = renderComponent({ items: fiveItems });

    fireEvent.click(getByLabelText('Next'));

    expect(scrollTo).toHaveBeenLastCalledWith({ left: 216, behavior: 'smooth' });
  });

  describe('with the width known', () => {
    it('shows as many cards on a page as fit in the width', () => {
      const setWidth = mockContainerWidth();
      const { getByText, queryByText } = renderComponent({ items: fiveItems });

      setWidth(450);

      // 450px fits two cards of 200px with a gap of 16px, so five cards make three pages
      expect(getByText('Page 3')).toBeInTheDocument();
      expect(queryByText('Page 4')).not.toBeInTheDocument();
    });

    it('does not stretch the cards by default', () => {
      const setWidth = mockContainerWidth();
      const { container } = renderComponent({ items: fiveItems });

      setWidth(450);

      expect(slides(container)[0]).toHaveStyle({ width: '200px' });
    });

    it('stretches the cards to fill the width when stretch is set', () => {
      const setWidth = mockContainerWidth();
      const { container } = renderComponent({ items: fiveItems, stretch: true });

      setWidth(450);

      // Two cards and the gap between them fill the 450px
      expect(slides(container)[0]).toHaveStyle({ width: '217px' });
    });

    it('shows a single card that fills the width when only one card fits', () => {
      const setWidth = mockContainerWidth();
      const { container } = renderComponent({ items: fiveItems, itemWidth: 300, stretch: true });

      setWidth(280);

      expect(slides(container)[0]).toHaveStyle({ width: '280px' });
    });

    it('aligns the last page to the end of the list', () => {
      const setWidth = mockContainerWidth();
      const scrollTo = vi.spyOn(Element.prototype, 'scrollTo');
      const { getByLabelText } = renderComponent({ items: fiveItems });
      setWidth(450);

      fireEvent.click(getByLabelText('Next'));
      fireEvent.click(getByLabelText('Next'));

      // The last page would start from the card 5 but the two visible cards are the cards 4 and 5
      expect(scrollTo).toHaveBeenLastCalledWith({ left: 3 * 216, behavior: 'smooth' });
    });

    it('does not hide the cards outside the current page from assistive technologies', () => {
      const setWidth = mockContainerWidth();
      const { container } = renderComponent({ items: fiveItems });
      setWidth(450);

      slides(container).forEach((slide) => expect(slide).not.toHaveAttribute('inert'));
    });

    it('moves to the page of the card that the arrow keys move to', () => {
      const setWidth = mockContainerWidth();
      const { getByText } = renderComponent({ items: fiveItems });
      setWidth(450);
      const press = (label: string, key: string) => fireEvent.keyDown(getByText(label), { key });

      press('1', 'ArrowRight');
      expect(getByText('Page 1').parentElement).toHaveAttribute('aria-pressed', 'true');

      press('2', 'ArrowRight');
      expect(getByText('Page 2').parentElement).toHaveAttribute('aria-pressed', 'true');

      press('3', 'End');
      expect(getByText('Page 3').parentElement).toHaveAttribute('aria-pressed', 'true');

      press('5', 'Home');
      expect(getByText('Page 1').parentElement).toHaveAttribute('aria-pressed', 'true');
    });

    it('moves to the page of a card that gets focus', () => {
      const setWidth = mockContainerWidth();
      const { getByText } = renderComponent({ items: fiveItems });
      setWidth(450);

      fireEvent.focus(getByText('4'));
      expect(getByText('Page 2').parentElement).toHaveAttribute('aria-pressed', 'true');
      expect(getByText('4').tabIndex).toBe(0);
      expect(getByText('1').tabIndex).toBe(-1);

      fireEvent.focus(getByText('1'));
      expect(getByText('Page 1').parentElement).toHaveAttribute('aria-pressed', 'true');
    });
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

    const cards = (container: HTMLElement) => Array.from(container.querySelectorAll<HTMLElement>('li'));
    const firstLink = (card: HTMLElement) => card.querySelector('a') as HTMLElement;
    const press = (element: HTMLElement, key: string) => fireEvent.keyDown(element, { key });

    it('makes only the content of the first card tabbable and not the cards themselves', () => {
      const { container } = renderWithLinks();

      cards(container).forEach((card) => expect(card).toHaveAttribute('tabindex', '-1'));
      cards(container)[0]
        .querySelectorAll('a')
        .forEach((link) => expect(link.tabIndex).toBe(0));
      cards(container)[1]
        .querySelectorAll('a')
        .forEach((link) => expect(link.tabIndex).toBe(-1));
    });

    it('ArrowRight moves focus to the first focusable element of the next card', () => {
      const { container } = renderWithLinks();
      const [first, second] = cards(container);
      firstLink(first).focus();

      press(firstLink(first), 'ArrowRight');

      expect(document.activeElement).toBe(firstLink(second));
      expect(firstLink(second).tabIndex).toBe(0);
      expect(firstLink(first).tabIndex).toBe(-1);
    });

    it('arrow keys work from any focusable element of the active card', () => {
      const { container } = renderWithLinks();
      const [first, second] = cards(container);
      const secondLinkOfFirst = first.querySelectorAll('a')[1];
      secondLinkOfFirst.focus();

      press(secondLinkOfFirst, 'ArrowRight');

      expect(document.activeElement).toBe(firstLink(second));
    });

    it('ArrowLeft moves focus to the previous card', () => {
      const { container } = renderWithLinks();
      const [first, second] = cards(container);
      firstLink(first).focus();

      press(firstLink(first), 'ArrowRight');
      press(firstLink(second), 'ArrowLeft');

      expect(document.activeElement).toBe(firstLink(first));
    });

    it.each(['altKey', 'ctrlKey', 'metaKey', 'shiftKey'])('does not handle the keys with %s pressed', (modifier) => {
      const { container } = renderWithLinks();
      const [first] = cards(container);
      firstLink(first).focus();

      const notPrevented = fireEvent.keyDown(firstLink(first), { key: 'ArrowRight', [modifier]: true });

      expect(notPrevented).toBe(true);
      expect(document.activeElement).toBe(firstLink(first));
    });

    it('ArrowLeft does nothing on the first card', () => {
      const { container } = renderWithLinks();
      const [first] = cards(container);
      firstLink(first).focus();

      press(firstLink(first), 'ArrowLeft');

      expect(document.activeElement).toBe(firstLink(first));
    });

    it('ArrowRight does nothing on the last card', () => {
      const { container } = renderWithLinks();
      const [, , third] = cards(container);

      press(firstLink(cards(container)[0]), 'End');
      press(firstLink(third), 'ArrowRight');

      expect(document.activeElement).toBe(firstLink(third));
    });

    it('Home moves focus to the first card', () => {
      const { container } = renderWithLinks();
      const [first, , third] = cards(container);
      firstLink(first).focus();

      press(firstLink(first), 'End');
      press(firstLink(third), 'Home');

      expect(document.activeElement).toBe(firstLink(first));
    });

    it('End moves focus to the last card', () => {
      const { container } = renderWithLinks();
      const [first, , third] = cards(container);
      firstLink(first).focus();

      press(firstLink(first), 'End');

      expect(document.activeElement).toBe(firstLink(third));
    });

    it('makes a card active when its content gets focus without the arrow keys', () => {
      const { container } = renderWithLinks();
      const [first, second] = cards(container);

      fireEvent.focus(firstLink(second));

      expect(firstLink(second).tabIndex).toBe(0);
      expect(firstLink(first).tabIndex).toBe(-1);
    });

    it('makes a card without focusable content focusable when it is active', () => {
      const { container } = renderComponent({
        items: [
          { id: '1', component: <p>Text 1</p> },
          { id: '2', component: <p>Text 2</p> },
        ],
      });
      const [first, second] = cards(container);

      expect(first).toHaveAttribute('tabindex', '0');
      expect(second).toHaveAttribute('tabindex', '-1');

      press(first, 'ArrowRight');

      expect(document.activeElement).toBe(second);
      expect(second).toHaveAttribute('tabindex', '0');
      expect(first).toHaveAttribute('tabindex', '-1');
    });
  });
});

it('has no a11y violations', async () => {
  const { container } = renderComponent();
  expect(await axe(container)).toHaveNoViolations();
});
