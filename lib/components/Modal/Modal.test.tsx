import { render, screen, waitFor } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { Modal } from './Modal';

describe('Modal', () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.show = vi.fn(function mock(this: HTMLDialogElement) {
      this.open = true;
    });
    HTMLDialogElement.prototype.showModal = vi.fn(function mock(this: HTMLDialogElement) {
      this.open = true;
    });
    HTMLDialogElement.prototype.close = vi.fn(function mock(this: HTMLDialogElement) {
      this.open = false;
    });
  });

  it('renders correctly', async () => {
    const content = <div>Modal Content</div>;
    const footer = <div>Modal Footer</div>;

    render(
      <Modal open={true} onClose={vi.fn()} renderFooter={() => footer}>
        {content}
      </Modal>,
    );

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
});
