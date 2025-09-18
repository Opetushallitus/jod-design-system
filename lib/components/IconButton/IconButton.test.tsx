import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { IconButton, IconButtonProps } from './IconButton';

describe('IconButton', () => {
  const icon = <svg data-testid="icon-svg" />;
  const baseProps: IconButtonProps = {
    ariaLabel: 'Test button',
    icon,
    onClick: vi.fn(),
  };

  it('matches snapshot', () => {
    const { container } = render(<IconButton {...baseProps} />);
    expect(container.firstChild).toMatchSnapshot();
    expect(true).toBe(true);
  });

  it('renders as a button by default', () => {
    const { getByRole } = render(<IconButton {...baseProps} />);
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Test button');
  });

  it('renders icon inside the button', () => {
    const { getByTestId } = render(<IconButton {...baseProps} />);
    expect(getByTestId('icon-svg')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    const { getByRole } = render(<IconButton {...baseProps} onClick={onClick} />);
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn();
    const { getByRole } = render(<IconButton {...baseProps} onClick={onClick} disabled />);
    fireEvent.click(getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders as a span when indicative is true', () => {
    const { container, queryByRole } = render(
      <IconButton ariaLabel="Indicative" icon={icon} indicative={true} selected={false} />,
    );
    expect(queryByRole('button')).not.toBeInTheDocument();
    const span = container.querySelector('span');
    expect(span).toBeInTheDocument();
  });
});
