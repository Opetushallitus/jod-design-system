import { userEvent } from '@storybook/test';
import { act, render, screen } from '@testing-library/react';
import React from 'react';
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

  it('can clear the value', async () => {
    const value = {
      date: '2020-01-01',
    };
    const onChangeMock = vi.fn().mockImplementation((event: React.ChangeEvent<HTMLInputElement>) => {
      value.date = event.target.value;
    });
    render(
      <Datepicker
        name="startDate"
        label={label}
        placeholder={placeholder}
        onChange={onChangeMock}
        value={value.date}
      />,
    );
    const input = screen.getByRole('textbox');
    const user = userEvent.setup();
    await act(async () => {
      await user.clear(input);
      await user.tab();
    });

    expect(onChangeMock).toHaveBeenCalledWith(
      expect.objectContaining({
        target: { name: 'startDate', value: '' },
      }),
    );

    expect(value.date).toBe('');
  });
});
