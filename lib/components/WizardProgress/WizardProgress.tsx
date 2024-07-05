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
    <ol className="flex gap-4 text-[24px] text-black font-semibold sm:font-poppins leading-[24px]">
      {Array.from({ length: steps }, (_, index) => (
        <li
          key={index + 1}
          className={`flex min-h-7 min-w-7 items-center justify-center rounded-full ${
            index + 1 === currentStep ? 'bg-accent text-white' : 'bg-bg-gray-2'
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
              <span className="select-none">{index + 1}</span>
            </>
          )}
        </li>
      ))}
    </ol>
  );
};
