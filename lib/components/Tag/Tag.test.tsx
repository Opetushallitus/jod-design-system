// oxlint-disable vitest/require-mock-type-parameters
import { fireEvent, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';

import { Tag } from './Tag';

describe('Tag', () => {
  it('matches the snapshot', () => {
    const { container } = render(<Tag label="Label here" onClick={vi.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it('renders the label correctly', () => {
    const label = 'Test Label';
    const { getByText } = render(<Tag label={label} onClick={vi.fn()} testId="tag1" />);
    expect(document.querySelector('[data-testid="tag1"]')).toBeInTheDocument();
    expect(getByText(label)).toBeInTheDocument();
  });

  it('calls the onClick function when clicked', () => {
    const onClick = vi.fn();
    const { getByRole } = render(<Tag label="onClick testing" onClick={onClick} testId="tag2" />);
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should have cursor-pointer class when variant is not presentation', () => {
    const { container } = render(<Tag label="selectable" variant="selectable" onClick={vi.fn()} />);
    const tagElement = container.firstChild;
    expect(tagElement).toHaveClass('ds:cursor-pointer');
  });

  it('should not have cursor-pointer class when variant is presentation', () => {
    const { container } = render(<Tag label="presentation" variant="presentation" />);
    const tagElement = container.firstChild;
    expect(tagElement).not.toHaveClass('ds:cursor-pointer');
  });

  it('should have cursor-pointer class by default (when variant not specified)', () => {
    const { container } = render(<Tag label="default" onClick={vi.fn()} />);
    const tagElement = container.firstChild;
    expect(tagElement).toHaveClass('ds:cursor-pointer');
  });

  it.each([
    ['tyopaikka', 'added', 'ds:border-primary-4-light-1', 'ds:bg-primary-4-light-1'],
    ['koulutus', 'added', 'ds:border-primary-2-light-1', 'ds:bg-primary-2-light-1'],
    ['vapaa-ajan-teema', 'added', 'ds:border-primary-1-light-1', 'ds:bg-primary-1-light-1'],
    ['jotain-muuta', 'added', 'ds:border-primary-5-light-2', 'ds:bg-primary-5-light-2'],
    ['kiinnostus', 'added', 'ds:border-primary-3-light-1', 'ds:bg-primary-3-light-1'],
    ['tyopaikka', 'selectable', 'ds:border-primary-4-light-2', 'ds:bg-primary-4-light-2'],
    ['koulutus', 'selectable', 'ds:border-primary-2-light-2', 'ds:bg-primary-2-light-2'],
    ['vapaa-ajan-teema', 'selectable', 'ds:border-primary-1-light-2', 'ds:bg-primary-1-light-2'],
    ['jotain-muuta', 'selectable', 'ds:border-bg-gray-2', 'ds:bg-bg-gray-2'],
    ['kiinnostus', 'selectable', 'ds:border-primary-3-light-2', 'ds:bg-primary-3-light-2'],
  ] as const)(
    'renders a hollow %s %s tag with the corresponding border color',
    (sourceType, variant, borderClass, backgroundClass) => {
      const { getByRole } = render(
        <Tag label="hollow" sourceType={sourceType} variant={variant} hollow onClick={vi.fn()} />,
      );

      expect(getByRole('button')).toHaveClass('ds:border-2', 'ds:bg-white', 'ds:px-[10px]', 'ds:py-[2px]', borderClass);
      expect(getByRole('button')).not.toHaveClass('ds:px-4', 'ds:py-2');
      expect(getByRole('button')).not.toHaveClass(backgroundClass);
    },
  );

  it('has no a11y violations', async () => {
    const { container } = render(<Tag label="Label here" onClick={vi.fn()} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
