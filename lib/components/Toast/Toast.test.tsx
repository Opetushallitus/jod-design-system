import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Toast } from './Toast';

describe('Toast', () => {
  it('renders the toast component with text', () => {
    const { container } = render(<Toast text="This is a toast message" />);
    const toastElement = screen.getByRole('alert');
    expect(toastElement).toBeInTheDocument();
    expect(toastElement).toHaveTextContent('This is a toast message');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the toast component with icon', () => {
    const { container } = render(<Toast text="This is a toast message" icon="mood" />);
    const toastElement = screen.getByRole('alert');
    expect(toastElement).toBeInTheDocument();
    expect(toastElement).toHaveTextContent('This is a toast message');
    expect(container.firstChild).toMatchSnapshot();
  });
});
