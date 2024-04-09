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
}: NoteProps) => (
  <div
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    className={`
          ${variant === 'success' ? 'bg-success text-white' : ''}
          ${variant === 'warning' ? 'bg-warning text-black' : ''}
          ${variant === 'error' ? 'bg-alert text-white' : ''}
          `}
  >
    <div className="mx-auto flex min-h-11 max-w-[1092px] items-center justify-between pl-7 pr-0">
      <div className="flex flex-wrap items-end gap-x-5 gap-y-2 py-5 ">
        <div className="text-heading-4">{title}</div>
        <div className="text-body-sm">{description}</div>
      </div>
      <div className="flex items-center">
        {variant === 'success' && readMoreText && readMoreHref && (
          <a
            className="mx-7 text-nowrap rounded-[30px] bg-white px-6 py-[10px] text-button-md text-success"
            href={readMoreHref}
            role="button"
          >
            {readMoreText}
          </a>
        )}
        {onCloseClick && (
          <button className="mr-5 flex" type="button" aria-label="Close" onClick={onCloseClick}>
            <span className="material-symbols-outlined size-24 select-none p-2">cancel</span>
          </button>
        )}
      </div>
    </div>
  </div>
);
