import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Slider } from './Slider';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Slider', () => {
  it('should call onValueChange when value changes', async () => {
    const onValueChangeMock = vi.fn();
    const user = userEvent.setup();

    act(() => {
      render(<Slider label="Target" onValueChange={onValueChangeMock} value={0} rightLabel="moi" />);
    });

    const [sliderThumb] = screen.getAllByRole('slider', { hidden: true });

    await waitFor(() => sliderThumb.focus());
    expect(sliderThumb).toHaveFocus();
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveTextContent('100 - 0 %');

    const press = async (key: 'left' | 'right') => await user.keyboard(key === 'left' ? '[ArrowLeft]' : '[ArrowRight]');
    const ariaValue = 'aria-valuenow';

    expect(sliderThumb).toHaveAttribute(ariaValue, '0');

    await press('right');
    expect(onValueChangeMock).toHaveBeenCalledWith(25);
    await press('right'); // For some reason, the "aria-valuenow" attribute is not updated without extra right press
    expect(onValueChangeMock).toHaveBeenCalledWith(25);
    expect(sliderThumb).toHaveAttribute(ariaValue, '25');

    await press('right');
    expect(sliderThumb).toHaveAttribute(ariaValue, '50');
    expect(onValueChangeMock).toHaveBeenCalledWith(50);

    await press('right');
    expect(sliderThumb).toHaveAttribute(ariaValue, '75');
    expect(onValueChangeMock).toHaveBeenCalledWith(75);

    await press('right');
    expect(onValueChangeMock).toHaveBeenCalledWith(100);
    expect(sliderThumb).toHaveAttribute(ariaValue, '100');

    await press('left');
    expect(sliderThumb).toHaveAttribute(ariaValue, '75');
    expect(onValueChangeMock).toHaveBeenCalledWith(75);

    await press('left');
    expect(sliderThumb).toHaveAttribute(ariaValue, '50');
    expect(onValueChangeMock).toHaveBeenCalledWith(50);

    await press('left');
    expect(sliderThumb).toHaveAttribute(ariaValue, '25');
    expect(onValueChangeMock).toHaveBeenCalledWith(25);

    await press('left');
    expect(sliderThumb).toHaveAttribute(ariaValue, '0');

    expect(onValueChangeMock).toHaveBeenCalledTimes(9);
  });

  it('should show both values in tooltip when rightLabel is used', async () => {
    const rightLabel = 'Kiinnostukset';

    render(<Slider label="Osaamiset" value={25} onValueChange={vi.fn()} rightLabel={rightLabel} />);

    const [sliderThumb] = screen.getAllByRole('slider', { hidden: true });
    await waitFor(() => sliderThumb.focus());

    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveTextContent('75 - 25 %');
  });

  it('should render the label and rightLabel correctly', () => {
    render(<Slider label="Osaamiset" rightLabel="Kiinnostukset" onValueChange={() => vi.fn()} value={50} />);

    expect(screen.getByText('Osaamiset')).toBeInTheDocument();
    expect(screen.getByText('Kiinnostukset')).toBeInTheDocument();
  });
});
