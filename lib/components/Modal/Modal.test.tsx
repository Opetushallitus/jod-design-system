import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { Modal } from './Modal';

test('Modal renders correctly', () => {
  const content = <div>Modal Content</div>;
  const footer = <div>Modal Footer</div>;

  render(<Modal open={true} onClose={vi.fn()} content={content} footer={footer} />);

  // Assert that the modal is rendered
  const modalElement = screen.getByRole('dialog');
  expect(modalElement).toBeInTheDocument();

  // Assert that the content is rendered
  const contentElement = screen.getByText('Modal Content');
  expect(contentElement).toBeInTheDocument();

  // Assert that the footer is rendered
  const footerElement = screen.getByText('Modal Footer');
  expect(footerElement).toBeInTheDocument();
});
