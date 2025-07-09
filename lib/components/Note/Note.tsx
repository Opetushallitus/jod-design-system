import { cx } from '../../cva';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { JodClose } from '../../icons';

export interface NoteProps {
  /** Title shown on the note */
  title?: string;
  /** Description shown on the note */
  description?: string;
  /** Icon shown on the note */
  variant?: 'success' | 'warning' | 'error' | 'feedback';
  /** Callback fired on tap/click of the close button */
  onCloseClick?: () => void;
  /** Component inside the button container if variant is success */
  readMoreComponent?: React.ReactNode;
  /** If true, the note will always be visible */
  permanent?: boolean;
}

/** Dialogs display important information that users need to acknowledge. They appear over the interface and block further interactions. */
export const Note = ({
  title,
  description,
  variant = 'success',
  onCloseClick,
  readMoreComponent,
  permanent,
}: NoteProps) => {
  const { sm } = useMediaQueries();
  const hasReadMore = variant === 'success' && readMoreComponent;
  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={cx('ds:text-primary-gray ds:px-5 ds:py-3 ds:sm:py-2 ds:md:py-1 ds:lg:py-0', {
        'ds:bg-success ds:text-primary-gray': variant === 'success',
        'ds:bg-warning ds:text-primary-gray': variant === 'warning',
        'ds:bg-alert ds:text-white': variant === 'error',
        'ds:bg-secondary-gray ds:text-white': variant === 'feedback',
      })}
    >
      <div className="ds:mx-auto ds:flex ds:min-h-8 ds:items-center ds:justify-center ds:gap-6">
        <div className="ds:flex ds:flex-col ds:sm:flex-row ds:flex-wrap ds:sm:items-center ds:sm:gap-x-6">
          <div className="ds:text-heading-4 ds:text-pretty">{title}</div>
          <div className="ds:text-body-md ds:font-arial ds:text-pretty">{description}</div>
          {hasReadMore && !sm && <span className="ds:mt-3">{readMoreComponent}</span>}
        </div>

        <div className="ds:flex ds:sm:items-center ds:gap-6 ds:not-sm:self-start">
          {hasReadMore && sm && readMoreComponent}
          {onCloseClick && !permanent && (
            <button className="ds:cursor-pointer ds:flex" type="button" aria-label="Close" onClick={onCloseClick}>
              <JodClose size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
