import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, test, vi } from 'vitest';

import { RoundButton } from './RoundButton';

describe('Snapshot testing', () => {
  test('Default', () => {
    const { container } = render(<RoundButton label="Default" onClick={vi.fn()} icon="target" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('selected', () => {
    const { container } = render(<RoundButton label="Selected" selected={true} onClick={vi.fn()} icon="target" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Disabled, selected', () => {
    const { container } = render(
      <RoundButton label="Disabled, non-selected" selected={true} onClick={vi.fn()} icon="target" />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Disabled, non-selected', () => {
    const { container } = render(<RoundButton label="Disabled, non-selected" onClick={vi.fn()} icon="target" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Disabled, selected', () => {
    const { container } = render(
      <RoundButton label="Disabled, non-selected" selected={true} onClick={vi.fn()} icon="target" />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

it('has the correct label', () => {
  render(<RoundButton label="Label" onClick={vi.fn()} icon="target" />);
  expect(screen.getByRole('button', { name: 'Label' })).not.toBeNull();
});

it('calls the callback on click', async () => {
  const mockCallback = vi.fn();
  const user = userEvent.setup();

  render(<RoundButton label="Test callback" onClick={mockCallback} icon="target" />);
  const button = screen.getByRole('button', { name: 'Test callback' });
  await user.click(button);
  expect(mockCallback).toHaveBeenCalledTimes(1);
});

it('does not call the callback while disabled', async () => {
  const mockCallback = vi.fn();
  const user = userEvent.setup();

  render(<RoundButton label="Disabled RoundButton" onClick={mockCallback} disabled icon="target" />);
  const button = screen.getByRole('button', { name: 'Disabled RoundButton' });
  await user.click(button);
  expect(mockCallback).toHaveBeenCalledTimes(0);
});

describe('disabled', () => {
  it('should add correct CSS classes', () => {
    render(<RoundButton label="Disabled RoundButton" disabled={true} onClick={vi.fn()} icon="target" />);
    const parentClassList = screen.getByText('Disabled RoundButton').parentElement?.classList;
    expect(parentClassList).toContain('ds:cursor-not-allowed');
    expect(parentClassList).toContain('ds:opacity-50');
  });

  it('has the disabled attribute', () => {
    const { getByRole } = render(
      <RoundButton label="Disabled RoundButton" disabled={true} onClick={vi.fn()} icon="target" />,
    );
    expect(getByRole('button')).toHaveProperty('disabled', true);
  });
});
