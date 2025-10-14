import React from 'react';
import { InputError } from '../InputError/InputError';
import { InputHelp } from '../InputHelp/InputHelp';
import { InputLabel } from '../InputLabel/InputLabel';

interface FieldProps {
  /** The label text to display above the input field */
  label: string | undefined;
  /** Hide label. Still available for screenreaders */
  hideLabel?: boolean;
  /** The id of the input element that this label is for */
  htmlFor: string;
  /** Text to indicate that the field is required. For example, "required" or "optional" */
  requiredText?: string;
  /** The id of the help text element */
  helpId: string;
  /** The help text to display below the input field */
  help?: string;
  /** Test id for querying in tests */
  dataTestId?: string;
  /** The id of the error message element */
  errorId: string;
  /** The error message to display below the input field */
  errorMessage?: string;
  children?: React.ReactNode;
}

export const Field = ({
  label,
  hideLabel = false,
  htmlFor,
  requiredText,
  helpId,
  help,
  dataTestId,
  errorId,
  errorMessage,
  children,
}: FieldProps) => {
  const labelText = requiredText ? `${label} (${requiredText})` : label;

  return (
    <>
      <InputLabel htmlFor={htmlFor} labelText={labelText} hideLabel={hideLabel} />
      {children}
      <InputHelp id={helpId} helpText={help} dataTestId={dataTestId ? `${dataTestId}-help` : undefined} />
      <InputError
        id={errorId}
        errorMessage={errorMessage}
        dataTestId={dataTestId ? `${dataTestId}-error` : undefined}
      />
    </>
  );
};
