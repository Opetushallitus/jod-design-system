import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { Modal } from './Modal';

describe('Modal Component', () => {
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

  it('should close the modal when Escape key is pressed and confirmRef is not provided', () => {
    const ref = createRef<HTMLDialogElement>();
    const { container } = render(<Modal ref={ref}>Test Content</Modal>);

    expect(ref.current?.open).toBe(false);

    ref.current?.showModal();

    expect(ref.current?.open).toBe(true);

    fireEvent.keyDown(container.querySelector('dialog')!, { key: 'Escape' });

    expect(ref.current?.open).toBe(false);
  });

  it('should open confirm modal when Escape key is pressed and confirmRef is provided', () => {
    const ref = createRef<HTMLDialogElement>();
    const confirmRef = createRef<HTMLDialogElement>();
    const confirmYesRef = createRef<HTMLButtonElement>();
    render(
      <Modal ref={ref} confirmRef={confirmRef} confirmYesRef={confirmYesRef}>
        Test Content
      </Modal>,
    );

    expect(ref.current?.open).toBe(false);

    ref.current?.showModal();

    expect(ref.current?.open).toBe(true);
    expect(confirmRef.current?.open).toBe(false);

    fireEvent.keyDown(ref.current!, { key: 'Escape' });

    expect(confirmRef.current?.open).toBe(true);
    expect(confirmYesRef.current).toHaveFocus();
  });

  it('should close the modal when clicking outside and confirmRef is not provided', () => {
    const ref = createRef<HTMLDialogElement>();
    const { container } = render(<Modal ref={ref}>Test Content</Modal>);

    expect(ref.current?.open).toBe(false);

    ref.current?.showModal();

    expect(ref.current?.open).toBe(true);

    fireEvent.click(container.querySelector('dialog')!);

    expect(ref.current?.open).toBe(false);
  });

  it('should open confirm modal when clicking outside and confirmRef is provided', () => {
    const ref = createRef<HTMLDialogElement>();
    const confirmRef = createRef<HTMLDialogElement>();
    render(
      <Modal ref={ref} confirmRef={confirmRef}>
        Test Content
      </Modal>,
    );

    expect(ref.current?.open).toBe(false);

    ref.current?.showModal();

    expect(ref.current?.open).toBe(true);
    expect(confirmRef.current?.open).toBe(false);

    fireEvent.click(ref.current!);

    expect(ref.current?.open).toBe(true);
    expect(confirmRef.current?.open).toBe(true);
  });
});
