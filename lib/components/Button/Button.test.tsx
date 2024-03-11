import { describe, expect, it, test, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './Button';

describe('Snapshot testing', () => {
  test('Base button', () => {
    const { container } = render(<Button label="Base button" variant="base" onClick={vi.fn()} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Primary button', () => {
    const { container } = render(<Button label="Primary button" variant="primary" onClick={vi.fn()} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Outlined button', () => {
    const { container } = render(<Button label="Outlined button" variant="outlined" onClick={vi.fn()} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Text button', () => {
    const { container } = render(<Button label="Text button" variant="text" onClick={vi.fn()} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

it('renders the button', () => {
  render(<Button label="Rendered button" onClick={vi.fn()} />);
  expect(true).toBeTruthy();
});

it('has the correct label', () => {
  render(<Button label="Label" onClick={vi.fn()} />);
  expect(screen.getByRole('button', { name: 'Label' })).not.toBeNull();
});

it('calls the callback on click', async () => {
  const mockCallback = vi.fn();
  const user = userEvent.setup();

  render(<Button label="Test callback" onClick={mockCallback} />);
  const button = screen.getByRole('button', { name: 'Test callback' });
  await user.click(button);
  expect(mockCallback).toHaveBeenCalledTimes(1);
});

it('does not call the callback while disabled', async () => {
  const mockCallback = vi.fn();
  const user = userEvent.setup();

  render(<Button label="Disabled Button" onClick={mockCallback} disabled />);
  const button = screen.getByRole('button', { name: 'Disabled Button' });
  await user.click(button);
  expect(mockCallback).toHaveBeenCalledTimes(0);
});
