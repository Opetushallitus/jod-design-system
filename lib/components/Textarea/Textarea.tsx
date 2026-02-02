import React from 'react';
import { getTruthyValuesAsString, tidyClasses as tc } from '../../utils';
import { Field } from '../internal/Field/Field';

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
  /** Test id for querying in tests */
  testId?: string;
  /** Showing required text in parentheses, showing after the label */
  requiredText?: string;
  /** The error message to display below the input field */
  errorMessage?: string;
  /** Aria-label for the textarea */
  ariaLabel?: string;
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
    testId,
    requiredText,
    errorMessage,
    ariaLabel,
  }: TextareaProps,
  ref,
) {
  const inputId = React.useId();
  const helpId = React.useId();
  const errorId = React.useId();

  return (
    <Field
      label={label}
      hideLabel={hideLabel}
      htmlFor={inputId}
      requiredText={requiredText}
      helpId={helpId}
      help={help}
      testId={testId}
      errorId={errorId}
      errorMessage={errorMessage}
    >
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
        aria-describedby={getTruthyValuesAsString(help ? helpId : '', errorMessage ? errorId : '')}
        aria-invalid={!!errorMessage}
        data-testid={testId}
        aria-label={ariaLabel}
        className={tc([
          'ds:block ds:w-full ds:sm:max-w-input-long ds:rounded ds:border-2 ds:border-border-form ds:bg-white ds:px-5 ds:py-3 ds:text-primary-gray ds:focus:outline-2 ds:focus:outline-accent ds:placeholder:text-secondary-gray ds:font-arial ds:text-body-md ds:min-h-[88px]',
          className,
        ])}
      />
    </Field>
  );
});
