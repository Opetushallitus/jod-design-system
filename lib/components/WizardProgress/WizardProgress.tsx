import { MdCheck } from 'react-icons/md';

export interface WizardProgressProps {
  /** The total number of steps in the wizard. */
  steps: number;
  /** The current step in the wizard. */
  currentStep: number;
  /** The text to display when a step is completed. */
  completedText?: string;
  /** The text to display when a step is the current step. */
  currentText?: string;
}

/** A component that displays the progress of a wizard. */
export const WizardProgress = ({ steps, currentStep, completedText, currentText }: WizardProgressProps) => {
  return (
    <ol className="ds-flex ds-gap-4 ds-text-black sm:ds-text-heading-2 sm:ds-leading-[24px] ds-text-heading-3-mobile ds-leading-[16px]">
      {Array.from({ length: steps }, (_, index) => (
        <li
          key={index + 1}
          className={`ds-flex ds-min-h-7 ds-min-w-7 ds-items-center ds-justify-center ds-rounded-full ${
            index + 1 === currentStep ? 'ds-bg-accent ds-text-white' : 'ds-bg-bg-gray-2'
          } sm:ds-min-h-8 sm:ds-min-w-8`}
        >
          {index + 1 < currentStep ? (
            <>
              {completedText && <span className="ds-sr-only">{`${completedText}: ${index + 1}`}</span>}
              <MdCheck size={24} />
            </>
          ) : (
            <>
              {index + 1 === currentStep && currentText && <span className="ds-sr-only">{`${currentText}: `}</span>}
              <span className="ds-select-none">{index + 1}</span>
            </>
          )}
        </li>
      ))}
    </ol>
  );
};
