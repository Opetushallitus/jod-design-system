// oxlint-disable vitest/require-mock-type-parameters
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React from 'react';
import { afterEach, describe, expect, it, Mock, vi } from 'vitest';

import { Slider } from './Slider';

afterEach(() => {
  vi.restoreAllMocks();
});

const ControlledSlider = ({ mockOnChange, defaultValue, ...rest }: { mockOnChange: Mock; defaultValue: number }) => {
  const [value, setValue] = React.useState(defaultValue);
  mockOnChange.mockImplementation((v: number) => setValue(v));
  return <Slider value={value} label="Target" onValueChange={mockOnChange} rightLabel="moi" {...rest} />;
};

// Thumb is visibility: hidden in jsdom until measured, so accessible name is resolved via aria-labelledby manually
const getThumb = () => screen.getByRole('slider', { hidden: true });
const getThumbName = (thumb: HTMLElement) =>
  document.getElementById(thumb.getAttribute('aria-labelledby') ?? '')?.textContent;

describe('Slider', () => {
  it('should call onValueChange when value changes', async () => {
    const onValueChangeMock = await waitFor(() => vi.fn());
    const user = userEvent.setup();

    act(() => {
      render(<ControlledSlider mockOnChange={onValueChangeMock} defaultValue={0} />);
    });

    const [sliderThumb] = await screen.findAllByRole('slider', { hidden: true });

    await waitFor(() => sliderThumb.focus());
    expect(sliderThumb).toHaveFocus();
    expect(await screen.findByText('100 - 0 %')).toBeInTheDocument();

    const press = async (key: 'left' | 'right') => await user.keyboard(key === 'left' ? '{ArrowLeft}' : '{ArrowRight}');
    const ariaValue = 'aria-valuenow';

    expect(sliderThumb).toHaveAttribute(ariaValue, '0');

    await press('right');
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

    expect(onValueChangeMock).toHaveBeenCalledTimes(8);
  });

  it('should show both values in tooltip when rightLabel is used', async () => {
    const rightLabel = 'Kiinnostukset';

    render(<Slider label="Osaamiset" value={25} onValueChange={vi.fn()} rightLabel={rightLabel} />);

    const [sliderThumb] = screen.getAllByRole('slider', { hidden: true });
    await waitFor(() => sliderThumb.focus());

    expect(screen.getByText('75 - 25 %')).toBeInTheDocument();
  });

  it('should render the label and rightLabel correctly', async () => {
    await waitFor(() => {
      render(<Slider label="Osaamiset" rightLabel="Kiinnostukset" onValueChange={() => vi.fn()} value={50} />);
    });

    expect(screen.getByText('Osaamiset')).toBeInTheDocument();
    expect(screen.getByText('Kiinnostukset')).toBeInTheDocument();
  });

  it('emits data-testid attributes when testId is provided', async () => {
    render(<Slider label="Osaamiset" rightLabel="Kiinnostukset" onValueChange={vi.fn()} value={50} testId="s" />);
    expect(screen.getByTestId('s')).toBeInTheDocument();
    expect(screen.getByTestId('s-label')).toBeInTheDocument();
    expect(screen.getByTestId('s-rightLabel')).toBeInTheDocument();

    const [thumb] = screen.getAllByRole('slider', { hidden: true });
    await waitFor(() => thumb.focus());
    // Tooltip appears when focused
    expect(screen.getByTestId('s-tooltip')).toBeInTheDocument();
    expect(screen.getByTestId('s-tooltip-arrow')).toBeInTheDocument();
    expect(screen.getByTestId('s-thumb')).toBeInTheDocument();
  });

  it('labels the thumb and announces both values', () => {
    render(<Slider label="Osaamiset" rightLabel="Kiinnostukset" value={25} onValueChange={vi.fn()} />);

    const thumb = getThumb();
    expect(getThumbName(thumb)).toBe('Osaamiset - Kiinnostukset');
    expect(thumb).toHaveAttribute('aria-valuetext', 'Osaamiset 75 %, Kiinnostukset 25 %');
  });

  it('uses custom ariaLabel and getAriaValueText', () => {
    render(
      <Slider
        label="Osaamiset"
        rightLabel="Kiinnostukset"
        ariaLabel="Painotus"
        getAriaValueText={(v) => `kiinnostukset ${v}`}
        value={75}
        onValueChange={vi.fn()}
      />,
    );

    const thumb = getThumb();
    expect(getThumbName(thumb)).toBe('Painotus');
    expect(thumb).toHaveAttribute('aria-valuetext', 'kiinnostukset 75');
  });

  it('announces only the value without rightLabel', () => {
    render(<Slider label="Osaamiset" value={50} onValueChange={vi.fn()} />);

    const thumb = getThumb();
    expect(getThumbName(thumb)).toBe('Osaamiset');
    expect(thumb).toHaveAttribute('aria-valuetext', '50 %');
  });

  it('has no a11y violations', async () => {
    const { container } = render(<Slider label="Osaamiset" value={25} onValueChange={vi.fn()} rightLabel="right" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
