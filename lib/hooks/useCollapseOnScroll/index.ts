import React from 'react';

interface UseCollapseOnScrollProps {
  onCollapse: () => void;
  onUncollapse: () => void;
}
export const useCollapseOnScroll = (props: UseCollapseOnScrollProps) => {
  const lastScrollY = React.useRef(0);
  const isCollapsed = React.useRef(false);
  const ignoreScroll = React.useRef(false);
  const SCROLL_THRESHOLD = 10;

  // Function to reset the scroll state. Handy when the collapsing
  // state is set elsewhere (e.g., the "show all" button click in NoteStack).
  const resetCollapseState = () => {
    lastScrollY.current = globalThis.scrollY;
    isCollapsed.current = false;
    ignoreScroll.current = false;
  };

  const ignoreScrollChecksForMs = (ms: number) => {
    ignoreScroll.current = true;
    globalThis.setTimeout(() => {
      ignoreScroll.current = false;
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
      const currentScrollY = globalThis.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;

      if (scrollDelta > SCROLL_THRESHOLD && !isCollapsed.current) {
        props.onCollapse();
        isCollapsed.current = true;
        ignoreScrollChecksForMs(100);
      } else if (scrollDelta < -SCROLL_THRESHOLD && isCollapsed.current) {
        props.onUncollapse();
        isCollapsed.current = false;
        ignoreScrollChecksForMs(100);
      }

      if (Math.abs(scrollDelta) >= SCROLL_THRESHOLD) {
        lastScrollY.current = currentScrollY;
      }
    });
  }, [props]);

  React.useEffect(() => {
    lastScrollY.current = globalThis.scrollY;
    globalThis.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      globalThis.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        globalThis.cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll]);

  return { resetCollapseState };
};
