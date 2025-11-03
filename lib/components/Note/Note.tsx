import React from 'react';
import { cx } from '../../cva';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { JodClose } from '../../icons';
import { tidyClasses as tc } from '../../utils';

export interface NoteProps {
  /** Title shown on the note */
  title?: string;
  /** Description shown on the note */
  description?: string;
  /** Icon shown on the note */
  variant?: 'success' | 'warning' | 'error' | 'feedback';
  /** Callback fired on tap/click of the close button */
  onCloseClick?: () => void;
  /** Call to action (CTA) component */
  readMoreComponent?: React.ReactNode;
  /** Direction of the note animation */
  direction?: 'up' | 'down';
  /** If true, the note will always be visible */
  permanent?: boolean;
  /** If true, the note will be collapsed */
  collapsed?: boolean;
  /** Data-testid attribute for querying in tests */
  dataTestId?: string;
  /** Additional CSS classnames */
  className?: string;
}

/** Dialogs display important information that users need to acknowledge. They appear over the interface and block further interactions. */
export const Note = ({
  collapsed,
  description,
  onCloseClick,
  permanent,
  direction,
  readMoreComponent,
  title,
  variant = 'success',
  className = '',
  dataTestId,
}: NoteProps) => {
  const { sm } = useMediaQueries();
  const ref = React.useRef<HTMLDivElement>(null);

  // Handle negative margin for hiding the note on scroll
  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newHeight = entry.borderBoxSize?.[0]?.blockSize;

        element.style.marginTop = `-${direction === 'down' ? newHeight : 0}px`;
      }
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [direction]);

  // Workaround for transition issue on breakpoint change
  const timeoutRef = React.useRef<number | null>(null);
  React.useEffect(() => {
    const handleResize = () => {
      const el = ref.current;
      if (!el) return;

      el.style.transition = 'none';

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        el.style.transition = '';
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      aria-hidden={collapsed}
      tabIndex={collapsed ? -1 : undefined}
      className={cx(tc(`ds:text-primary-gray ds:transition-[margin] ds:duration-1000 ${className}`), {
        'ds:bg-success ds:text-primary-gray': variant === 'success',
        'ds:bg-warning ds:text-primary-gray': variant === 'warning',
        'ds:bg-alert ds:text-white': variant === 'error',
        'ds:bg-secondary-3 ds:text-primary-gray': variant === 'feedback',
        'ds:px-5 ds:pt-4 ds:pb-3 ds:sm:py-2 ds:md:py-1 ds:lg:py-0': !collapsed,
        'ds:py-0': collapsed,
      })}
      data-testid={dataTestId}
    >
      <div className="ds:mx-auto ds:flex ds:min-h-8 ds:items-center ds:sm:justify-center ds:gap-3 ds:sm:gap-6">
        <div className="ds:flex ds:flex-col ds:sm:flex-row ds:flex-wrap ds:sm:items-center ds:sm:gap-x-6">
          <div className="ds:text-heading-4 ds:text-pretty">{title}</div>
          <div className="ds:text-body-md ds:font-arial ds:text-pretty">{description}</div>
          {readMoreComponent && !sm && <span className="ds:mt-3">{readMoreComponent}</span>}
        </div>

        <div className="ds:flex ds:sm:items-center ds:gap-6 ds:not-sm:self-start">
          {sm && readMoreComponent}
          {onCloseClick && !permanent && (
            <button
              className="ds:cursor-pointer ds:flex"
              type="button"
              aria-label="Close"
              onClick={onCloseClick}
              data-testid={dataTestId ? `${dataTestId}-close` : undefined}
            >
              <JodClose />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
