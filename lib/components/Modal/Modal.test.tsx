// oxlint-disable vitest/require-mock-type-parameters
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Modal } from './Modal';

describe('Modal', () => {
  it('renders correctly', async () => {
    const content = <div>Modal Content</div>;
    const footer = <div>Modal Footer</div>;

    render(<Modal name="Modal name" open={true} onClose={vi.fn()} content={content} footer={footer} />);

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

  it('emits data-testid attributes when testId is provided', async () => {
    const content = <div>Modal Content</div>;
    const footer = <div>Modal Footer</div>;

    render(<Modal name="Modal name" open={true} onClose={vi.fn()} content={content} footer={footer} testId="modal" />);

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

  it('becomes visible on mobile when its content changes while the height is measured', async () => {
    const Content = ({ onLayout }: { onLayout: () => void }) => {
      React.useLayoutEffect(onLayout);
      return <div>Modal Content</div>;
    };
    const Parent = () => {
      const [, setLayouts] = React.useState(0);
      return (
        <Modal
          name="Modal name"
          open={true}
          onClose={vi.fn()}
          content={<Content onLayout={() => setLayouts((count) => Math.min(count + 1, 3))} />}
          testId="modal"
        />
      );
    };

    render(<Parent />);

    await waitFor(() => expect(screen.getByTestId('modal-panel')).toHaveClass('ds:h-[50dvh]'));
    expect(screen.getByTestId('modal-panel')).not.toHaveClass('ds:invisible');
  });
});
