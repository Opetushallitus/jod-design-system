import React from 'react';
import { tidyClasses as tc } from '../../utils';

interface BaseInputFieldProps {
  /** The name of the input field */
  name?: string;
  /** The value of the input field */
  value?: string;
  /** The function to call when the input field loses focus */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** The function to call when the value of the input field changes */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** The placeholder text to display in the input field */
  placeholder?: string;
  /** The help text to display below the input field */
  help?: string;
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
  { name, value, onBlur, onChange, placeholder, label, hideLabel = false, help }: InputFieldProps,
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
      <input
        ref={ref}
        id={inputId}
        name={name}
        type="text"
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        aria-describedby={help ? helpId : undefined}
        className="ds-block ds-w-full ds-rounded ds-border ds-border-border-gray ds-bg-white ds-p-5 ds-text-black ds-outline-none placeholder:ds-text-secondary-gray ds-font-arial ds-text-body-md"
      />
      {help && (
        <div id={helpId} className="ds-mt-2 ds-block ds-text-help ds-text-secondary-gray ds-font-arial">
          {help}
        </div>
      )}
    </>
  );
});
