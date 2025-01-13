import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SelectionCard } from './SelectionCard';

describe('SelectionCard', () => {
  const label = 'Card Label';

  it('renders correctly with label and icon', () => {
    const icon = <svg data-testid="test-icon" />;
    const { getByText, getByTestId } = render(<SelectionCard label={label} icon={icon} />);

    expect(getByText(label)).toBeInTheDocument();
    expect(getByTestId('test-icon')).toBeInTheDocument();
  });

  it('renders correctly with selected state', () => {
    const { getByLabelText } = render(<SelectionCard label={label} selected />);

    expect(getByLabelText(label)).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onClick callback when clicked', () => {
    const onClick = vi.fn();
    const { getByLabelText } = render(<SelectionCard label={label} onClick={onClick} />);

    fireEvent.click(getByLabelText(label));
    expect(onClick).toHaveBeenCalled();
  });
});
