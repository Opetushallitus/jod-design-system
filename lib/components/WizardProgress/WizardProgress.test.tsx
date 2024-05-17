import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WizardProgress } from './WizardProgress';

describe('WizardProgress', () => {
  const steps = 5;
  const currentStep = 3;
  const onChange = vi.fn();
  const completedText = 'Completed';
  const currentText = 'Current';

  it('renders correctly', () => {
    const { container } = render(
      <WizardProgress
        steps={steps}
        currentStep={currentStep}
        onChange={onChange}
        completedText={completedText}
        currentText={currentText}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the correct number of steps', () => {
    render(
      <WizardProgress
        steps={steps}
        currentStep={currentStep}
        onChange={onChange}
        completedText={completedText}
        currentText={currentText}
      />,
    );

    const stepButtons = screen.getAllByRole('button');
    expect(stepButtons).toHaveLength(steps);
  });

  it('renders the correct step as current', () => {
    render(
      <WizardProgress
        steps={steps}
        currentStep={currentStep}
        onChange={onChange}
        completedText={completedText}
        currentText={currentText}
      />,
    );

    const currentStepButton = screen.getByRole('button', { name: `${currentText}: ${currentStep}` });
    expect(currentStepButton).toHaveClass('bg-accent text-white');
  });

  it('renders completed steps with check icon', () => {
    render(
      <WizardProgress
        steps={steps}
        currentStep={currentStep}
        onChange={onChange}
        completedText={completedText}
        currentText={currentText}
      />,
    );

    const completedStepButtons = screen.getAllByRole('button', { name: new RegExp(`${completedText}: \\d+`, 'i') });
    completedStepButtons.forEach((button) => {
      expect(button).toContainHTML('check');
    });
  });

  it('calls onChange when a step is clicked', () => {
    render(
      <WizardProgress
        steps={steps}
        currentStep={currentStep}
        onChange={onChange}
        completedText={completedText}
        currentText={currentText}
      />,
    );

    const stepButton = screen.getByRole('button', { name: `${currentText}: ${currentStep}` });
    fireEvent.click(stepButton);
    expect(onChange).toHaveBeenCalledWith(currentStep);
  });
});
