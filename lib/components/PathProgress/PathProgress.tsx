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
  completedText,
}: {
  step: PathProgressStep;
  isLast: boolean;
  testId?: string;
  index: number;
  completedText?: string;
}) => {
  const baseClasses = tc(['ds:flex ds:flex-row ds:relative ds:h-full ds:w-full', isLast ? '' : 'ds:pb-9']);
  const lineClasses = tc(['ds:absolute ds:top-1 ds:transform ds:left-[18px] ds:w-2 ds:h-full']);
  const circleClasses = tc([
    'ds:min-w-8 ds:size-8 ds:rounded-full ds:appearance-none ds:z-10 ds:flex ds:items-center ds:justify-center ds:mb-6 ds:text-button-lg',
    step.isCompleted ? 'ds:bg-accent ds:text-white' : 'ds:bg-white ds:text-primary-gray',
  ]);

  return (
    <li className={baseClasses} data-testid={testId ? `${testId}-step-${index + 1}` : undefined}>
      {!isLast && <span className={lineClasses} />}
      <span className={circleClasses} data-testid={testId ? `${testId}-circle-${index + 1}` : undefined}>
        {step.circleComponent}
      </span>
      {/* The completed state is shown only with colors, so it is given as text to screen readers */}
      {step.isCompleted && completedText && <span className="ds:sr-only">{completedText}</span>}
      <div className="ds:flex ds:flex-col ds:ml-7 ds:mt-3 ds:gap-5 ds:w-full">
        {step.label && (
          <span
            className="ds:text-primary-gray ds:text-heading-2"
            data-testid={testId ? `${testId}-label-${index + 1}` : undefined}
          >
            {step.label}
          </span>
        )}
        {step.labelComponent && (
          <div data-testid={testId ? `${testId}-labelComponent-${index + 1}` : undefined}>{step.labelComponent}</div>
        )}
        {step.content && <div data-testid={testId ? `${testId}-content-${index + 1}` : undefined}>{step.content}</div>}
      </div>
    </li>
  );
};

export interface PathProgressProps {
  steps: PathProgressStep[];
  /**
   * Text read by screen readers for the completed steps, e.g. "Completed". The completed state is otherwise shown only
   * with colors, so it should be given in the language of the page.
   */
  completedText?: string;
  testId?: string;
}

export const PathProgress = ({ steps, completedText, testId }: PathProgressProps) => {
  return (
    <ol className="ds:inline-flex ds:flex-col ds:h-full ds:place-content-between ds:relative" data-testid={testId}>
      {steps.map((step, index) => (
        <StepComponent
          key={index}
          step={step}
          isLast={index == steps.length - 1}
          testId={testId}
          index={index}
          completedText={completedText}
        />
      ))}
    </ol>
  );
};
