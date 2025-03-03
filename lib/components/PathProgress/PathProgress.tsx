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

const StepComponent = ({ step, isLast }: { step: PathProgressStep; isLast: boolean }) => {
  const baseClasses = tc(['ds:flex ds:flex-row ds:relative ds:h-full ds:w-full', isLast ? '' : 'ds:pb-9']);
  const lineClasses = tc([
    'ds:absolute ds:top-1 ds:transform ds:left-[18px] ds:w-2 ds:h-full',
    step.isCompleted ? 'ds:bg-accent' : 'ds:bg-white',
  ]);
  const circleClasses = tc([
    'ds:min-w-8 ds:size-8 ds:rounded-full ds:appearance-none ds:z-10 ds:flex ds:items-center ds:justify-center ds:mb-6 ds:text-button-lg',
    step.isCompleted ? 'ds:bg-accent ds:text-white' : 'ds:bg-white ds:text-black',
  ]);

  return (
    <div className={baseClasses}>
      {!isLast && <span className={lineClasses} />}
      <span className={circleClasses}>{step.circleComponent}</span>
      <div className="ds:flex ds:flex-col ds:ml-7 ds:mt-3 ds:gap-5 ds:w-full">
        {step.label && <span className="ds:text-heading-2">{step.label}</span>}
        {step.labelComponent && <div>{step.labelComponent}</div>}
        {step.content && <div>{step.content}</div>}
      </div>
    </div>
  );
};

export interface PathProgressProps {
  steps: PathProgressStep[];
}

export const PathProgress = ({ steps }: PathProgressProps) => {
  return (
    <div className="ds:inline-flex ds:flex-col ds:h-full ds:place-content-between ds:relative">
      {steps.map((step, index) => (
        <StepComponent
          key={index} // eslint-disable-line react/no-array-index-key
          step={step}
          isLast={index == steps.length - 1}
        />
      ))}
    </div>
  );
};
