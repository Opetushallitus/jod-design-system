import { useId } from 'react';

export interface InputFieldProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  label: string;
  help?: string;
}

export const InputField = ({ value, onChange, placeholder, label, help }: InputFieldProps) => {
  const inputId = useId();
  const helpId = useId();
  return (
    <>
      <label htmlFor={inputId} className="mb-4 inline-block align-top text-form-label text-primary-gray">
        {label}
      </label>
      <input
        id={inputId}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
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
};
