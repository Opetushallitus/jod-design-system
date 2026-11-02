import { act, fireEvent, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Carousel, type CarouselHandle, type CarouselProps } from './Carousel';

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

const items = Array.from({ length: 5 }, (_, i) => ({ id: `${i + 1}`, component: <div>Item {i + 1}</div> }));

const renderComponent = (props: Partial<CarouselProps> = {}) => {
  const defaultProps: CarouselProps = {
    items,
    itemWidth: 200,
    gap: 16,
    translations: {
      nextTrigger: 'Next',
      prevTrigger: 'Previous',
      indicator: (index) => `Page ${index + 1}`,
    },
  };

  return render(<Carousel {...defaultProps} {...props} />);
};

const slides = (container: HTMLElement) => Array.from(container.querySelectorAll<HTMLElement>('li'));
// jsdom does not implement the inert property, so the attribute is checked
const inertStates = (container: HTMLElement) => slides(container).map((slide) => slide.hasAttribute('inert'));

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

describe('Carousel', () => {
  it('renders the items as slides of a carousel', () => {
    const { container, getByText } = renderComponent();

    expect(getByText('Item 1')).toBeInTheDocument();
    expect(getByText('Item 5')).toBeInTheDocument();
    expect(container.querySelector('ul')).toHaveAttribute('aria-roledescription', 'carousel');
    expect(slides(container)).toHaveLength(5);
    slides(container).forEach((slide) => expect(slide).toHaveAttribute('aria-roledescription', 'slide'));
  });

  it('gives the items the given width', () => {
    const { container } = renderComponent({ itemWidth: 240 });

    expect(slides(container)[0]).toHaveStyle({ width: '240px' });
  });

  it('shows the controls with the page indicators first and the pager buttons last', () => {
    const { getByTestId } = renderComponent({ testId: 'carousel' });
    const controls = getByTestId('carousel-controls');

    expect(getByTestId('carousel-list')).toBeInTheDocument();
    expect(controls.children).toHaveLength(2);
    expect(controls.children[0].querySelectorAll('button')).toHaveLength(5);
    const pagerButtons = controls.children[1].querySelectorAll('button');
    expect(pagerButtons[0]).toHaveAttribute('aria-label', 'Previous');
    expect(pagerButtons[1]).toHaveAttribute('aria-label', 'Next');
  });

  it('has one page per item when the width is not known', () => {
    const { getByText } = renderComponent();

    expect(getByText('Page 5')).toBeInTheDocument();
  });

  it('navigates with the pager buttons and disables them at the ends', () => {
    const { getByLabelText } = renderComponent({ items: items.slice(0, 3) });
    const next = getByLabelText('Next');
    const previous = getByLabelText('Previous');

    expect(previous).toBeDisabled();
    fireEvent.click(next);
    expect(previous).not.toBeDisabled();
    fireEvent.click(next);
    expect(next).toBeDisabled();
    fireEvent.click(previous);
    expect(next).not.toBeDisabled();
  });

  it('navigates to a page with the indicators', () => {
    const { getByText } = renderComponent();

    const indicator = getByText('Page 3').parentElement;
    fireEvent.click(indicator as HTMLElement);

    expect(indicator).toHaveClass('ds:bg-accent');
    expect(indicator).toHaveAttribute('aria-pressed', 'true');
  });

  it('scrolls the list to the current page', () => {
    const scrollTo = vi.spyOn(Element.prototype, 'scrollTo');
    const { getByLabelText } = renderComponent({ itemWidth: 200, gap: 16 });

    fireEvent.click(getByLabelText('Next'));

    expect(scrollTo).toHaveBeenLastCalledWith({ left: 216, behavior: 'smooth' });
  });

  describe('with the width known', () => {
    it('shows as many items on a page as fit in the width', () => {
      const setWidth = mockContainerWidth();
      const { getByText, queryByText } = renderComponent({ itemWidth: 200, gap: 16 });

      setWidth(450);

      // 450px fits two items of 200px with a gap of 16px, so five items make three pages
      expect(getByText('Page 3')).toBeInTheDocument();
      expect(queryByText('Page 4')).not.toBeInTheDocument();
    });

    it('does not stretch the items by default', () => {
      const setWidth = mockContainerWidth();
      const { container } = renderComponent({ itemWidth: 200, gap: 16 });

      setWidth(450);

      expect(slides(container)[0]).toHaveStyle({ width: '200px' });
    });

    it('stretches the items to fill the width when stretch is set', () => {
      const setWidth = mockContainerWidth();
      const { container } = renderComponent({ itemWidth: 200, gap: 16, stretch: true });

      setWidth(450);

      // Two items and the gap between them fill the 450px
      expect(slides(container)[0]).toHaveStyle({ width: '217px' });
    });

    it('shows a single item that fills the width when only one item fits', () => {
      const setWidth = mockContainerWidth();
      const { container } = renderComponent({ itemWidth: 300, gap: 16, stretch: true });

      setWidth(280);

      expect(slides(container)[0]).toHaveStyle({ width: '280px' });
    });

    it('aligns the last page to the end of the list', () => {
      const setWidth = mockContainerWidth();
      const scrollTo = vi.spyOn(Element.prototype, 'scrollTo');
      const { getByLabelText } = renderComponent({ itemWidth: 200, gap: 16 });
      setWidth(450);

      fireEvent.click(getByLabelText('Next'));
      fireEvent.click(getByLabelText('Next'));

      // The last page would start from the item 5 but the two visible items are the items 4 and 5
      expect(scrollTo).toHaveBeenLastCalledWith({ left: 3 * 216, behavior: 'smooth' });
    });

    it('makes the items outside the current page inert', () => {
      const setWidth = mockContainerWidth();
      const { container, getByLabelText } = renderComponent({ itemWidth: 200, gap: 16 });
      setWidth(450);

      expect(inertStates(container)).toEqual([false, false, true, true, true]);

      fireEvent.click(getByLabelText('Next'));
      expect(inertStates(container)).toEqual([true, true, false, false, true]);

      fireEvent.click(getByLabelText('Next'));
      expect(inertStates(container)).toEqual([true, true, true, false, false]);
    });

    it('does not make the items inert when inertOffscreen is false', () => {
      const setWidth = mockContainerWidth();
      const { container } = renderComponent({ itemWidth: 200, gap: 16, inertOffscreen: false });
      setWidth(450);

      expect(inertStates(container)).toEqual([false, false, false, false, false]);
    });
  });

  it('moves to the page of an item with the scrollToItem of the handle', () => {
    const setWidth = mockContainerWidth();
    const ref = { current: null as CarouselHandle | null };
    const { getByText } = renderComponent({ itemWidth: 200, gap: 16, ref });
    setWidth(450);

    act(() => ref.current?.scrollToItem(3));

    expect(getByText('Page 2').parentElement).toHaveAttribute('aria-pressed', 'true');
  });

  it('passes additional props to the slides and the key down handler to the list', () => {
    const onKeyDown = vi.fn<() => void>();
    const { container } = renderComponent({
      onKeyDown,
      getSlideProps: (index) => ({ tabIndex: index === 0 ? 0 : -1, className: 'custom', style: { opacity: 0.5 } }),
    });

    const [first, second] = slides(container);
    expect(first).toHaveAttribute('tabindex', '0');
    expect(second).toHaveAttribute('tabindex', '-1');
    expect(first).toHaveClass('custom', 'ds:flex');
    expect(first).toHaveStyle({ opacity: '0.5', width: '200px' });

    fireEvent.keyDown(first, { key: 'ArrowRight' });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it('handles the enter key press for the navigation', () => {
    const { getByLabelText } = renderComponent({ items: items.slice(0, 2) });
    const next = getByLabelText('Next');

    fireEvent.keyDown(next, { key: 'Enter' });

    expect(next).toBeDisabled();
  });

  it('has no a11y violations', async () => {
    const { container } = renderComponent();

    expect(await axe(container)).toHaveNoViolations();
  });
});
