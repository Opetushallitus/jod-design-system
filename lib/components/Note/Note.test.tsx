import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Note } from './Note';

describe('Note component', () => {
  it('renders with default variant', () => {
    const { container } = render(
      <Note title="Test Title" description="Test Description" testId="note" ariaClose="Close" />,
    );
    const noteElement = screen.getByRole('alert');
    expect(noteElement).toBeInTheDocument();
    expect(noteElement).toHaveClass('ds:bg-success');
    expect(screen.getByTestId('note')).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders with success variant', () => {
    const { container } = render(
      <Note title="Test Title" description="Test Description" variant="success" ariaClose="Close" />,
    );
    const noteElement = screen.getByRole('alert');
    expect(noteElement).toBeInTheDocument();
    expect(noteElement).toHaveClass('ds:bg-success');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders with warning variant', () => {
    const { container } = render(
      <Note title="Test Title" description="Test Description" variant="warning" ariaClose="Close" />,
    );
    const noteElement = screen.getByRole('alert');
    expect(noteElement).toBeInTheDocument();
    expect(noteElement).toHaveClass('ds:bg-warning');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders with error variant', () => {
    const { container } = render(
      <Note title="Test Title" description="Test Description" variant="error" ariaClose="Close" />,
    );
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
        testId="note2"
        ariaClose="Close"
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
        testId="note3"
        ariaClose="Close"
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
