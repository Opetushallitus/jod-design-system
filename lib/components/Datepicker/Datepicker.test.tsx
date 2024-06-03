import { userEvent } from '@storybook/test';
import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Datepicker } from './Datepicker';

describe('Datepicker', () => {
  const label = 'Pick a date dude!';
  const placeholder = 'pp.kk.vvvv';
  const value = '2024-05-01';
  const formattedValue = '01.05.2024';
  const onChange = vi.fn();

  afterEach(() => {
    onChange.mockClear();
  });

  it('renders correctly', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 6, 1, 12, 0, 0));
    const { container } = render(
      <Datepicker label={label} placeholder={placeholder} value={value} onChange={onChange} />,
    );
    expect(container.firstChild).toMatchSnapshot();
    vi.useRealTimers();
  });

  it('renders the correct label', () => {
    render(<Datepicker label={label} placeholder={placeholder} value={value} onChange={onChange} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('renders the correct initial value', () => {
    render(<Datepicker label={label} placeholder={placeholder} value={value} onChange={onChange} />);
    expect(screen.getByDisplayValue(formattedValue)).toBeInTheDocument();
  });

  it('calls onValueChange when a new date is typed into the input', async () => {
    render(<Datepicker name="startDate" label={label} placeholder={placeholder} onChange={onChange} />);
    const input = screen.getByRole('textbox');
    const user = userEvent.setup();
    await act(async () => {
      await user.type(input, '01.06.2024');
      await user.tab();
    });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: { name: 'startDate', value: '2024-06-01' },
      }),
    );
  });
});
