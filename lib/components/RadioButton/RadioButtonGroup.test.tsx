import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, test, vi } from 'vitest';
import { RadioButtonGroup } from './RadioButtonGroup';

import { RadioButton } from './RadioButton';

describe('Snapshot testing', () => {
  test('Default', () => {
    const { container } = render(
      <RadioButtonGroup label="A" value="a" onChange={vi.fn()}>
        <RadioButton value="option1" label="Option 1" />
      </RadioButtonGroup>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('RadioButtonGroup', () => {
  it('renders the label correctly', () => {
    render(
      <RadioButtonGroup label="Test Label" value="" onChange={vi.fn()}>
        <RadioButton value="option1" label="Option 1" />
      </RadioButtonGroup>,
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders the children correctly', () => {
    render(
      <RadioButtonGroup label="Test Label" value="" onChange={vi.fn()}>
        <RadioButton value="option1" label="Option 1" />
      </RadioButtonGroup>,
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('calls the onChange callback when a RadioButton is selected', async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();

    render(
      <RadioButtonGroup label="Test Label" value="" onChange={mockOnChange}>
        <RadioButton value="option1" label="Option 1" />
      </RadioButtonGroup>,
    );

    const radioButton = screen.getByText('Option 1');
    await user.click(radioButton);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('hides the label correctly', () => {
    render(
      <RadioButtonGroup label="Label that is now hidden" value="" onChange={vi.fn()} hideLabel>
        <RadioButton value="option1" label="Option 1" />
      </RadioButtonGroup>,
    );
    const parentClassList = screen.getByText('Label that is now hidden').classList;
    expect(parentClassList).toContain('ds:hidden');
  });
});
