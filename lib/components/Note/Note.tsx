import { cx } from '../../cva';
import { useMediaQueries } from '../../hooks/useMediaQueries';

export interface NoteProps {
  /** Title shown on the note */
  title?: string;
  /** Description shown on the note */
  description?: string;
  /** Icon shown on the note */
  variant?: 'success' | 'warning' | 'error';
  /** Callback fired on tap/click of the close button */
  onCloseClick?: () => void;
  /** Component inside the button container if variant is success */
  readMoreComponent?: React.ReactNode;
}

/** Dialogs display important information that users need to acknowledge. They appear over the interface and block further interactions. */
export const Note = ({ title, description, variant = 'success', onCloseClick, readMoreComponent }: NoteProps) => {
  const { sm } = useMediaQueries();
  const hasReadMore = variant === 'success' && readMoreComponent;
  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={cx('ds-text-black', {
        'ds-bg-success': variant === 'success',
        'ds-bg-warning': variant === 'warning',
        'ds-bg-alert': variant === 'error',
      })}
    >
      <div className="ds-mx-auto ds-flex ds-min-h-[42px] ds-items-center ds-px-5 ds-justify-start sm:ds-min-h-11 sm:ds-pl-7 sm:ds-pr-0 sm:ds-justify-center sm:ds-gap-x-[20%]">
        <div className="ds-flex ds-flex-col ds-flex-wrap ds-items-start ds-py-4 sm:ds-flex-row sm:ds-items-center sm:ds-gap-x-5 sm:ds-gap-y-2 sm:ds-py-5">
          <div className="ds-font-poppins ds-text-heading-4 sm:ds-text-heading-3">{title}</div>
          <div className="ds-mt-1 sm:ds-mt-0 ds-text-body-sm">{description}</div>
          {hasReadMore && !sm && (
            <span className="ds-font-poppins ds-mt-4 ds-text-nowrap ds-rounded-[30px] ds-bg-white ds-px-6 ds-py-[10px] ds-text-button-md hover:ds-underline focus-visible:ds-outline focus-visible:ds-outline-[3px] focus-visible:ds-outline-offset-[1.5px] focus-visible:ds-outline-white active:ds-bg-accent active:ds-text-white active:ds-no-underline">
              {readMoreComponent}
            </span>
          )}
        </div>
        <div className="ds-flex ds-items-center">
          {hasReadMore && sm && (
            <span className="ds-font-poppins ds-mx-7 ds-text-nowrap ds-rounded-[30px] ds-bg-white ds-px-6 ds-py-[10px] ds-text-button-md hover:ds-underline focus-visible:ds-outline focus-visible:ds-outline-[3px] focus-visible:ds-outline-offset-[1.5px] focus-visible:ds-outline-white active:ds-bg-accent active:ds-text-white active:ds-no-underline">
              {readMoreComponent}
            </span>
          )}
          {onCloseClick && (
            <button
              className={`ds-ml-3 ds-mr-0 ds-flex sm:ds-mr-5 ${hasReadMore ? 'sm:ds-ml-0' : 'sm:ds-ml-5'}`}
              type="button"
              aria-label="Close"
              onClick={onCloseClick}
            >
              <span className="material-symbols-outlined size-32 ds-select-none">cancel</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
