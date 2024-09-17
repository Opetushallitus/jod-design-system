import React from 'react';
import { GrTarget } from 'react-icons/gr';
import { MdCheck, MdOutlineFlag } from 'react-icons/md';
import { tidyClasses } from '../../utils';

export interface PathProgressProps {
  steps: number;
  currentStep: number;
  selectedStep?: number;
  onClick?: (step: number) => void;
}

export const PathProgress = ({ steps = 5, currentStep = 0, selectedStep, onClick }: PathProgressProps) => {
  const getStep = React.useCallback((step: number) => Math.min(Math.max(step, 0), steps + 1), [steps]);
  const [step, setStep] = React.useState(getStep(currentStep));

  React.useEffect(() => {
    setStep(getStep(currentStep));
  }, [currentStep, getStep]);

  const baseClasses = 'ds-size-8 ds-rounded-full ds-appearance-none ds-z-10 ds-flex ds-items-center ds-justify-center';
  const getActiveClasses = (idx: number) =>
    step === idx ? 'ds-bg-accent ds-text-white' : 'ds-bg-bg-gray-2 ds-text-black';

  const handleOnClick = (idx: number) => () => {
    setStep(idx);
    onClick?.(idx);
  };

  return (
    <div className="ds-inline-flex ds-flex-col ds-h-full ds-place-content-between ds-relative">
      <span className="ds-absolute ds-top-0 ds-left-[50%] ds-transform -ds-translate-x-[50%] ds-bg-white ds-w-2 ds-h-full" />
      <button
        type="button"
        className={tidyClasses(`
          ds-mb-6
          ${baseClasses}
          ${getActiveClasses(0)}
        `)}
        onClick={handleOnClick(0)}
      >
        <MdOutlineFlag size={24} />
      </button>
      {Array.from({ length: steps }).map((_, index) => (
        <button
          type="button"
          key={index}
          className={tidyClasses(`
            ds-text-button-lg
            ds-mb-6
            ${baseClasses}
            ${getActiveClasses(index + 1)}
            ${index < 2 ? 'ds-mt-auto' : ''}
            ${selectedStep === index + 1 ? 'ds-flex ds-items-center ds-justify-center' : ''}
          `)}
          onClick={handleOnClick(index + 1)}
        >
          {selectedStep === index + 1 ? <MdCheck size={24} /> : index + 1}
        </button>
      ))}
      <button
        type="button"
        className={tidyClasses(`
          ${baseClasses}
          ${getActiveClasses(steps + 1)}
          ds-mb-0
        `)}
        onClick={handleOnClick(steps + 1)}
      >
        <GrTarget size={24} />
      </button>
    </div>
  );
};
