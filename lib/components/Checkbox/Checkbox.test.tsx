import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox } from './Checkbox';

const label = 'My Checkbox';
const myValue = 'myValue';

describe('Checkbox', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Checkbox name="myCheckbox" label={label} ariaLabel={label} onChange={vi.fn()} value={myValue} checked={false} />,
    );
    const checkbox = screen.getByLabelText(label);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('handles onChange event', () => {
    const handleChange = vi.fn();
    render(
      <Checkbox
        name="myCheckbox"
        label={label}
        ariaLabel={label}
        onChange={handleChange}
        value={myValue}
        checked={false}
        testId="cb"
      />,
    );
    expect(screen.getByTestId('cb')).toBeInTheDocument();
    const checkbox = screen.getByLabelText(label);
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('disables the checkbox', () => {
    render(
      <Checkbox
        name="myCheckbox"
        label={label}
        ariaLabel={label}
        onChange={vi.fn()}
        value={myValue}
        checked={false}
        disabled
      />,
    );
    const checkbox = screen.getByLabelText(label);
    expect(checkbox).toBeDisabled();
  });

  it('checks the checkbox', () => {
    render(
      <Checkbox name="myCheckbox" label={label} ariaLabel={label} onChange={vi.fn()} value={myValue} checked={true} />,
    );
    const checkbox = screen.getByLabelText(label);
    expect(checkbox).toBeChecked();
  });

  it('applies accent color to checked icon when checked', () => {
    const { container } = render(
      <Checkbox name="myCheckbox" label={label} ariaLabel={label} onChange={vi.fn()} value={myValue} checked={true} />,
    );
    const checkedIcon = container.querySelector('svg[data-state="visible"]');
    expect(checkedIcon).toHaveClass('ds:text-accent');
    expect(checkedIcon).toBeVisible();
  });

  it('shows indeterminate icon with accent fill when in indeterminate state', () => {
    const { container } = render(
      <Checkbox
        name="myCheckbox"
        label={label}
        ariaLabel={label}
        onChange={vi.fn()}
        value={myValue}
        checked={false}
        indeterminate={true}
      />,
    );
    const indeterminateIcon = container.querySelector('svg:not([data-state])');
    expect(indeterminateIcon).toHaveClass('ds:fill-accent');
    expect(indeterminateIcon).toBeVisible();
  });
});
