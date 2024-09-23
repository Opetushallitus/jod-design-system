import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Slider } from './Slider';

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

    render(<Slider label="Target" onValueChange={onValueChangeMock} value={0} />);

    const [sliderThumb] = screen.getAllByRole('slider', { hidden: true });
    await waitFor(() => sliderThumb.focus());

    await user.keyboard('[ArrowRight]');
    expect(sliderThumb).toHaveAttribute('aria-valuenow', '25');
    await user.keyboard('[ArrowLeft]');
    expect(sliderThumb).toHaveAttribute('aria-valuenow', '0');

    await waitFor(() => expect(onValueChangeMock).toHaveBeenCalledTimes(2));
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
