import { fireEvent, render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { BaseModal, BaseModalProps } from './BaseModal';

describe('BaseModal', () => {
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

  const defaultProps: BaseModalProps = {
    open: true,
    setOpen: vi.fn(),
    children: (onCloseClick) => (
      <div>
        <p>Modal Content</p>
        <button onClick={onCloseClick}>Close</button>
      </div>
    ),
  };

  it('renders the modal when open is true', () => {
    render(<BaseModal {...defaultProps} />);
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render the modal when open is false', () => {
    render(<BaseModal {...defaultProps} open={false} />);
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('calls setOpen(false) when close is triggered without confirmBeforeClose', () => {
    const setOpenMock = vi.fn();
    render(<BaseModal {...defaultProps} setOpen={setOpenMock} />);
    fireEvent.click(screen.getByText('Close'));
    expect(setOpenMock).toHaveBeenCalledWith(false);
  });

  it('shows confirm modal when confirmBeforeClose is enabled', () => {
    const confirmTranslations = {
      title: 'Confirm Close',
      description: 'Are you sure you want to close?',
      noLabel: 'No',
      yesLabel: 'Yes',
    };
    render(<BaseModal {...defaultProps} confirmBeforeClose={{ enabled: true, translations: confirmTranslations }} />);
    fireEvent.click(screen.getByText('Close'));
    expect(screen.getByText('Confirm Close')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to close?')).toBeInTheDocument();
  });

  it('closes the modal when "Yes" is clicked in the confirm modal', () => {
    const setOpenMock = vi.fn();
    const confirmTranslations = {
      title: 'Confirm Close',
      description: 'Are you sure you want to close?',
      noLabel: 'No',
      yesLabel: 'Yes',
    };
    render(
      <BaseModal
        {...defaultProps}
        setOpen={setOpenMock}
        confirmBeforeClose={{ enabled: true, translations: confirmTranslations }}
      />,
    );
    fireEvent.click(screen.getByText('Close'));
    fireEvent.click(screen.getByText('Yes'));
    expect(setOpenMock).toHaveBeenCalledWith(false);
  });

  it('closes the modal when clicking outside the dialog', () => {
    render(<BaseModal {...defaultProps} />);
    fireEvent.click(screen.getByRole('dialog'));
    expect(defaultProps.setOpen).toHaveBeenCalledWith(false);
  });

  it('does not close the modal when Escape key is pressed if confirmBeforeClose is enabled', () => {
    const confirmTranslations = {
      title: 'Confirm Close',
      description: 'Are you sure you want to close?',
      noLabel: 'No',
      yesLabel: 'Yes',
    };
    render(<BaseModal {...defaultProps} confirmBeforeClose={{ enabled: true, translations: confirmTranslations }} />);
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(screen.getByText('Confirm Close')).toBeInTheDocument();
  });
});
