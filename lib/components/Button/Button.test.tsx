import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('renders the button with the correct label', () => {
    const label = 'Click me';
    const { container } = render(<Button label={label} onClick={vi.fn()} />);
    const button = screen.getByRole('button', { name: label });
    expect(button).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('calls the onClick function when clicked', async () => {
    const onClick = vi.fn();
    const { container } = render(<Button label="Click me" onClick={onClick} />);
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'Click me' });
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the button with the correct size', () => {
    const { container } = render(<Button label="Click me" onClick={vi.fn()} size="sm" />);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toHaveClass('ds:text-button-sm');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the button with the correct variant', () => {
    const { container } = render(
      <Button label="Click me" onClick={vi.fn()} variant="accent" serviceVariant="yksilo" />,
    );
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toHaveClass('ds:bg-secondary-1-dark');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the button as disabled', () => {
    const { container } = render(<Button label="Click me" onClick={vi.fn()} disabled />);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeDisabled();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('attaches ref to the button element', () => {
    const ref = vi.fn();
    render(<Button label="Click me" ref={ref} onClick={vi.fn()} />);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(ref).toHaveBeenCalledWith(button);
  });

  it('emits data-testid attribute on the root element when testId is provided', () => {
    render(<Button label="Click me" onClick={vi.fn()} testId="btn" />);
    expect(screen.getByTestId('btn')).toBeInTheDocument();
  });
});
