import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  const placeholder = 'Enter text';

  it('renders without crashing', () => {
    const onChange = vi.fn();
    render(<Textarea onChange={onChange} placeholder={placeholder} dataTestId="ta1" />);
    expect(screen.getByTestId('ta1')).toBeInTheDocument();
    const textarea = screen.getByPlaceholderText(placeholder);
    expect(textarea).toBeInTheDocument();
    expect(screen.getByTestId('ta1')).toBeInTheDocument();
  });

  it('displays the label when hideLabel is false', () => {
    const onChange = vi.fn();
    render(<Textarea onChange={onChange} label="Test Label" placeholder="Enter text" dataTestId="ta2" />);
    expect(screen.getByTestId('ta2')).toBeInTheDocument();
    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
    expect(screen.getByTestId('ta2')).toBeInTheDocument();
  });

  it('hides the label when hideLabel is true', () => {
    const onChange = vi.fn();
    render(<Textarea onChange={onChange} hideLabel={true} placeholder="Enter text" dataTestId="ta3" />);
    expect(screen.getByTestId('ta3')).toBeInTheDocument();
    const label = screen.queryByText('Test Label');
    expect(label).not.toBeInTheDocument();
    expect(screen.getByTestId('ta3')).toBeInTheDocument();
  });

  it('calls onChange when the value changes', () => {
    const onChange = vi.fn();
    render(<Textarea onChange={onChange} placeholder="Enter text" dataTestId="ta4" />);
    expect(screen.getByTestId('ta4')).toBeInTheDocument();
    const textarea = screen.getByPlaceholderText(placeholder);
    fireEvent.change(textarea, { target: { value: 'New value' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('ta4')).toBeInTheDocument();
  });

  it('calls onBlur when the textarea loses focus', () => {
    const onChange = vi.fn();
    const onBlur = vi.fn();
    render(<Textarea onChange={onChange} onBlur={onBlur} placeholder="Enter text" dataTestId="ta5" />);
    expect(screen.getByTestId('ta5')).toBeInTheDocument();
    const textarea = screen.getByPlaceholderText(placeholder);
    fireEvent.blur(textarea);
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('ta5')).toBeInTheDocument();
  });

  it('displays help text when provided', () => {
    const onChange = vi.fn();
    render(<Textarea onChange={onChange} help="Help text" placeholder="Enter text" dataTestId="ta6" />);
    expect(screen.getByTestId('ta6')).toBeInTheDocument();
    const helpText = screen.getByText('Help text');
    expect(helpText).toBeInTheDocument();
    expect(screen.getByTestId('ta6')).toBeInTheDocument();
  });

  it('sets the correct number of rows', () => {
    const onChange = vi.fn();
    render(<Textarea onChange={onChange} rows={5} placeholder="Enter text" dataTestId="ta7" />);
    expect(screen.getByTestId('ta7')).toBeInTheDocument();
    const textarea = screen.getByPlaceholderText(placeholder);
    expect(textarea).toHaveAttribute('rows', '5');
    expect(screen.getByTestId('ta7')).toBeInTheDocument();
  });
});
