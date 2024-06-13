import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { InputField } from './InputField';

describe('InputField', () => {
  const label = 'Username';

  it('renders label correctly', () => {
    const value = 'john';
    const onChange = vi.fn();
    const { container } = render(<InputField value={value} onChange={onChange} label={label} />);
    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders input correctly', () => {
    const placeholder = 'Enter your username';
    const value = 'john';
    const onChange = vi.fn();
    const { container } = render(
      <InputField value={value} onChange={onChange} label={label} placeholder={placeholder} />,
    );
    const inputElement = screen.getByPlaceholderText(`(${placeholder})`);
    expect(inputElement).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders help text correctly', () => {
    const helpText = 'Please enter your username';
    const value = 'john';
    const onChange = vi.fn();
    const { container } = render(<InputField value={value} onChange={onChange} label={label} help={helpText} />);
    const helpElement = screen.getByText(helpText);
    expect(helpElement).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('updates input value correctly', () => {
    const onChange = vi.fn();
    const value = 'test value';
    const { container } = render(<InputField value={value} onChange={onChange} label={label} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'new value' } });
    expect(onChange).toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
  });
});
