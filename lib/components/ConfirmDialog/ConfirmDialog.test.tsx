import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { userEvent } from '@storybook/test';
import { ConfirmDialog } from './ConfirmDialog';

describe('ConfirmDialog', () => {
  it('renders dialog when showDialog is called', async () => {
    const user = userEvent.setup();
    render(
      <ConfirmDialog
        title="ConfirmDialog rendered"
        description="Are you sure?"
        onConfirm={vi.fn()}
        confirmText="Confirm"
        cancelText="Cancel"
      >
        {(showDialog) => <button onClick={showDialog}>Show for rendering</button>}
      </ConfirmDialog>,
    );

    await act(async () => {
      await user.click(screen.getByText('Show for rendering'));
    });

    expect(screen.getByText('ConfirmDialog rendered')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(screen.getByLabelText('ConfirmDialog rendered')).toMatchSnapshot();
  });

  it('calls onConfirm when confirm button is clicked', async () => {
    const onConfirmMock = vi.fn();
    const user = userEvent.setup();
    render(
      <ConfirmDialog
        title="onConfirm called"
        description="Are you sure?"
        onConfirm={onConfirmMock}
        confirmText="Confirm"
        cancelText="Cancel"
      >
        {(showDialog) => <button onClick={showDialog}>Show for onConfirm</button>}
      </ConfirmDialog>,
    );
    await act(async () => {
      await user.click(screen.getByText('Show for onConfirm'));
    });
    await act(async () => {
      await user.click(screen.getByText('Confirm'));
    });

    expect(onConfirmMock).toHaveBeenCalled();
  });

  it('closes dialog when cancel button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <ConfirmDialog
        title="ConfirmDialog closes"
        description="Are you sure?"
        onConfirm={vi.fn()}
        confirmText="Confirm"
        cancelText="Cancel"
      >
        {(showDialog) => <button onClick={showDialog}>Test closing</button>}
      </ConfirmDialog>,
    );

    await act(async () => {
      await user.click(screen.getByText('Test closing'));
    });
    await act(async () => {
      await user.click(screen.getByText('Cancel'));
    });

    expect(screen.queryByText('ConfirmDialog closes')).not.toBeInTheDocument();
    expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument();
  });
});
