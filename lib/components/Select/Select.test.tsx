import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Select } from './Select';

describe('Select', () => {
  const options = [
    { value: 'fi', label: 'Suomi' },
    { value: 'sv', label: 'Svenska' },
    { value: 'en', label: 'English' },
  ];

  const placeholder = 'placeholder text';

  describe('Snapshot testing', () => {
    it('should render with defaults', () => {
      const { container } = render(<Select label="Label" options={options} placeholder={placeholder} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('should not show label', () => {
      const { container } = render(<Select hideLabel label="Label" options={options} placeholder={placeholder} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('should render as disabled', () => {
      const { container } = render(<Select disabled label="Label" options={options} placeholder={placeholder} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('selected', () => {
    it('should show placeholder', async () => {
      render(<Select label="Label" options={options} placeholder={placeholder} />);
      const select: HTMLButtonElement = screen.getByRole('button');
      expect(select.textContent).toBe(placeholder);
      const user = userEvent.setup();
      await user.click(select);
      expect(screen.getByRole('option', { name: 'Suomi' }).ariaSelected).toBe('false');
      expect(screen.getByRole('option', { name: 'Svenska' }).ariaSelected).toBe('false');
      expect(screen.getByRole('option', { name: 'English' }).ariaSelected).toBe('false');
    });

    it('should select the wanted one', async () => {
      render(<Select label="Label" options={options} placeholder={placeholder} selected="sv" />);
      const select: HTMLButtonElement = screen.getByRole('button');
      expect(select.textContent).toBe('Svenska');
      const user = userEvent.setup();
      await user.click(select);
      expect(screen.getByRole('option', { name: 'Svenska' }).ariaSelected).toBe('true');
    });

    it('should still allow user to another', async () => {
      render(<Select label="Label" options={options} placeholder={placeholder} selected="fi" />);
      const select: HTMLButtonElement = screen.getByRole('button');
      // Click the expand button and select English
      const user = userEvent.setup();
      await user.click(select);
      await user.click(screen.getByRole('option', { name: 'English' }));

      // Assert that the value is English, click the expand button and check that English is selected
      expect(select.textContent).toBe('English');
      await user.click(select);
      expect(screen.getByRole('option', { name: 'English' }).ariaSelected).toBe('true');
    });
  });

  describe('onChange', () => {
    it('is called on user selection', async () => {
      const mockCallback = vi.fn();
      const user = userEvent.setup();

      render(<Select label="Label" options={options} placeholder={placeholder} onChange={mockCallback} />);
      await user.click(screen.getByRole('button'));
      await user.click(screen.getByRole('option', { name: 'English' }));
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });
  });

  describe('label', () => {
    it('should render with label', () => {
      render(<Select label="Label" options={[]} placeholder={placeholder} testId="cb" />);
      expect(screen.getAllByText('Label')).not.toBeNull();
      expect(screen.getByTestId('cb')).toBeInTheDocument();
    });
  });

  describe('hideLabel', () => {
    it('should add aria-label when label is hidden', () => {
      render(<Select label="Non-visible label" options={[]} hideLabel={true} placeholder={placeholder} />);
      expect(screen.getByRole('button', { name: 'Non-visible label' })).not.toBeNull();
    });
  });
});
