import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders the provided text', () => {
    const { container } = render(<EmptyState text="No data available" />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
