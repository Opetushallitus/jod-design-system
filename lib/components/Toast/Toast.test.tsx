import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Toast } from './Toast';

describe('Toast', () => {
  it('renders the toast component with text', () => {
    const { container } = render(<Toast text="This is a toast message" testId="toast" />);
    const toastElement = screen.getByRole('alert');
    expect(toastElement).toBeInTheDocument();
    expect(toastElement).toHaveTextContent('This is a toast message');
    expect(screen.getByTestId('toast')).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the toast component with icon', () => {
    const { container } = render(<Toast text="This is a toast message" icon="mood" testId="toast2" />);
    const toastElement = screen.getByRole('alert');
    expect(toastElement).toBeInTheDocument();
    expect(toastElement).toHaveTextContent('This is a toast message');
    expect(screen.getByTestId('toast2')).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
