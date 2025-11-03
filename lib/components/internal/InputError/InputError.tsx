interface InputErrorProps {
  /** The error message to display below the input field */
  errorMessage?: string;
  /** The id for the error message element */
  id: string;
  /** Test id for querying in tests */
  testId?: string;
}

export const InputError = ({ errorMessage, id, testId }: InputErrorProps) => {
  return errorMessage !== undefined ? (
    <div
      id={id}
      className="ds:mt-2 ds:block ds:text-form-error ds:text-alert-text-2 ds:font-arial"
      role="alert"
      data-testid={testId}
    >
      {errorMessage}
    </div>
  ) : null;
};
