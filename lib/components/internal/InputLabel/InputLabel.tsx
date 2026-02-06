import { tidyClasses as tc } from '../../../utils';

interface InputLabelProps {
  /** The id of the form element that this label is associated with */
  htmlFor: string;
  /** The text to display inside the label */
  labelText?: string;
  /** Hide label */
  hideLabel?: boolean;
}

export const InputLabel = ({ htmlFor, labelText, hideLabel = false }: InputLabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={tc([
        hideLabel ? 'ds:hidden' : 'ds:inline-block',
        'ds:mb-3 ds:align-top ds:text-form-label ds:font-arial ds:text-primary-gray',
      ])}
    >
      {labelText}
    </label>
  );
};
