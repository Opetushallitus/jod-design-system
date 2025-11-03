import { JodCheckmark } from '../../icons';
import { tidyClasses as tc } from '../../utils';

export interface WizardProgressProps {
  /** The total number of steps in the wizard. */
  steps: number;
  /** The current step in the wizard. */
  currentStep: number;
  /** The text for screenreader when a step is completed. */
  completedText: string;
  /** The text for screenreader when a step is the current step. */
  currentText: string;
  /** The text for describing meaning for screenreader for every step */
  stepText: string;
  /** The text for telling screenreader what the component is all about */
  labelText: string;
  testId?: string;
}

const Step = ({ step, stepText }: { step: number; stepText: string }) => {
  return (
    <>
      <span className="ds:sr-only">{`${stepText}: `}</span>
      <span className="ds:select-none">{step}</span>
    </>
  );
};

const CompletedStep = ({ text, step, stepText }: { text: string; step: number; stepText: string }) => {
  return (
    <>
      <span className="ds:sr-only">{`${stepText}: ${step}, ${text}.`}</span>
      <JodCheckmark role="presentation" size={24} className="ds:text-secondary-gray" />
    </>
  );
};

const CurrentStep = ({ text, step, stepText }: { text: string; step: number; stepText: string }) => {
  return (
    <>
      <Step step={step} stepText={stepText} />
      <span className="ds:sr-only">{`, ${text}.`}</span>
    </>
  );
};

/** A component that displays the progress of a wizard. */
export const WizardProgress = ({
  steps,
  currentStep,
  completedText,
  currentText,
  stepText,
  labelText,
  testId,
}: WizardProgressProps) => {
  const renderStep = (step: number) => {
    if (step < currentStep) {
      return <CompletedStep text={completedText} step={step} stepText={stepText} />;
    } else if (step === currentStep) {
      return <CurrentStep text={currentText} step={step} stepText={stepText} />;
    } else {
      return <Step step={step} stepText={stepText} />;
    }
  };

  return (
    <ol className="ds:flex ds:gap-3 ds:text-heading-4 ds:text-primary-gray" aria-label={labelText} data-testid={testId}>
      {Array.from({ length: steps }, (_, index) => (
        <li
          key={index + 1}
          className={tc([
            'ds:flex',
            'ds:min-h-7',
            'ds:min-w-7',
            'ds:items-center',
            'ds:justify-center',
            'ds:rounded-full',
            'ds:sm:min-h-8',
            'ds:sm:min-w-8',
            'ds:text-secondary-gray',
            'ds:cursor-default',
            index + 1 === currentStep ? 'ds:bg-secondary-gray ds:text-white' : 'ds:bg-bg-gray-2',
          ])}
          aria-current={index + 1 === currentStep}
          data-testid={testId ? `${testId}-step-${index + 1}` : undefined}
        >
          {renderStep(index + 1)}
        </li>
      ))}
    </ol>
  );
};
