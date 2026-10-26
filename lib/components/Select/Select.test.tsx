// oxlint-disable vitest/require-mock-type-parameters
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { axe } from 'jest-axe';
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

      const user = userEvent.setup();
      await user.click(select);
      await user.click(screen.getByRole('option', { name: 'English' }));

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
      expect(screen.getByTestId('cb-field')).toBeInTheDocument();
      expect(screen.getByTestId('cb-label')).toBeInTheDocument();
      expect(screen.getByTestId('cb-button')).toBeInTheDocument();
    });

    it('should associate the label with the button', () => {
      render(<Select label="Label" options={[]} placeholder={placeholder} testId="cb" />);
      expect(screen.getByTestId('cb-label')).toHaveAttribute('for', screen.getByTestId('cb-button').id);
    });
  });

  // jsdom's name computation drops the button's own content from aria-labelledby when a <label for> points at
  // the button, unlike browsers, so these tests check the aria-labelledby wiring instead of the computed name.
  describe('hideLabel', () => {
    it('should label the button with the hidden label', () => {
      render(<Select label="Non-visible label" options={[]} hideLabel={true} placeholder={placeholder} testId="cb" />);
      const label = screen.getByTestId('cb-label');
      const select = screen.getByRole('button');
      expect(label).toHaveTextContent('Non-visible label');
      expect(select).toHaveAttribute('aria-labelledby', `${label.id} ${select.id}`);
    });
  });

  describe('accessible name', () => {
    it('should be labelled by the label and the placeholder', () => {
      render(<Select label="Label" options={options} placeholder={placeholder} testId="cb" />);
      const select = screen.getByRole('button');
      expect(select).toHaveAttribute('aria-labelledby', `${screen.getByTestId('cb-label').id} ${select.id}`);
      expect(select).toHaveTextContent(placeholder);
    });

    it('should be labelled by the label and the selected value', async () => {
      render(<Select label="Label" options={options} placeholder={placeholder} selected="fi" testId="cb" />);
      const select = screen.getByRole('button');
      expect(select).toHaveAttribute('aria-labelledby', `${screen.getByTestId('cb-label').id} ${select.id}`);
      expect(select).toHaveTextContent('Suomi');

      const user = userEvent.setup();
      await user.click(select);
      await user.click(screen.getByRole('option', { name: 'English' }));
      expect(select).toHaveTextContent('English');
    });
  });

  describe('accessible description', () => {
    it('should not have a description without help or error', () => {
      render(<Select label="Label" options={options} placeholder={placeholder} />);
      expect(screen.getByRole('button')).not.toHaveAttribute('aria-describedby');
    });

    it('should be described by the help text', () => {
      render(<Select label="Label" options={options} placeholder={placeholder} help="Help text" />);
      expect(screen.getByRole('button')).toHaveAccessibleDescription('Help text');
    });

    it('should be described by the error message', () => {
      render(<Select label="Label" options={options} placeholder={placeholder} errorMessage="Error text" />);
      expect(screen.getByRole('button')).toHaveAccessibleDescription('Error text');
    });

    it('should be described by both the help text and the error message', () => {
      render(
        <Select label="Label" options={options} placeholder={placeholder} help="Help text" errorMessage="Error text" />,
      );
      expect(screen.getByRole('button')).toHaveAccessibleDescription('Help text Error text');
    });
  });

  it('has no a11y violations', async () => {
    const { container } = render(<Select label="Non-visible label" options={[]} hideLabel placeholder={placeholder} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no a11y violations with a visible label, help text and error message', async () => {
    const { container } = render(
      <Select
        label="Label"
        options={options}
        placeholder={placeholder}
        selected="sv"
        help="Help text"
        errorMessage="Error text"
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
