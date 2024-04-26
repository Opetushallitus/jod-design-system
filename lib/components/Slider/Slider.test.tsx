import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { screen, render, waitFor } from '@testing-library/react';
import { Slider } from './Slider';
import userEvent from '@testing-library/user-event';

const { ResizeObserver } = window;

beforeEach(() => {
  //@ts-expect-error Without this, the following error is introduced: "TypeError: win.ResizeObserver is not a constructor"
  delete window.ResizeObserver;
  window.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
});

afterEach(() => {
  window.ResizeObserver = ResizeObserver;
  vi.restoreAllMocks();
});

describe('Slider', () => {
  it('should call onValueChange when value changes', async () => {
    const onValueChangeMock = vi.fn();
    const user = userEvent.setup();

    render(<Slider label="Target" icon="target" onValueChange={onValueChangeMock} value={0} />);

    const [sliderThumb] = screen.getAllByRole('slider', { hidden: true });
    sliderThumb.focus();

    await user.keyboard('[ArrowRight]');
    expect(sliderThumb).toHaveAttribute('aria-valuenow', '1');
    await user.keyboard('[ArrowLeft]');
    expect(sliderThumb).toHaveAttribute('aria-valuenow', '0');

    await waitFor(() => expect(onValueChangeMock).toHaveBeenCalledTimes(2));
  });
});
