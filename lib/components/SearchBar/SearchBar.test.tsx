// oxlint-disable vitest/require-mock-type-parameters
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';

import { SearchBar, type SearchBarProps } from './SearchBar';

describe('SearchBar', () => {
  const baseProps: SearchBarProps = {
    value: 'test',
    onChange: vi.fn(),
    onSubmit: vi.fn(),
    placeholder: 'Search',
    searchLabel: 'Search',
    clearLabel: 'Clear',
    testId: 'searchbar',
  };

  it('matches snapshot', () => {
    const { container } = render(<SearchBar {...baseProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('calls onChange when typing', () => {
    const onChange = vi.fn();
    render(<SearchBar {...baseProps} onChange={onChange} />);
    fireEvent.change(screen.getByTestId('searchbar-input'), { target: { value: 'new value' } });
    expect(onChange).toHaveBeenCalledWith('new value');
  });

  it('calls onChange with empty string when clear button is clicked', () => {
    const onChange = vi.fn();
    render(<SearchBar {...baseProps} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('calls onSubmit with the current value when submitted', () => {
    const onSubmit = vi.fn();
    render(<SearchBar {...baseProps} onSubmit={onSubmit} />);
    fireEvent.click(screen.getByTestId('searchbar-submit-button'));
    expect(onSubmit).toHaveBeenCalledWith('test');
  });

  it('uses placeholder as aria-label by default and ariaLabel when given', () => {
    const { rerender } = render(<SearchBar {...baseProps} />);
    expect(screen.getByTestId('searchbar-input')).toHaveAttribute('aria-label', 'Search');
    rerender(<SearchBar {...baseProps} ariaLabel="Search the site" />);
    expect(screen.getByTestId('searchbar-input')).toHaveAttribute('aria-label', 'Search the site');
  });

  it('shows error message and links it to the input', () => {
    render(<SearchBar {...baseProps} errorMessage="Too short" />);
    const error = screen.getByRole('alert');
    const input = screen.getByTestId('searchbar-input');
    expect(error).toHaveTextContent('Too short');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', error.id);
  });

  it('applies service variant color to the search button', () => {
    render(<SearchBar {...baseProps} serviceVariant="ohjaaja" />);
    expect(screen.getByTestId('searchbar-submit-button')).toHaveClass('ds:bg-primary-2-dark');
  });

  it('has no a11y violations', async () => {
    const { container } = render(<SearchBar {...baseProps} errorMessage="Too short" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
