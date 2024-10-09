import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import React from 'react';
import { ConfirmDialog } from './ConfirmDialog';

describe('ConfirmDialog', () => {
  vi.spyOn(React, 'useId').mockImplementation(() => 'mock-id');

  test('renders dialog when showDialog is called', () => {
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

    fireEvent.click(screen.getByText('Show for rendering'));

    expect(screen.getByText('ConfirmDialog rendered')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();

    expect(screen.getByLabelText('ConfirmDialog rendered')).toMatchSnapshot();
  });

  test('calls onConfirm when confirm button is clicked', () => {
    const onConfirmMock = vi.fn();
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

    fireEvent.click(screen.getByText('Show for onConfirm'));
    fireEvent.click(screen.getByText('Confirm'));

    expect(onConfirmMock).toHaveBeenCalled();
  });

  test('closes dialog when cancel button is clicked', () => {
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

    fireEvent.click(screen.getByText('Test closing'));
    fireEvent.click(screen.getByText('Cancel'));

    expect(screen.queryByText('ConfirmDialog closes')).not.toBeInTheDocument();
    expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument();
  });
});
