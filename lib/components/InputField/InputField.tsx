import React from 'react';
import { getTruthyValuesAsString, tidyClasses as tc } from '../../utils';
import { Field } from '../internal/Field/Field';

interface BaseInputFieldProps {
  /** The name of the input field */
  name?: string;
  /** The value of the input field */
  value?: string;
  /** The function to call when the input field loses focus */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** The function to call when the value of the input field changes */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** The function to call when a key is pressed in the input field */
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  /** The maximum number of characters that can be entered into the input field */
  maxLength?: number;
  /** The placeholder text to display in the input field */
  placeholder?: string;
  /** The help text to display below the input field */
  help?: string;
  /** Additional classes to add to the input field */
  className?: string;
  /** Showing required text in parentheses, showing after the label */
  requiredText?: string;
  /** Test id for querying in tests */
  testId?: string;
  /** The error message to display below the input field */
  errorMessage?: string;
}

interface HideLabelProps extends BaseInputFieldProps {
  /** The label text is not shown when hideLabel is true */
  label?: never;
  /** Hide label */
  hideLabel?: true;
  /** The placeholder text to display in the input field is required when hideLabel is true */
  placeholder: string;
}
interface ShowLabelProps extends BaseInputFieldProps {
  /** The label text to display above the input field */
  label: string;
  /** Hide label */
  hideLabel?: false;
  /** The placeholder text to display in the input field */
  placeholder?: string;
}

export type InputFieldProps = ShowLabelProps | HideLabelProps;

/** Input fields are text boxes that allow users to input custom text entries with a keyboard. Various options can be shown with the field to communicate the input requirements. */
export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
  {
    name,
    value,
    onBlur,
    onChange,
    onKeyDown,
    maxLength,
    placeholder,
    label,
    hideLabel = false,
    help,
    className = '',
    requiredText,
    testId,
    errorMessage,
  }: InputFieldProps,
  ref,
) {
  const inputId = React.useId();
  const helpId = React.useId();
  const errorId = React.useId();

  return (
    <div className="ds:w-full">
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
        <input
          aria-required={!!requiredText}
          required={!!requiredText}
          ref={ref}
          id={inputId}
          name={name}
          type="text"
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          onKeyDown={onKeyDown}
          maxLength={maxLength}
          placeholder={placeholder}
          autoComplete="off"
          aria-describedby={getTruthyValuesAsString(help ? helpId : '', errorMessage ? errorId : '')}
          aria-invalid={!!errorMessage}
          data-testid={testId}
          className={tc([
            'ds:block ds:w-full ds:rounded ds:border ds:border-border-form ds:bg-white ds:p-5 ds:text-primary-gray ds:focus:outline-2 ds:focus:outline-accent ds:placeholder:text-secondary-gray ds:font-arial ds:text-body-md',
            className,
          ])}
        />
      </Field>
    </div>
  );
});
