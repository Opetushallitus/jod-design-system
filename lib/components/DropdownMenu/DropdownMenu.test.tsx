import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DropdownMenu } from './DropdownMenu';

const options = [
  { value: 'fi', label: 'Suomi' },
  { value: 'sv', label: 'Svenska' },
  { value: 'en', label: 'English' },
];

describe('Snapshot testing', () => {
  it('should render with defaults', () => {
    const { container } = render(<DropdownMenu label="Label" options={options} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should not show label', () => {
    const { container } = render(<DropdownMenu hideLabel={true} label="Label" options={options} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render as disabled', () => {
    const { container } = render(<DropdownMenu disabled={true} label="Label" options={options} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('defaultValue', () => {
  it('should select first by default', () => {
    render(<DropdownMenu label="Label" options={options} />);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    expect((screen.getByRole('option', { name: 'Suomi' }) as HTMLOptionElement).selected).toBe(true);
  });

  it('should select the wanted one', () => {
    render(<DropdownMenu label="Label" options={options} defaultValue="sv" />);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    expect((screen.getByRole('option', { name: 'Svenska' }) as HTMLOptionElement).selected).toBe(true);
    //
  });

  it('should still allow user to another', async () => {
    render(<DropdownMenu label="Label" options={options} defaultValue="fi" />);
    const user = userEvent.setup();
    await user.selectOptions(screen.getByRole('combobox'), 'English');

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    expect((screen.getByRole('option', { name: 'English' }) as HTMLOptionElement).selected).toBe(true);
  });
});

describe('onChange', () => {
  const options = [
    { value: 'fi', label: 'Suomi' },
    { value: 'sv', label: 'Svenska' },
    { value: 'en', label: 'English' },
  ];

  it('is called on user selection', async () => {
    const mockCallback = vi.fn();
    const user = userEvent.setup();

    render(<DropdownMenu label="Label" options={options} onChange={mockCallback} />);

    await user.selectOptions(screen.getByRole('combobox'), 'English');
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('is not called when disabled', async () => {
    const mockCallback = vi.fn();
    const user = userEvent.setup();

    render(<DropdownMenu label="Label" options={options} onChange={mockCallback} disabled={true} />);

    await user.selectOptions(screen.getByRole('combobox'), 'English');
    expect(mockCallback).toHaveBeenCalledTimes(0);
  });
});

describe('label', () => {
  it('should render with label', () => {
    render(<DropdownMenu label="Label" options={[]} />);
    expect(screen.getByLabelText('Label')).not.toBeNull();
  });
});

describe('hideLabel', () => {
  it('should add aria-label when label is hidden', () => {
    render(<DropdownMenu label="Non-visible label" options={[]} hideLabel={true} />);
    expect(screen.getByRole('combobox', { name: 'Non-visible label' })).not.toBeNull();
  });
});
