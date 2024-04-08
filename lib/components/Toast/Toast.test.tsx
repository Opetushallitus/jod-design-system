import { afterEach, describe, expect, it } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import { Toast } from './Toast';

afterEach(() => {
  cleanup();
});

describe('Toast', () => {
  it('renders the toast component with text', () => {
    const { container } = render(<Toast text="This is a toast message" />);
    const toastElement = screen.getByRole('alert');
    expect(toastElement).toBeInTheDocument();
    expect(toastElement).toHaveTextContent('This is a toast message');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the toast component with icon', () => {
    const { container } = render(<Toast text="This is a toast message" icon="mood" iconAriaLabel="Mood" />);
    const toastElement = screen.getByRole('alert');
    const iconElement = screen.getByLabelText('Mood');
    expect(toastElement).toBeInTheDocument();
    expect(toastElement).toHaveTextContent('This is a toast message');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveTextContent('mood');
    expect(container.firstChild).toMatchSnapshot();
  });
});