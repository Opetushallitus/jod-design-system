import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Spinner size={24} color="white" testId="spinner" />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(container).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Spinner size={24} color="white" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
