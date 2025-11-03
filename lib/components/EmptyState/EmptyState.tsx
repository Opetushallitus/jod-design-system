import { JodInfo } from '../../icons';
import { tidyClasses } from '../../utils';

export interface EmptyStateProps {
  text: string;
  testId?: string;
}

export const EmptyState = ({ text, testId }: EmptyStateProps) => {
  return (
    <div
      className={tidyClasses([
        'ds:bg-bg-gray-2',
        'ds:text-secondary-gray',
        'ds:text-body-sm',
        'ds:font-arial',
        'ds:inline-flex',
        'ds:items-center',
        'ds:rounded-md',
        'ds:pl-4',
        'ds:pr-5',
        'ds:py-3',
        'ds:gap-3',
      ])}
      data-testid={testId}
    >
      <span className="ds:shrink-0">
        <JodInfo className="ds:text-secondary-gray" />
      </span>
      <span>{text}</span>
    </div>
  );
};
