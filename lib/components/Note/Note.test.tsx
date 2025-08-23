import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Note } from './Note';

describe('Note component', () => {
  it('renders with default variant', () => {
    render(<Note title="Test Title" description="Test Description" dataTestId="note" />);
    const noteElement = screen.getByRole('alert');
    expect(noteElement).toBeInTheDocument();
    expect(noteElement).toHaveClass('ds:bg-success');
    expect(screen.getByTestId('note')).toBeInTheDocument();
  });

  it('renders with success variant', () => {
    render(<Note title="Test Title" description="Test Description" variant="success" />);
    const noteElement = screen.getByRole('alert');
    expect(noteElement).toBeInTheDocument();
    expect(noteElement).toHaveClass('ds:bg-success');
    // no snapshot to avoid churn from attributes
  });

  it('renders with warning variant', () => {
    render(<Note title="Test Title" description="Test Description" variant="warning" />);
    const noteElement = screen.getByRole('alert');
    expect(noteElement).toBeInTheDocument();
    expect(noteElement).toHaveClass('ds:bg-warning');
    // no snapshot to avoid churn from attributes
  });

  it('renders with error variant', () => {
    const { container } = render(<Note title="Test Title" description="Test Description" variant="error" />);
    const noteElement = screen.getByRole('alert');
    expect(noteElement).toBeInTheDocument();
    expect(noteElement).toHaveClass('ds:bg-alert');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders with read more component', () => {
    const { container } = render(
      <Note
        title="Test Title"
        description="Test Description"
        variant="success"
        readMoreComponent={<>Read more</>}
        dataTestId="note2"
      />,
    );
    const readMoreLink = screen.getByText(/Read more/);
    expect(readMoreLink).toBeInTheDocument();
    expect(screen.getByTestId('note2')).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders with close button', () => {
    const onCloseClick = vi.fn();
    const { container } = render(
      <Note
        title="Test Title"
        description="Test Description"
        variant="success"
        onCloseClick={onCloseClick}
        dataTestId="note3"
      />,
    );
    const closeButton = screen.getByLabelText('Close');
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute('aria-label', 'Close');
    expect(screen.getByTestId('note3-close')).toBeInTheDocument();
    closeButton.click();
    expect(onCloseClick).toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
  });
});
