import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { WizardProgress } from './WizardProgress';

describe('WizardProgress', () => {
  const steps = 5;
  const currentStep = 3;
  const completedText = 'Completed';
  const currentText = 'Current';

  it('renders correctly', () => {
    const { container } = render(
      <WizardProgress
        steps={steps}
        currentStep={currentStep}
        completedText={completedText}
        currentText={currentText}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
