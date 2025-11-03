import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ResultsCard } from './ResultsCard';

describe('ResultsCard', () => {
  const text = 'Lorem ipsum';
  const label = 'Dolor sit amet';

  it('renders the text and the label', () => {
    const { container } = render(<ResultsCard value={text} label={label} testId="res" />);
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('emits data-testid attributes when testId is provided', () => {
    render(<ResultsCard value={text} label={label} testId="res" />);
    expect(screen.getByTestId('res')).toBeInTheDocument();
    expect(screen.getByTestId('res-label')).toBeInTheDocument();
    expect(screen.getByTestId('res-value')).toBeInTheDocument();
  });
});
