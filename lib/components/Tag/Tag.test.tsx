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
    ['tyopaikka', 'added', 'ds:ring-primary-4-light-1', 'ds:bg-primary-4-light-1'],
    ['koulutus', 'added', 'ds:ring-primary-2-light-1', 'ds:bg-primary-2-light-1'],
    ['vapaa-ajan-teema', 'added', 'ds:ring-primary-1-light-1', 'ds:bg-primary-1-light-1'],
    ['jotain-muuta', 'added', 'ds:ring-primary-5-light-2', 'ds:bg-primary-5-light-2'],
    ['kiinnostus', 'added', 'ds:ring-primary-3-light-1', 'ds:bg-primary-3-light-1'],
    ['tyopaikka', 'selectable', 'ds:ring-primary-4-light-2', 'ds:bg-primary-4-light-2'],
    ['koulutus', 'selectable', 'ds:ring-primary-2-light-2', 'ds:bg-primary-2-light-2'],
    ['vapaa-ajan-teema', 'selectable', 'ds:ring-primary-1-light-2', 'ds:bg-primary-1-light-2'],
    ['jotain-muuta', 'selectable', 'ds:ring-bg-gray-2', 'ds:bg-bg-gray-2'],
    ['kiinnostus', 'selectable', 'ds:ring-primary-3-light-2', 'ds:bg-primary-3-light-2'],
  ] as const)(
    'renders a hollow %s %s tag with the corresponding ring color',
    (sourceType, variant, ringClass, backgroundClass) => {
      const { getByRole } = render(
        <Tag label="hollow" sourceType={sourceType} variant={variant} hollow onClick={vi.fn()} />,
      );

      expect(getByRole('button')).toHaveClass(
        'ds:bg-white',
        'ds:ring-2',
        'ds:ring-inset',
        'ds:px-4',
        'ds:py-2',
        ringClass,
      );
      expect(getByRole('button')).not.toHaveClass(backgroundClass);
    },
  );

  it('has no a11y violations', async () => {
    const { container } = render(<Tag label="Label here" onClick={vi.fn()} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
