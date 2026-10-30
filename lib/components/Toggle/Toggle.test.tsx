// oxlint-disable vitest/require-mock-type-parameters
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';

import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('renders as a button', () => {
    const { container } = render(
      <Toggle checked={false} onChange={vi.fn()} ariaLabel="Toggle something" serviceVariant="yksilo" />,
    );
    const button = screen.getByRole('switch', { name: /toggle something/i });
    expect(button).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('shows correct aria-checked state', () => {
    const { rerender } = render(
      <Toggle checked={false} onChange={vi.fn()} ariaLabel="Toggle" serviceVariant="yksilo" />,
    );
    const button = screen.getByRole('switch');
    expect(button).toHaveAttribute('aria-checked', 'false');

    rerender(<Toggle checked={true} onChange={vi.fn()} ariaLabel="Toggle" serviceVariant="yksilo" />);
    expect(button).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onChange with toggled value when clicked', () => {
    const handleChange = vi.fn();
    render(<Toggle checked={false} onChange={handleChange} ariaLabel="Toggle" serviceVariant="yksilo" />);
    const button = screen.getByRole('switch');
    fireEvent.click(button);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('does not call onChange when disabled', () => {
    const handleChange = vi.fn();
    render(<Toggle checked={false} onChange={handleChange} disabled ariaLabel="Toggle" serviceVariant="yksilo" />);
    const button = screen.getByRole('switch');
    fireEvent.click(button);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('is disabled when the disabled prop is true', () => {
    render(<Toggle checked={false} onChange={vi.fn()} disabled ariaLabel="Toggle" serviceVariant="yksilo" />);
    const button = screen.getByRole('switch');
    expect(button).toBeDisabled();
  });

  it('has the correct aria-label', () => {
    render(<Toggle checked={false} onChange={vi.fn()} ariaLabel="Custom label" serviceVariant="yksilo" />);
    const button = screen.getByRole('switch');
    expect(button).toHaveAttribute('aria-label', 'Custom label');
  });

  it('does not submit a surrounding form by default', () => {
    const handleSubmit = vi.fn((e: { preventDefault: () => void }) => e.preventDefault());
    render(
      <form onSubmit={handleSubmit}>
        <Toggle checked={false} onChange={vi.fn()} ariaLabel="Toggle" serviceVariant="yksilo" />
      </form>,
    );
    const button = screen.getByRole('switch');
    expect(button).toHaveAttribute('type', 'button');
    fireEvent.click(button);
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('uses system colours for the track border and knob in forced-colors mode', () => {
    const { rerender } = render(
      <Toggle checked={false} onChange={vi.fn()} ariaLabel="Toggle" serviceVariant="yksilo" />,
    );
    const button = screen.getByRole('switch');
    const knob = button.firstElementChild;
    expect(button).toHaveClass('ds:border-2', 'ds:forced-colors:border-[ButtonText]');
    expect(knob).toHaveClass('ds:forced-colors:bg-[ButtonText]');

    rerender(<Toggle checked onChange={vi.fn()} ariaLabel="Toggle" serviceVariant="yksilo" />);
    expect(button).toHaveClass('ds:forced-colors:border-[Highlight]', 'ds:forced-colors:bg-[Highlight]');
    expect(knob).toHaveClass('ds:forced-colors:bg-[HighlightText]');

    rerender(<Toggle checked={false} onChange={vi.fn()} disabled ariaLabel="Toggle" serviceVariant="yksilo" />);
    expect(button).toHaveClass('ds:forced-colors:border-[GrayText]');
    expect(knob).toHaveClass('ds:forced-colors:bg-[GrayText]');
  });

  it('emits data-testid when testId is provided', () => {
    render(<Toggle checked={false} onChange={vi.fn()} ariaLabel="Toggle id" serviceVariant="yksilo" testId="tgl" />);
    expect(screen.getByTestId('tgl')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <Toggle checked={false} onChange={vi.fn()} ariaLabel="Toggle" serviceVariant="yksilo" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
