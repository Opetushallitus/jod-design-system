import React from 'react';

interface UseCollapseOnScrollProps {
  /** onCollapse callback (scrolling down) */
  onCollapse: () => void;
  /** onUncollapse callback (scrolling up) */
  onUncollapse: () => void;
  /** Optional delay (ms) to ignore scroll events after mount */
  startupDelayMs?: number;
}
export const useCollapseOnScroll = (props: UseCollapseOnScrollProps) => {
  const lastScrollY = React.useRef(0);
  const isCollapsed = React.useRef(false);
  const ignoreScroll = React.useRef(false);
  const scrollHeightDelta = React.useRef(0);
  const SCROLL_THRESHOLD = 5;
  const ANIMATION_IGNORE_DELAY = 400;

  const getScrollY = () => {
    return globalThis.scrollY - scrollHeightDelta.current;
  };

  // Function to reset the scroll state. Handy when the collapsing
  // state is set elsewhere (e.g., the "show all" button click in NoteStack).
  const resetCollapseState = () => {
    lastScrollY.current = globalThis.scrollY;
    isCollapsed.current = false;
    ignoreScroll.current = false;
    ignoreScrollChecksForMs();
  };

  const ignoreScrollChecksForMs = (ms = ANIMATION_IGNORE_DELAY) => {
    ignoreScroll.current = true;
    const startScrollHeight = globalThis.document.body.scrollHeight;

    globalThis.setTimeout(() => {
      ignoreScroll.current = false;
      scrollHeightDelta.current = globalThis.document.body.scrollHeight - startScrollHeight;
    }, ms);
  };

  // Throttle scroll handler with requestAnimationFrame
  const rafId = React.useRef<number | null>(null);

  const handleScroll = React.useCallback(() => {
    if (rafId.current) {
      return;
    }
    // Use requestAnimationFrame for better performance
    rafId.current = globalThis.requestAnimationFrame(() => {
      rafId.current = null;
      if (ignoreScroll.current) {
        return;
      }
      const currentScrollY = getScrollY();
      const scrollDelta = currentScrollY - lastScrollY.current;

      if (scrollDelta > SCROLL_THRESHOLD && !isCollapsed.current) {
        props.onCollapse();
        isCollapsed.current = true;
        ignoreScrollChecksForMs();
      } else if (scrollDelta < -SCROLL_THRESHOLD && isCollapsed.current) {
        props.onUncollapse();
        isCollapsed.current = false;
        ignoreScrollChecksForMs();
      }

      if (Math.abs(scrollDelta) >= SCROLL_THRESHOLD) {
        lastScrollY.current = currentScrollY;
      }
    });
  }, [props]);

  // Initial ignore on mount
  React.useEffect(() => {
    if (props.startupDelayMs) {
      ignoreScrollChecksForMs(props.startupDelayMs);
    }
  }, [props.startupDelayMs]);

  React.useEffect(() => {
    lastScrollY.current = globalThis.scrollY;
    globalThis.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      globalThis.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        globalThis.cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll, props.startupDelayMs]);

  return { resetCollapseState };
};
