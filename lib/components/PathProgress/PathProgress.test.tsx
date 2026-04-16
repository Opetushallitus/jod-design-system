import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { PathProgress, type PathProgressStep } from './PathProgress';

describe('PathProgress data-testid', () => {
  const steps: PathProgressStep[] = [
    {
      circleComponent: <span>1</span>,
      label: 'Step one',
      content: <div>Content 1</div>,
      isCompleted: true,
    },
    {
      circleComponent: <span>2</span>,
      labelComponent: <span>Custom label</span>,
      content: <div>Content 2</div>,
    },
  ];
  it('renders root and step-related data-testids', () => {
    render(<PathProgress steps={steps} testId="path" />);

    expect(screen.getByTestId('path')).toBeInTheDocument();
    // Step 1
    expect(screen.getByTestId('path-step-1')).toBeInTheDocument();
    expect(screen.getByTestId('path-circle-1')).toBeInTheDocument();
    expect(screen.getByTestId('path-label-1')).toBeInTheDocument();
    expect(screen.getByTestId('path-content-1')).toBeInTheDocument();
    // Step 2 (labelComponent variant)
    expect(screen.getByTestId('path-step-2')).toBeInTheDocument();
    expect(screen.getByTestId('path-circle-2')).toBeInTheDocument();
    expect(screen.getByTestId('path-labelComponent-2')).toBeInTheDocument();
    expect(screen.getByTestId('path-content-2')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(<PathProgress steps={steps} testId="path" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
