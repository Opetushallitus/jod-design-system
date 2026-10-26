import { tidyClasses as tc } from '../../../utils';
interface InputLabelProps {
  /** The id for the label element */
  id?: string;
  /** The id of the form element that this label is associated with */
  htmlFor: string;
  /** The text to display inside the label */
  labelText?: string;
  /** Hide label */
  hideLabel?: boolean;
  /** Test id for querying in tests */
  testId?: string;
}

export const InputLabel = ({ id, htmlFor, labelText, hideLabel = false, testId }: InputLabelProps) => {
  return (
    <label
      id={id}
      htmlFor={htmlFor}
      className={tc([
        hideLabel ? 'ds:hidden' : 'ds:inline-block',
        'ds:mb-3 ds:align-top ds:text-form-label ds:font-arial ds:text-primary-gray',
      ])}
      data-testid={testId}
    >
      {labelText}
    </label>
  );
};
