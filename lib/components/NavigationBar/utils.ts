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
        setIsCollapsed(current > lastScrollY.current);
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
