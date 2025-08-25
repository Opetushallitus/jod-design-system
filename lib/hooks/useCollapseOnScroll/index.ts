import React from 'react';

export interface UseCollapseOnScrollProps {
  onCollapse: () => void;
  onUncollapse: () => void;
  ignoreScroll?: boolean;
  animationDuration?: number;
  topThreshold?: number;
}

export const useCollapseOnScroll = ({
  onCollapse,
  onUncollapse,
  ignoreScroll = false,
  animationDuration = 100,
  topThreshold = 0,
}: UseCollapseOnScrollProps) => {
  const animPendingRef = React.useRef(false);
  const timeoutRef = React.useRef<number | null>(null);
  const requestAnimationFrameRef = React.useRef<number | null>(null);
  const isCollapsedRef = React.useRef(false);
  const ticking = React.useRef(false);

  React.useEffect(() => {
    // Call collapse/uncollapse based on the scroll position
    const checkScroll = () => {
      ticking.current = false;

      if (ignoreScroll || animPendingRef.current) {
        return;
      }

      const atTop = window.scrollY <= topThreshold;

      if (!atTop && !isCollapsedRef.current) {
        onCollapse();
        isCollapsedRef.current = true;
        animPendingRef.current = true;
        timeoutRef.current = window.setTimeout(() => {
          animPendingRef.current = false;
        }, animationDuration);
      } else if (atTop && isCollapsedRef.current) {
        onUncollapse();
        isCollapsedRef.current = false;
      }
    };

    // Use requestAnimationFrame for more precise scroll position detection
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrameRef.current = window.requestAnimationFrame(checkScroll);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (requestAnimationFrameRef.current) {
        window.cancelAnimationFrame(requestAnimationFrameRef.current);
        requestAnimationFrameRef.current = null;
      }
    };
  }, [animationDuration, ignoreScroll, onCollapse, onUncollapse, topThreshold]);
};
