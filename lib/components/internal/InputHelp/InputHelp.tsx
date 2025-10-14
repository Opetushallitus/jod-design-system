interface InputFieldProps {
  /** The help text to display below the input field */
  helpText?: string;
  /** The id for the help text element */
  id: string;
  /** Test id for querying in tests */
  dataTestId?: string;
}

export const InputHelp = ({ helpText, id, dataTestId }: InputFieldProps) => {
  return helpText !== undefined ? (
    <div
      id={id}
      className="ds:mt-2 ds:block ds:text-help ds:text-secondary-gray ds:font-arial"
      data-testid={dataTestId}
    >
      {helpText}
    </div>
  ) : null;
};
