import React from 'react';
import { cx } from '../../cva';
import type { NoteProps } from './Note';

export const getBgClassForNoteVariant = (variant: Exclude<NoteProps['variant'], undefined>) =>
  cx({
    'ds:bg-success ds:text-primary-gray': variant === 'success',
    'ds:bg-warning ds:text-primary-gray': variant === 'warning',
    'ds:bg-alert ds:text-white': variant === 'error',
    'ds:bg-secondary-3 ds:text-primary-gray': variant === 'feedback',
  });

export const useHideOnCollapse = (isCollapsed: boolean) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newHeight = entry.borderBoxSize?.[0]?.blockSize;

        element.style.marginTop = `-${isCollapsed ? newHeight : 0}px`;
      }
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isCollapsed]);

  return ref;
};
