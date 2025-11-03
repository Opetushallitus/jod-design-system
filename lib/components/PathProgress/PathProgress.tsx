import React from 'react';
import { tidyClasses as tc } from '../../utils';

type StepLabel =
  | {
      labelComponent: React.ReactNode;
      label?: never;
    }
  | {
      labelComponent?: never;
      label: string;
    };

export type PathProgressStep = {
  /** text or icon inside the circle */
  circleComponent: React.ReactNode;
  content?: React.ReactNode;
  isCompleted?: boolean;
} & StepLabel;

const StepComponent = ({
  step,
  isLast,
  testId,
  index,
}: {
  step: PathProgressStep;
  isLast: boolean;
  testId?: string;
  index: number;
}) => {
  const baseClasses = tc(['ds:flex ds:flex-row ds:relative ds:h-full ds:w-full', isLast ? '' : 'ds:pb-9']);
  const lineClasses = tc(['ds:absolute ds:top-1 ds:transform ds:left-[18px] ds:w-2 ds:h-full']);
  const circleClasses = tc([
    'ds:min-w-8 ds:size-8 ds:rounded-full ds:appearance-none ds:z-10 ds:flex ds:items-center ds:justify-center ds:mb-6 ds:text-button-lg',
    step.isCompleted ? 'ds:bg-accent ds:text-white' : 'ds:bg-white ds:text-primary-gray',
  ]);

  return (
    <div className={baseClasses} data-testid={testId ? `${testId}-step-${index + 1}` : undefined}>
      {!isLast && <span className={lineClasses} />}
      <span className={circleClasses} data-testid={testId ? `${testId}-circle-${index + 1}` : undefined}>
        {step.circleComponent}
      </span>
      <div className="ds:flex ds:flex-col ds:ml-7 ds:mt-3 ds:gap-5 ds:w-full">
        {step.label && (
          <span className="ds:text-heading-2" data-testid={testId ? `${testId}-label-${index + 1}` : undefined}>
            {step.label}
          </span>
        )}
        {step.labelComponent && (
          <div data-testid={testId ? `${testId}-labelComponent-${index + 1}` : undefined}>{step.labelComponent}</div>
        )}
        {step.content && <div data-testid={testId ? `${testId}-content-${index + 1}` : undefined}>{step.content}</div>}
      </div>
    </div>
  );
};

export interface PathProgressProps {
  steps: PathProgressStep[];
  testId?: string;
}

export const PathProgress = ({ steps, testId }: PathProgressProps) => {
  return (
    <div className="ds:inline-flex ds:flex-col ds:h-full ds:place-content-between ds:relative" data-testid={testId}>
      {steps.map((step, index) => (
        <StepComponent
          key={index} // eslint-disable-line react/no-array-index-key
          step={step}
          isLast={index == steps.length - 1}
          testId={testId}
          index={index}
        />
      ))}
    </div>
  );
};
