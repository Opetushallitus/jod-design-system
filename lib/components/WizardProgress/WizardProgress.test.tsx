import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
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
        testId="wiz"
      />,
    );
    expect(container.querySelector('[data-testid="wiz"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="wiz-step-3"]')).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <WizardProgress
        labelText="Progress"
        stepText="Step"
        steps={steps}
        currentStep={currentStep}
        completedText={completedText}
        currentText={currentText}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
