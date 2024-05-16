import { FocusEvent, ChangeEvent, forwardRef, useId } from 'react';

export interface InputFieldProps {
  /** The name of the input field */
  name?: string;
  /** The value of the input field */
  value?: string;
  /** The function to call when the input field loses focus */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /** The function to call when the value of the input field changes */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /** The placeholder text to display in the input field */
  placeholder?: string;
  /** The label text to display above the input field */
  label: string;
  /** The help text to display below the input field */
  help?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
  { name, value, onBlur, onChange, placeholder, label, help }: InputFieldProps,
  ref,
) {
  const inputId = useId();
  const helpId = useId();
  return (
    <>
      <label htmlFor={inputId} className="mb-4 inline-block align-top text-form-label text-primary-gray">
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
        className="block w-full rounded-[10px] border-[5px] border-border-gray bg-white p-[11px] text-primary-gray outline-none placeholder:text-secondary-gray"
      />
      {help && (
        <div id={helpId} className="mt-2 block text-help text-secondary-3">
          {help}
        </div>
      )}
    </>
  );
});
