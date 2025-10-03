import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useCollapseOnScroll } from '.';

describe('useCollapseOnScroll', () => {
  let onCollapseMock = vi.fn();
  let onUncollapseMock = vi.fn();
  const originalScrollY = globalThis.scrollY;

  beforeEach(() => {
    onCollapseMock = vi.fn();
    onUncollapseMock = vi.fn();

    Object.defineProperty(globalThis, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });

    vi.useFakeTimers();
    vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((cb) => {
      return globalThis.setTimeout(() => cb(performance.now()), 17) as unknown as number;
    });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    vi.spyOn(globalThis, 'cancelAnimationFrame').mockImplementation(() => {});
  });

  afterEach(() => {
    onCollapseMock.mockClear();
    onUncollapseMock.mockClear();
    vi.restoreAllMocks();
    vi.useRealTimers();

    Object.defineProperty(globalThis, 'scrollY', {
      writable: true,
      configurable: true,
      value: originalScrollY,
    });
  });

  const simulateScroll = (scrollYValue: number) => {
    Object.defineProperty(globalThis, 'scrollY', { value: scrollYValue });
    globalThis.dispatchEvent(new Event('scroll'));
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

  it('should not call onCollapse if already collapsed', () => {
    renderHook(() =>
      useCollapseOnScroll({
        onCollapse: onCollapseMock,
        onUncollapse: onUncollapseMock,
      }),
    );

    // Collapse
    act(() => {
      simulateScroll(100);
    });
    expect(onCollapseMock).toHaveBeenCalledTimes(1);

    // Scroll further down, should not collapse again
    act(() => {
      simulateScroll(100);
    });

    expect(onCollapseMock).toHaveBeenCalledTimes(1);
  });

  it('should not call onUncollapse if already uncollapsed', () => {
    renderHook(() =>
      useCollapseOnScroll({
        onCollapse: onCollapseMock,
        onUncollapse: onUncollapseMock,
      }),
    );

    // Collapse and uncollapse
    act(() => {
      simulateScroll(30);
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

  it('should clean up event listeners and timeouts on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(globalThis, 'removeEventListener');
    const cancelAnimationFrameSpy = vi.spyOn(globalThis, 'cancelAnimationFrame');

    const { unmount } = renderHook(() =>
      useCollapseOnScroll({
        onCollapse: onCollapseMock,
        onUncollapse: onUncollapseMock,
      }),
    );

    // Trigger scroll, but do NOT advance timers yet (animation frame is pending)
    act(() => {
      Object.defineProperty(globalThis, 'scrollY', { value: 100 });
      globalThis.dispatchEvent(new Event('scroll'));
    });

    // Unmount before the animation frame callback runs
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(cancelAnimationFrameSpy).toHaveBeenCalled();
  });
});
