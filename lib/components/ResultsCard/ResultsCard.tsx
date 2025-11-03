import type {} from '../../utils';

export interface ResultsCardProps {
  /** Value shown on the card */
  value: string | number;
  /** Label shown on the card */
  label: string;
  testId?: string;
}

/**
 * This is a card component for displaying a value with a label.
 */
export const ResultsCard = ({ value, label, testId }: ResultsCardProps) => {
  return (
    <div
      className="ds:flex ds:w-min ds:flex-col-reverse ds:items-center ds:rounded-[10px] ds:bg-bg-gray ds:px-8 ds:py-5 ds:font-bold"
      data-testid={testId}
    >
      <span className="ds:text-heading-4 ds:text-primary-gray" data-testid={testId ? `${testId}-label` : undefined}>
        {label}
      </span>
      <span
        className="ds:text-[80px] ds:leading-[110%] ds:text-primary-gray"
        data-testid={testId ? `${testId}-value` : undefined}
      >
        {value}
      </span>
    </div>
  );
};
