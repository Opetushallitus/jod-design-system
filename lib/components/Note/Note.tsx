import React from 'react';
import { cx } from '../../cva';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { JodClose } from '../../icons';
import { getBgClassForNoteVariant, useHideOnCollapse } from './utils';

export interface NoteProps {
  /** Title shown on the note */
  title?: string;
  /** Description shown on the note */
  description?: string;
  /** Icon shown on the note */
  variant: 'success' | 'warning' | 'error' | 'feedback';
  /** Callback fired on tap/click of the close button */
  onCloseClick?: () => void;
  /** Label for the close button */
  ariaClose: string;
  /** Call to action (CTA) component */
  readMoreComponent?: React.ReactNode;
  /** If true, the note will always be visible */
  permanent?: boolean;
  /** If true, the note will be collapsed */
  isCollapsed?: boolean;
  /** Data-testid attribute for querying in tests */
  testId?: string;
  /** Additional CSS classnames */
  className?: string;
  /** z-index style for the note */
  zIndex?: number;
}

/** Dialogs display important information that users need to acknowledge. They appear over the interface and block further interactions. */
export const Note = ({
  description,
  onCloseClick,
  permanent,
  readMoreComponent,
  title,
  variant,
  className = '',
  ariaClose,
  isCollapsed = false,
  testId,
  zIndex,
}: NoteProps) => {
  const { sm } = useMediaQueries();
  const ref = useHideOnCollapse(isCollapsed);

  return (
    <div
      ref={ref}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      aria-hidden={isCollapsed}
      tabIndex={isCollapsed ? -1 : undefined}
      className={cx(
        'ds:text-primary-gray',
        'ds:px-5 ds:pt-4 ds:pb-3 ds:sm:py-2 ds:md:py-1 ds:lg:py-0',
        'ds:transition-[margin] ds:duration-300',
        className,
        getBgClassForNoteVariant(variant),
      )}
      data-testid={testId}
      style={{ zIndex }}
    >
      <div className="ds:mx-auto ds:flex ds:min-h-8 ds:items-center ds:justify-center ds:gap-3 ds:sm:gap-6">
        <div className="ds:flex ds:flex-col ds:sm:flex-row ds:flex-wrap ds:sm:items-center ds:sm:gap-x-6 ds:sm:w-fit ds:w-full">
          <div className="ds:text-heading-4 ds:text-pretty">{title}</div>
          <div className="ds:text-body-md ds:font-arial ds:text-pretty">{description}</div>
          {readMoreComponent && !sm && <span className="ds:mt-3">{readMoreComponent}</span>}
        </div>

        <div className="ds:flex ds:sm:items-center ds:gap-6 ds:not-sm:self-start">
          {sm && readMoreComponent}
          {onCloseClick && !permanent && (
            <button
              className="ds:flex ds:cursor-pointer"
              type="button"
              aria-label={ariaClose}
              onClick={onCloseClick}
              data-testid={testId ? `${testId}-close` : undefined}
              tabIndex={isCollapsed ? -1 : undefined}
            >
              <JodClose />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
