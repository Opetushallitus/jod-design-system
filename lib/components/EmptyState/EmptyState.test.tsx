import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders the provided text', () => {
    const { container } = render(<EmptyState text="No data available" testId="empty" />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('emits data-testid when testId is provided', () => {
    render(<EmptyState text="No data available" testId="empty" />);
    expect(screen.getByTestId('empty')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(<EmptyState text="Empty" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
