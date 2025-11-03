interface InputFieldProps {
  /** The help text to display below the input field */
  helpText?: string;
  /** The id for the help text element */
  id: string;
  /** Test id for querying in tests */
  testId?: string;
}

export const InputHelp = ({ helpText, id, testId }: InputFieldProps) => {
  return helpText !== undefined ? (
    <div id={id} className="ds:mt-2 ds:block ds:text-help ds:text-secondary-gray ds:font-arial" data-testid={testId}>
      {helpText}
    </div>
  ) : null;
};
