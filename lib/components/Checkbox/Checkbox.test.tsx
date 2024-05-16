import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Checkbox } from './Checkbox';

const label = 'My Checkbox';
const myValue = 'myValue';

describe('Checkbox', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Checkbox name="myCheckbox" label={label} onChange={vi.fn} value={myValue} checked={false} />,
    );
    const checkbox = screen.getByLabelText(label);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('handles onChange event', () => {
    const handleChange = vi.fn();
    render(<Checkbox name="myCheckbox" label={label} onChange={handleChange} value={myValue} checked={false} />);
    const checkbox = screen.getByLabelText(label);
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('disables the checkbox', () => {
    render(<Checkbox name="myCheckbox" label={label} onChange={vi.fn} value={myValue} checked={false} disabled />);
    const checkbox = screen.getByLabelText(label);
    expect(checkbox).toBeDisabled();
  });

  it('checks the checkbox', () => {
    render(<Checkbox name="myCheckbox" label={label} onChange={vi.fn} value={myValue} checked={true} />);
    const checkbox = screen.getByLabelText(label);
    expect(checkbox).toBeChecked();
  });
});
