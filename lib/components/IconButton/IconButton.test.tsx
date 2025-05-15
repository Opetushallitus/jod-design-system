import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, test, vi } from 'vitest';

import { IconButton } from './IconButton';

describe('Snapshot testing', () => {
  test('Default', () => {
    const { container } = render(<IconButton label="Default" onClick={vi.fn()} icon="target" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Disabled', () => {
    const { container } = render(<IconButton label="Disabled, non-selected" onClick={vi.fn()} icon="target" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

it('has the correct label', () => {
  render(<IconButton label="Label" onClick={vi.fn()} icon="target" />);
  expect(screen.getByRole('button', { name: 'Label' })).not.toBeNull();
});

it('calls the callback on click', async () => {
  const mockCallback = vi.fn();
  const user = userEvent.setup();

  render(<IconButton label="Test callback" onClick={mockCallback} icon="target" />);
  const button = screen.getByRole('button', { name: 'Test callback' });
  await user.click(button);
  expect(mockCallback).toHaveBeenCalledTimes(1);
});

it('does not call the callback while disabled', async () => {
  const mockCallback = vi.fn();
  const user = userEvent.setup();

  render(<IconButton label="Disabled IconButton" onClick={mockCallback} disabled icon="target" />);
  const button = screen.getByRole('button', { name: 'Disabled IconButton' });
  await user.click(button);
  expect(mockCallback).toHaveBeenCalledTimes(0);
});

describe('disabled', () => {
  it('should add correct CSS classes', () => {
    render(<IconButton label="Disabled IconButton" disabled={true} onClick={vi.fn()} icon="target" />);
    const parentClassList = screen.getByText('Disabled IconButton').parentElement?.classList;
    expect(parentClassList).toContain('ds:cursor-not-allowed');
    expect(parentClassList).toContain('ds:opacity-50');
  });

  it('has the disabled attribute', () => {
    const { getByRole } = render(
      <IconButton label="Disabled IconButton" disabled={true} onClick={vi.fn()} icon="target" />,
    );
    expect(getByRole('button')).toHaveProperty('disabled', true);
  });
});
