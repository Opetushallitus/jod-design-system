export interface WizardProgressProps {
  /** The total number of steps in the wizard. */
  steps: number;
  /** The current step in the wizard. */
  currentStep: number;
  /** A callback that is called when the user clicks on a step. */
  onChange?: (step: number) => void;
  /** The text to display when a step is completed. */
  completedText?: string;
  /** The text to display when a step is the current step. */
  currentText?: string;
}

/** A component that displays the progress of a wizard. */
export const WizardProgress = ({ steps, currentStep, onChange, completedText, currentText }: WizardProgressProps) => {
  return (
    <ol className="flex gap-4 text-body-md font-bold text-primary-gray sm:text-body-lg sm:font-bold">
      {Array.from({ length: steps }, (_, index) => (
        <li key={index + 1}>
          <button
            type="button"
            onClick={() => onChange && onChange(index + 1)}
            className={`flex min-h-7 min-w-7 items-center justify-center rounded-full ${
              index + 1 === currentStep ? 'bg-accent text-white' : 'bg-bg-gray'
            } sm:min-h-8 sm:min-w-8`}
          >
            {index + 1 < currentStep ? (
              <>
                {completedText && <span className="sr-only">{`${completedText}: ${index + 1}`}</span>}
                <span className="material-symbols-outlined size-24 sm:size-32 select-none font-bold" aria-hidden>
                  check
                </span>
              </>
            ) : (
              <>
                {index + 1 === currentStep && currentText && <span className="sr-only">{`${currentText}: `}</span>}
                {index + 1}
              </>
            )}
          </button>
        </li>
      ))}
    </ol>
  );
};
