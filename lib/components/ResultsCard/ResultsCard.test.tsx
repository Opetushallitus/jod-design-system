import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import { ResultsCard } from './ResultsCard';

describe('ResultsCard', () => {
  const text = 'Lorem ipsum';
  const label = 'Dolor sit amet';

  it('renders the text and the label', () => {
    const { container } = render(<ResultsCard value={text} label={label} />);
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
