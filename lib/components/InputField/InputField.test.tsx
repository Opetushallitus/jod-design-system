// oxlint-disable vitest/require-mock-type-parameters
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';

import { InputField } from './InputField';

describe('InputField', () => {
  const label = 'Username';

  it('renders label correctly', () => {
    const value = 'john';
    const onChange = vi.fn();
    const { container } = render(<InputField value={value} onChange={onChange} label={label} testId="input" />);
    expect(screen.getByTestId('input-field')).toBeInTheDocument();
    expect(screen.getByTestId('input-label')).toBeInTheDocument();
    expect(screen.getByTestId('input-input')).toBeInTheDocument();
    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders input correctly', () => {
    const placeholder = 'Enter your username';
    const value = 'john';
    const onChange = vi.fn();
    const { container } = render(
      <InputField value={value} onChange={onChange} label={label} placeholder={placeholder} testId="input2" />,
    );
    expect(screen.getByTestId('input2-field')).toBeInTheDocument();
    expect(screen.getByTestId('input2-label')).toBeInTheDocument();
    expect(screen.getByTestId('input2-input')).toBeInTheDocument();
    const inputElement = screen.getByPlaceholderText(placeholder);
    expect(inputElement).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders help text correctly', () => {
    const helpText = 'Please enter your username';
    const value = 'john';
    const onChange = vi.fn();
    const { container } = render(
      <InputField value={value} onChange={onChange} label={label} help={helpText} testId="input3" />,
    );
    expect(screen.getByTestId('input3-field')).toBeInTheDocument();
    expect(screen.getByTestId('input3-label')).toBeInTheDocument();
    expect(screen.getByTestId('input3-input')).toBeInTheDocument();
    expect(screen.getByTestId('input3-help')).toBeInTheDocument();
    const helpElement = screen.getByText(helpText);
    expect(helpElement).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('updates input value correctly', () => {
    const onChange = vi.fn();
    const value = 'test value';
    const { container } = render(<InputField value={value} onChange={onChange} label={label} testId="input4" />);
    expect(screen.getByTestId('input4-field')).toBeInTheDocument();
    expect(screen.getByTestId('input4-label')).toBeInTheDocument();
    expect(screen.getByTestId('input4-input')).toBeInTheDocument();
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'new value' } });
    expect(onChange).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });

  it('has no a11y violations', async () => {
    const { container } = render(<InputField onChange={vi.fn()} label={label} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
