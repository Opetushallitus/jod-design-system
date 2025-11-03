import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InputError } from './InputError';

describe('InputError', () => {
  const errorMessage = 'This is an error message';
  const id = 'error-message';
  const testId = 'input-error';

  it('renders error message correctly', () => {
    const { container } = render(<InputError errorMessage={errorMessage} id={id} testId={testId} />);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveAttribute('id', id);
    expect(container).toMatchSnapshot();
  });
  it('does not render when errorMessage is undefined', () => {
    const { container } = render(<InputError id={id} />);
    expect(container).toBeEmptyDOMElement();
    expect(container).toMatchSnapshot();
  });
});
