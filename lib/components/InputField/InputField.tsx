import React from 'react';

export interface InputFieldProps {
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
  /** The label text to display above the input field */
  label: string;
  /** The help text to display below the input field */
  help?: string;
}

/** Input fields are text boxes that allow users to input custom text entries with a keyboard. Various options can be shown with the field to communicate the input requirements. */
export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
  { name, value, onBlur, onChange, placeholder, label, help }: InputFieldProps,
  ref,
) {
  const inputId = React.useId();
  const helpId = React.useId();
  return (
    <>
      <label htmlFor={inputId} className="ds-mb-4 ds-inline-block ds-align-top ds-text-form-label ds-text-black">
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
        placeholder={placeholder ? `(${placeholder})` : undefined}
        autoComplete="off"
        aria-describedby={help ? helpId : undefined}
        className="ds-block ds-w-full ds-rounded ds-border ds-border-border-gray ds-bg-white ds-p-[11px] ds-text-black ds-outline-none placeholder:ds-text-secondary-gray"
      />
      {help && (
        <div id={helpId} className="ds-mt-2 ds-block ds-text-help ds-text-secondary-gray">
          {help}
        </div>
      )}
    </>
  );
});
