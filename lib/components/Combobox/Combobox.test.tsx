import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Combobox } from './Combobox';

describe('Combobox', () => {
  const options = [
    { value: 'fi', label: 'Suomi' },
    { value: 'sv', label: 'Svenska' },
    { value: 'en', label: 'English' },
  ];

  const placeholder = 'placeholder text';

  describe('Snapshot testing', () => {
    it('should render with defaults', () => {
      const { container } = render(<Combobox label="Label" options={options} placeholder={placeholder} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('should not show label', () => {
      const { container } = render(<Combobox hideLabel label="Label" options={options} placeholder={placeholder} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('should render as disabled', () => {
      const { container } = render(<Combobox disabled label="Label" options={options} placeholder={placeholder} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('defaultValue', () => {
    it('should select first by default', async () => {
      render(<Combobox label="Label" options={options} placeholder={placeholder} />);
      const input: HTMLInputElement = screen.getByRole('combobox');
      expect(input.value).toBe('Suomi');
      const user = userEvent.setup();
      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('option', { name: 'Suomi' }).ariaSelected).toBe('true');
    });

    it('should select the wanted one', async () => {
      render(<Combobox label="Label" options={options} placeholder={placeholder} defaultValue="sv" />);
      const input: HTMLInputElement = screen.getByRole('combobox');
      expect(input.value).toBe('Svenska');
      const user = userEvent.setup();
      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('option', { name: 'Svenska' }).ariaSelected).toBe('true');
    });

    it('should still allow user to another', async () => {
      render(<Combobox label="Label" options={options} placeholder={placeholder} defaultValue="fi" />);
      const input: HTMLInputElement = screen.getByRole('combobox');
      // Click the expand button and select English
      const user = userEvent.setup();
      await user.click(screen.getByRole('button'));
      await user.click(screen.getByRole('option', { name: 'English' }));

      // Assert that the value is English, click the expand button and check that English is selected
      expect(input.value).toBe('English');
      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('option', { name: 'English' }).ariaSelected).toBe('true');
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

      render(<Combobox label="Label" options={options} placeholder={placeholder} onChange={mockCallback} />);
      await user.click(screen.getByRole('button'));
      await user.click(screen.getByRole('option', { name: 'English' }));
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });
  });

  describe('label', () => {
    it('should render with label', () => {
      render(<Combobox label="Label" options={[]} placeholder={placeholder} testId="cb" />);
      expect(screen.getAllByText('Label')).not.toBeNull();
      expect(screen.getByTestId('cb')).toBeInTheDocument();
    });
  });

  describe('hideLabel', () => {
    it('should add aria-label when label is hidden', () => {
      render(<Combobox label="Non-visible label" options={[]} hideLabel={true} placeholder={placeholder} />);
      expect(screen.getByRole('combobox', { name: 'Non-visible label' })).not.toBeNull();
    });
  });
});
