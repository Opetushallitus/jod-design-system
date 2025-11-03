import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('renders as a button', () => {
    const { container } = render(
      <Toggle checked={false} onChange={vi.fn()} ariaLabel="Toggle something" serviceVariant="yksilo" />,
    );
    const button = screen.getByRole('button', { name: /toggle something/i });
    expect(button).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('shows correct aria-pressed state', () => {
    const { rerender } = render(
      <Toggle checked={false} onChange={vi.fn()} ariaLabel="Toggle" serviceVariant="yksilo" />,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'false');

    rerender(<Toggle checked={true} onChange={vi.fn()} ariaLabel="Toggle" serviceVariant="yksilo" />);
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onChange with toggled value when clicked', () => {
    const handleChange = vi.fn();
    render(<Toggle checked={false} onChange={handleChange} ariaLabel="Toggle" serviceVariant="yksilo" />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('does not call onChange when disabled', () => {
    const handleChange = vi.fn();
    render(<Toggle checked={false} onChange={handleChange} disabled ariaLabel="Toggle" serviceVariant="yksilo" />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('is disabled when the disabled prop is true', () => {
    render(<Toggle checked={false} onChange={vi.fn()} disabled ariaLabel="Toggle" serviceVariant="yksilo" />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('has the correct aria-label', () => {
    render(<Toggle checked={false} onChange={vi.fn()} ariaLabel="Custom label" serviceVariant="yksilo" />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Custom label');
  });

  it('emits data-testid when testId is provided', () => {
    render(<Toggle checked={false} onChange={vi.fn()} ariaLabel="Toggle id" serviceVariant="yksilo" testId="tgl" />);
    expect(screen.getByTestId('tgl')).toBeInTheDocument();
  });
});
