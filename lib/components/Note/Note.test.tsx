import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Note } from './Note';

describe('Note component', () => {
  it('renders with default variant', () => {
    const { container } = render(<Note title="Test Title" description="Test Description" />);
    const noteElement = screen.getByRole('alert');
    expect(noteElement).toBeInTheDocument();
    expect(noteElement).toHaveClass('ds-bg-success');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders with success variant', () => {
    const { container } = render(<Note title="Test Title" description="Test Description" variant="success" />);
    const noteElement = screen.getByRole('alert');
    expect(noteElement).toBeInTheDocument();
    expect(noteElement).toHaveClass('ds-bg-success');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders with warning variant', () => {
    const { container } = render(<Note title="Test Title" description="Test Description" variant="warning" />);
    const noteElement = screen.getByRole('alert');
    expect(noteElement).toBeInTheDocument();
    expect(noteElement).toHaveClass('ds-bg-warning');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders with error variant', () => {
    const { container } = render(<Note title="Test Title" description="Test Description" variant="error" />);
    const noteElement = screen.getByRole('alert');
    expect(noteElement).toBeInTheDocument();
    expect(noteElement).toHaveClass('ds-bg-alert');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders with read more component', () => {
    const { container } = render(
      <Note title="Test Title" description="Test Description" variant="success" readMoreComponent={<>Read more</>} />,
    );
    const readMoreLink = screen.getByText(/Read more/);
    expect(readMoreLink).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders with close button', () => {
    const onCloseClick = vi.fn();
    const { container } = render(
      <Note title="Test Title" description="Test Description" variant="success" onCloseClick={onCloseClick} />,
    );
    const closeButton = screen.getByLabelText('Close');
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute('aria-label', 'Close');
    closeButton.click();
    expect(onCloseClick).toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
  });
});
