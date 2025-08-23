import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PathProgress, type PathProgressStep } from './PathProgress';

describe('PathProgress data-testid', () => {
  it('renders root and step-related data-testids', () => {
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

    render(<PathProgress steps={steps} dataTestId="path" />);

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
});
