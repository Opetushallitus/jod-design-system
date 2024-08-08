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
  /** Text for read more link if variant is success */
  readMoreText?: string;
  /** Link to read more if variant is success */
  readMoreHref?: string;
}

export const Note = ({
  title,
  description,
  variant = 'success',
  onCloseClick,
  readMoreText,
  readMoreHref,
}: NoteProps) => {
  const { sm } = useMediaQueries();
  const hasReadMore = variant === 'success' && readMoreText && readMoreHref;
  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={cx('text-black', {
        'bg-success': variant === 'success',
        'bg-warning': variant === 'warning',
        'bg-alert': variant === 'error',
      })}
    >
      <div className="mx-auto flex min-h-[42px] items-center px-5 justify-start sm:min-h-11 sm:pl-7 sm:pr-0 sm:justify-center sm:gap-x-[20%]">
        <div className="flex flex-col flex-wrap items-start py-4 sm:flex-row sm:items-center sm:gap-x-5 sm:gap-y-2 sm:py-5">
          <div className="font-poppins text-heading-4 sm:text-heading-3">{title}</div>
          <div className="mt-1 sm:mt-0 text-body-sm">{description}</div>
          {hasReadMore && !sm && (
            <a
              className="font-poppins mt-4 text-nowrap rounded-[30px] bg-white px-6 py-[10px] text-button-md hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[1.5px] focus-visible:outline-white active:bg-accent active:text-white active:no-underline"
              href={readMoreHref}
              role="button"
            >
              {readMoreText}
            </a>
          )}
        </div>
        <div className="flex items-center">
          {hasReadMore && sm && (
            <a
              className="font-poppins mx-7 text-nowrap rounded-[30px] bg-white px-6 py-[10px] text-button-md hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[1.5px] focus-visible:outline-white active:bg-accent active:text-white active:no-underline"
              href={readMoreHref}
              role="button"
            >
              {readMoreText}
            </a>
          )}
          {onCloseClick && (
            <button
              className={`ml-3 mr-0 flex sm:mr-5 ${hasReadMore ? 'sm:ml-0' : 'sm:ml-5'}`}
              type="button"
              aria-label="Close"
              onClick={onCloseClick}
            >
              <span className="material-symbols-outlined size-32 select-none">cancel</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
