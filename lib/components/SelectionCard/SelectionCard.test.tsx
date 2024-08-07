import { fireEvent, render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useMediaQueries } from '../../main';
import { SelectionCard } from './SelectionCard';

vi.mock('../../main', () => ({
  useMediaQueries: vi.fn(),
}));

describe('SelectionCard', () => {
  const label = 'Card Label';
  const mockedMediaQueries = vi.mocked(useMediaQueries).mockReturnValue({ sm: false, lg: false });

  beforeEach(() => {
    mockedMediaQueries.mockClear();
  });

  it('renders correctly with label and icon', () => {
    const icon = <svg data-testid="test-icon" />;
    const { getByText, getByTestId } = render(<SelectionCard label={label} infoAriaLabel={label} icon={icon} />);

    expect(getByText(label)).toBeInTheDocument();
    expect(getByTestId('test-icon')).toBeInTheDocument();
  });

  it('renders correctly with selected state', () => {
    const { getByLabelText } = render(<SelectionCard label={label} infoAriaLabel={label} selected />);

    expect(getByLabelText(label)).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onClick callback when clicked', () => {
    const onClick = vi.fn();
    const { getByLabelText } = render(<SelectionCard label={label} onClick={onClick} infoAriaLabel={label} />);

    fireEvent.click(getByLabelText(label));
    expect(onClick).toHaveBeenCalled();
  });

  it('calls setHovered callback when hovered', () => {
    const setHovered = vi.fn();
    mockedMediaQueries.mockReturnValue({ sm: true, lg: false });
    const { getByRole } = render(<SelectionCard label={label} setHovered={setHovered} infoAriaLabel={label} />);

    fireEvent.pointerEnter(getByRole('button'));
    expect(setHovered).toHaveBeenCalledWith(true);

    fireEvent.pointerLeave(getByRole('button'));
    expect(setHovered).toHaveBeenCalledWith(false);
  });

  it('calls setHovered callback when focused', () => {
    const setHovered = vi.fn();
    const { getByLabelText } = render(<SelectionCard label={label} setHovered={setHovered} infoAriaLabel={label} />);

    mockedMediaQueries.mockReturnValue({ sm: true, lg: false });
    fireEvent.focus(getByLabelText(label));
    expect(setHovered).toHaveBeenCalledWith(true);

    fireEvent.blur(getByLabelText(label));
    expect(setHovered).toHaveBeenCalledWith(false);
  });
});
