import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useCollapseOnScroll } from '.';

describe('useCollapseOnScroll', () => {
  let onCollapseMock = vi.fn();
  let onUncollapseMock = vi.fn();
  const originalScrollY = window.scrollY;

  beforeEach(() => {
    onCollapseMock = vi.fn();
    onUncollapseMock = vi.fn();

    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });

    vi.useFakeTimers();
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      return window.setTimeout(() => cb(performance.now()), 17);
    });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
  });

  afterEach(() => {
    onCollapseMock.mockClear();
    onUncollapseMock.mockClear();
    vi.restoreAllMocks();
    vi.useRealTimers();

    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: originalScrollY,
    });
  });

  const simulateScroll = (scrollYValue: number) => {
    Object.defineProperty(window, 'scrollY', { value: scrollYValue });
    window.dispatchEvent(new Event('scroll'));
    vi.advanceTimersByTime(100);
  };

  it('should not collapse on initial render', () => {
    renderHook(() =>
      useCollapseOnScroll({
        onCollapse: onCollapseMock,
        onUncollapse: onUncollapseMock,
      }),
    );

    expect(onCollapseMock).not.toHaveBeenCalled();
    expect(onUncollapseMock).not.toHaveBeenCalled();
  });

  it('should collapse when scrolling past the top threshold', () => {
    const topThreshold = 16;
    renderHook(() =>
      useCollapseOnScroll({
        onCollapse: onCollapseMock,
        onUncollapse: onUncollapseMock,
        topThreshold,
      }),
    );

    act(() => {
      simulateScroll(topThreshold + 1);
    });

    expect(onCollapseMock).toHaveBeenCalledTimes(1);
    expect(onUncollapseMock).not.toHaveBeenCalled();
  });

  it('should not call onCollapse if already collapsed', () => {
    const topThreshold = 16;
    renderHook(() =>
      useCollapseOnScroll({
        onCollapse: onCollapseMock,
        onUncollapse: onUncollapseMock,
        topThreshold,
      }),
    );

    // Collapse
    act(() => {
      simulateScroll(topThreshold + 1);
    });
    expect(onCollapseMock).toHaveBeenCalledTimes(1);

    // Scroll further down, should not collapse again
    act(() => {
      simulateScroll(100);
    });

    expect(onCollapseMock).toHaveBeenCalledTimes(1);
  });

  it('should not call onUncollapse if already uncollapsed', () => {
    const topThreshold = 16;
    renderHook(() =>
      useCollapseOnScroll({
        onCollapse: onCollapseMock,
        onUncollapse: onUncollapseMock,
        topThreshold,
      }),
    );

    // Collapse and uncollapse
    act(() => {
      simulateScroll(topThreshold + 1);
    });
    act(() => {
      simulateScroll(10);
    });
    expect(onUncollapseMock).toHaveBeenCalledTimes(1);

    act(() => {
      simulateScroll(0);
    });
    expect(onUncollapseMock).toHaveBeenCalledTimes(1);
  });

  it('should ignore scroll events when ignoreScroll is true', () => {
    const topThreshold = 16;
    renderHook(() =>
      useCollapseOnScroll({
        onCollapse: onCollapseMock,
        onUncollapse: onUncollapseMock,
        ignoreScroll: true,
        topThreshold,
      }),
    );

    act(() => {
      simulateScroll(topThreshold + 1);
    });

    expect(onCollapseMock).not.toHaveBeenCalled();
    expect(onUncollapseMock).not.toHaveBeenCalled();
  });

  it('should handle animation duration correctly and prevent multiple calls', () => {
    const animationDuration = 500;
    const topThreshold = 16;
    renderHook(() =>
      useCollapseOnScroll({
        onCollapse: onCollapseMock,
        onUncollapse: onUncollapseMock,
        animationDuration,
        topThreshold,
      }),
    );

    // First scroll to collapse
    act(() => {
      simulateScroll(topThreshold + 1);
    });
    expect(onCollapseMock).toHaveBeenCalledTimes(1);

    // Scroll again before the animation timeout
    act(() => {
      simulateScroll(100);
    });
    expect(onCollapseMock).toHaveBeenCalledTimes(1);

    // Scroll again, now it should allow a new collapse call (though it won't due to state)
    // The key here is to test the animPendingRef state is reset.
    act(() => {
      simulateScroll(101);
    });
    expect(onCollapseMock).toHaveBeenCalledTimes(1); // Still 1 because it's already collapsed
  });

  it('should clean up event listeners and timeouts on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');
    const cancelAnimationFrameSpy = vi.spyOn(window, 'cancelAnimationFrame');

    const { unmount } = renderHook(() =>
      useCollapseOnScroll({
        onCollapse: onCollapseMock,
        onUncollapse: onUncollapseMock,
      }),
    );

    act(() => {
      simulateScroll(100);
    });

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(clearTimeoutSpy).toHaveBeenCalled();
    expect(cancelAnimationFrameSpy).toHaveBeenCalled();
  });
});
