import { cx } from '../../cva';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { JodClose } from '../../icons';

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
      className={cx('ds:text-primary-gray', {
        'ds:bg-success': variant === 'success',
        'ds:bg-warning': variant === 'warning',
        'ds:bg-alert': variant === 'error',
      })}
    >
      <div className="ds:mx-auto ds:flex ds:min-h-[42px] ds:items-center ds:px-5 ds:justify-start ds:sm:min-h-11 ds:sm:pl-7 ds:sm:pr-0 ds:sm:justify-center ds:sm:gap-x-[20%]">
        <div className="ds:flex ds:flex-col ds:flex-wrap ds:items-start ds:py-4 ds:sm:flex-row ds:sm:items-center ds:sm:gap-x-5 ds:sm:gap-y-2 ds:sm:py-5">
          <div className="ds:text-heading-4 ds:sm:text-heading-3">{title}</div>
          <div className="ds:mt-1 ds:sm:mt-0 ds:text-body-sm ds:font-arial">{description}</div>
          {hasReadMore && !sm && (
            <span className="ds:mt-4 ds:text-nowrap ds:rounded-[30px] ds:bg-white ds:px-6 ds:py-[10px] ds:text-button-md ds:hover:underline ds:focus-visible:outline ds:focus-visible:outline-[3px] ds:focus-visible:outline-offset-[1.5px] ds:focus-visible:outline-white ds:active:bg-accent ds:active:text-white ds:active:no-underline">
              {readMoreComponent}
            </span>
          )}
        </div>
        <div className="ds:flex ds:items-center">
          {hasReadMore && sm && (
            <span className="ds:mx-7 ds:text-nowrap ds:rounded-[30px] ds:bg-white ds:px-6 ds:py-[10px] ds:text-button-md ds:hover:underline ds:focus-visible:outline ds:focus-visible:outline-[3px] ds:focus-visible:outline-offset-[1.5px] ds:focus-visible:outline-white ds:active:bg-accent ds:active:text-white ds:active:no-underline">
              {readMoreComponent}
            </span>
          )}
          {onCloseClick && (
            <button
              className={`ds:cursor-pointer ds:ml-3 ds:mr-0 ds:flex ds:sm:mr-5 ${hasReadMore ? 'ds:sm:ml-0' : 'ds:sm:ml-5'}`}
              type="button"
              aria-label="Close"
              onClick={onCloseClick}
            >
              <JodClose size={32} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
