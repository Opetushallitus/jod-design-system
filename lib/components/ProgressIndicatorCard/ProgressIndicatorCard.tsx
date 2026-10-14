interface TestIdPropsLocal {
  /** Text for screen readers describing what is loading, e.g. "Loading results" */
  label?: string;
  testId?: string;
}
import { Spinner } from '../Spinner/Spinner';

export const ProgressIndicatorCard = ({ label, testId }: TestIdPropsLocal) => {
  return (
    <div
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- <output> is not reliably exposed as a live region
      role="status"
      className="ds:shadow-border ds:rounded ds:bg-bg-gray-2-25 ds:min-h-[285px] ds:flex ds:items-center ds:justify-center"
      data-testid={testId}
    >
      {label && <span className="ds:sr-only">{label}</span>}
      <Spinner size={64} color="accent" className="ds:absolute" />
    </div>
  );
};
