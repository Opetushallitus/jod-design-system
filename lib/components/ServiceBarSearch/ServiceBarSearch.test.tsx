// oxlint-disable vitest/require-mock-type-parameters
import { act, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ServiceBarSearch, type ServiceBarSearchProps } from './ServiceBarSearch';

const mediaQueries = { sm: true };
vi.mock('../../hooks/useMediaQueries', () => ({
  useMediaQueries: () => mediaQueries,
}));

describe('ServiceBarSearch', () => {
  const baseProps: ServiceBarSearchProps = {
    expanded: false,
    onExpandedChange: vi.fn(),
    onSubmit: vi.fn(),
    placeholder: 'Search the service',
    ariaLabel: 'Search',
    searchLabel: 'Search',
    testId: 'searchbar',
  };

  beforeEach(() => {
    mediaQueries.sm = true;
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('matches snapshot', () => {
    const { container } = render(<ServiceBarSearch {...baseProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('shows the input on desktop', () => {
    render(<ServiceBarSearch {...baseProps} />);
    expect(screen.getByRole('searchbox', { name: 'Search' })).toBeInTheDocument();
    expect(screen.queryByTestId('searchbar-toggle')).not.toBeInTheDocument();
  });

  it('shows only the toggle button on mobile when collapsed', () => {
    mediaQueries.sm = false;
    const onExpandedChange = vi.fn();
    render(<ServiceBarSearch {...baseProps} onExpandedChange={onExpandedChange} />);
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('searchbar-toggle'));
    expect(onExpandedChange).toHaveBeenCalledWith(true);
  });

  it('shows and focuses the input on mobile when expanded', () => {
    mediaQueries.sm = false;
    render(<ServiceBarSearch {...baseProps} expanded />);
    expect(screen.getByRole('searchbox')).toHaveFocus();
  });

  it('calls onSubmit with the value and resets after a delay', () => {
    const onSubmit = vi.fn();
    const onExpandedChange = vi.fn();
    render(<ServiceBarSearch {...baseProps} onSubmit={onSubmit} onExpandedChange={onExpandedChange} />);
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.submit(screen.getByTestId('searchbar-form'));
    fireEvent.submit(screen.getByTestId('searchbar-form'));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith('test');

    act(() => {
      vi.runAllTimers();
    });
    expect(input).toHaveValue('');
    expect(onExpandedChange).toHaveBeenCalledWith(false);
  });

  it('has no a11y violations', async () => {
    vi.useRealTimers();
    const { container } = render(<ServiceBarSearch {...baseProps} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
