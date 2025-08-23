import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Modal } from './Modal';

describe('Modal', () => {
  it('renders correctly', async () => {
    const content = <div>Modal Content</div>;
    const footer = <div>Modal Footer</div>;

    render(<Modal open={true} onClose={vi.fn()} content={content} footer={footer} />);

    // Assert that the modal is rendered
    const modalElement = screen.getByRole('dialog');
    await waitFor(() => expect(modalElement).toBeInTheDocument());

    // Assert that the content is rendered
    const contentElement = screen.getByText('Modal Content');
    expect(contentElement).toBeInTheDocument();

    // Assert that the footer is rendered
    const footerElement = screen.getByText('Modal Footer');
    expect(footerElement).toBeInTheDocument();
  });

  it('emits data-testid attributes when dataTestId is provided', async () => {
    const content = <div>Modal Content</div>;
    const footer = <div>Modal Footer</div>;

    render(<Modal open={true} onClose={vi.fn()} content={content} footer={footer} dataTestId="modal" />);

    await waitFor(() => expect(screen.getByTestId('modal')).toBeInTheDocument());
    expect(screen.getByTestId('modal-backdrop')).toBeInTheDocument();
    expect(screen.getByTestId('modal-container')).toBeInTheDocument();
    expect(screen.getByTestId('modal-center')).toBeInTheDocument();
    expect(screen.getByTestId('modal-panel')).toBeInTheDocument();
    expect(screen.getByTestId('modal-content-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('modal-main')).toBeInTheDocument();
    expect(screen.getByTestId('modal-scroll')).toBeInTheDocument();
    expect(screen.getByTestId('modal-footer')).toBeInTheDocument();
  });
});
