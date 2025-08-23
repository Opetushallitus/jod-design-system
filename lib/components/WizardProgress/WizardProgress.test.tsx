import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WizardProgress } from './WizardProgress';

describe('WizardProgress', () => {
  const steps = 5;
  const currentStep = 3;
  const completedText = 'Completed';
  const currentText = 'Current';

  it('renders correctly', () => {
    const { container } = render(
      <WizardProgress
        labelText="Progress"
        stepText="Step"
        steps={steps}
        currentStep={currentStep}
        completedText={completedText}
        currentText={currentText}
        dataTestId="wiz"
      />,
    );
    expect(container.querySelector('[data-testid="wiz"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="wiz-step-3"]')).toBeInTheDocument();
    // avoid snapshot churn due to attributes
  });
});
