import React from 'react';

/** Hook to collapse the navigation bar on scroll down and expand on scroll up */
export const useCollapseOnScroll = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      if (current !== lastScrollY.current) {
        setIsCollapsed(current > 0 && current > lastScrollY.current);
        lastScrollY.current = current;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return isCollapsed;
};

/** Hook to synchronize the height of a wrapper element with the height of the referenced element */
export const useWrapperHeightSync = (
  wrapperRef: React.RefObject<HTMLDivElement | null>,
  ref: React.RefObject<HTMLDivElement | null>,
) => {
  React.useEffect(() => {
    const element = ref.current;
    const wrapperElement = wrapperRef.current;
    if (!element || !wrapperElement) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newHeight = entry.borderBoxSize?.[0]?.blockSize;

        wrapperElement.style.height = `${newHeight}px`;
      }
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [wrapperRef, ref]);
};

/** Extra space between the sticky header and a focused or scrolled-to element */
const SCROLL_PADDING_GAP = 16;

/**
 * Hook to reserve space for the sticky header with `scroll-padding-top`,
 * so that keyboard focus and anchor navigation do not scroll elements under the header.
 */
export const useScrollPaddingForHeader = (
  headerRef: React.RefObject<HTMLDivElement | null>,
  notesRef: React.RefObject<HTMLDivElement | null>,
) => {
  React.useEffect(() => {
    const header = headerRef.current;
    const notes = notesRef.current;
    if (!header || !notes) {
      return;
    }

    const root = document.documentElement;
    const previousScrollPaddingTop = root.style.scrollPaddingTop;

    // Offset heights are not affected by the collapse transition (top), so the space for the expanded
    // header is reserved. Header expands when scrolling backwards, e.g. with Shift+Tab.
    const update = () => {
      root.style.scrollPaddingTop = `${header.offsetHeight + notes.offsetHeight + SCROLL_PADDING_GAP}px`;
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(header);
    observer.observe(notes);

    return () => {
      observer.disconnect();
      root.style.scrollPaddingTop = previousScrollPaddingTop;
    };
  }, [headerRef, notesRef]);
};
