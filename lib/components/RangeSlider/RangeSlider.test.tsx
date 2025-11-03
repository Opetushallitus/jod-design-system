import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RangeSlider, RangeSliderValue } from './RangeSlider';

const markers: RangeSliderValue[] = [
  { label: 'Min', value: 0 },
  { label: 'Mid', value: 1 },
  { label: 'Max', value: 2 },
];

const minDescription = 'Minimun value description';
const maxDescription = 'Maximum value description';

describe('RangeSlider', () => {
  const onValueChange = vi.fn();

  beforeEach(() => {
    onValueChange.mockClear();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <RangeSlider
        markers={markers}
        value={[0, 100]}
        onValueChange={onValueChange}
        testId="slider"
        minValueDescription={minDescription}
        maxValueDescription={maxDescription}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly with given markers and value', () => {
    const { getByText, getAllByTestId } = render(
      <RangeSlider
        markers={markers}
        value={[0, 100]}
        onValueChange={onValueChange}
        testId="slider"
        minValueDescription={minDescription}
        maxValueDescription={maxDescription}
      />,
    );
    expect(getByText('Min')).toBeInTheDocument();
    expect(getByText('Mid')).toBeInTheDocument();
    expect(getByText('Max')).toBeInTheDocument();
    expect(getAllByTestId(/slider-thumb-/)).toHaveLength(2);
  });

  it('calls onValueChange when slider value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const { getAllByRole } = render(
      <RangeSlider
        markers={markers}
        value={[0, 2]}
        onValueChange={handleChange}
        testId="slider"
        minValueDescription={minDescription}
        maxValueDescription={maxDescription}
      />,
    );
    // Simulate change on first thumb
    const thumbs = getAllByRole('slider');
    await user.click(thumbs[0]);
    await user.keyboard('{ArrowRight}');
    expect(handleChange).toHaveBeenCalledWith([1, 2]);
    await user.tab();
    await user.keyboard('{ArrowLeft}');
    expect(handleChange).toHaveBeenCalledWith([0, 1]);
    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  it('renders disabled state', () => {
    const { container } = render(
      <RangeSlider
        markers={markers}
        value={[0, 100]}
        onValueChange={onValueChange}
        disabled
        testId="slider"
        minValueDescription={minDescription}
        maxValueDescription={maxDescription}
      />,
    );
    expect(container.firstChild).toHaveClass('ds:cursor-not-allowed');
  });

  it('renders correct number of markers and thumbs', () => {
    const { getAllByTestId, getAllByText } = render(
      <RangeSlider
        markers={markers}
        value={[0, 100]}
        onValueChange={onValueChange}
        testId="slider"
        minValueDescription={minDescription}
        maxValueDescription={maxDescription}
      />,
    );
    expect(getAllByText(/Min|Mid|Max/)).toHaveLength(3);
    expect(getAllByTestId(/slider-thumb-/)).toHaveLength(2);
  });

  it('applies data-testid attributes', () => {
    const { getByTestId } = render(
      <RangeSlider
        markers={markers}
        value={[0, 100]}
        onValueChange={onValueChange}
        testId="slider"
        minValueDescription={minDescription}
        maxValueDescription={maxDescription}
      />,
    );
    expect(getByTestId('slider-thumb-0')).toBeInTheDocument();
    expect(getByTestId('slider-thumb-1')).toBeInTheDocument();
  });
});
