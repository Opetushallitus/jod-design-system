import React from 'react';
import { tidyClasses as tc } from '../../utils';

interface BaseTextareaProps {
  /** The name of the textarea */
  name?: string;
  /** The value of the textarea */
  value?: string;
  /** The function to call when the textarea loses focus */
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  /** The function to call when the value of the textarea changes */
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** The function to call when a key is pressed in the textarea */
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  /** The placeholder text to display in the textarea */
  placeholder?: string;
  /** The help text to display below the textarea */
  help?: string;
  /** The maximum number of characters that can be entered into the textarea */
  maxLength?: number;
  /** The number of rows to display in the textarea */
  rows?: number;
  /** Additional classes to add to the textarea */
  className?: string;
}

interface HideLabelProps extends BaseTextareaProps {
  /** The label text is not shown when hideLabel is true */
  label?: never;
  /** Hide label */
  hideLabel?: true;
  /** The placeholder text to display in the textarea is required when hideLabel is true */
  placeholder: string;
}
interface ShowLabelProps extends BaseTextareaProps {
  /** The label text to display above the textarea */
  label: string;
  /** Hide label */
  hideLabel?: false;
  /** The placeholder text to display in the textarea */
  placeholder?: string;
}

export type TextareaProps = ShowLabelProps | HideLabelProps;

/** Textareas are multi-line text boxes that allow users to input custom text entries with a keyboard. Various options can be shown with the field to communicate the input requirements. */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    name,
    value,
    onBlur,
    onChange,
    onKeyDown,
    placeholder,
    label,
    hideLabel = false,
    help,
    maxLength,
    rows,
    className = '',
  }: TextareaProps,
  ref,
) {
  const inputId = React.useId();
  const helpId = React.useId();
  return (
    <>
      <label
        htmlFor={inputId}
        className={tc([
          hideLabel ? 'ds-hidden' : '',
          'ds-mb-4 ds-inline-block ds-align-top ds-text-form-label ds-font-arial ds-text-black',
        ])}
      >
        {label}
      </label>
      <textarea
        ref={ref}
        id={inputId}
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={onKeyDown}
        maxLength={maxLength}
        rows={rows}
        placeholder={placeholder}
        autoComplete="off"
        aria-describedby={help ? helpId : undefined}
        className={tc([
          'ds-block ds-w-full ds-rounded ds-border ds-border-border-gray ds-bg-white ds-p-5 ds-text-black ds-outline-none placeholder:ds-text-secondary-gray ds-font-arial ds-text-body-md',
          className,
        ])}
      />
      {help && (
        <div id={helpId} className="ds-mt-2 ds-block ds-text-help ds-text-secondary-gray ds-font-arial">
          {help}
        </div>
      )}
    </>
  );
});
