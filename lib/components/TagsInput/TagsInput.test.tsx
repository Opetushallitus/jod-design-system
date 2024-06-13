import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TagsInput } from './TagsInput';

describe('Snapshot testing', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <TagsInput label="Label here" placeholder="Placeholder" tags={['cat', 'bird', 'dog']} onValueChange={vi.fn()} />,
    );
    expect(container).toMatchSnapshot();
  });
});

describe('TagsInput', () => {
  it('renders the label', () => {
    const label = 'Test Label';
    render(<TagsInput label={label} placeholder="Placeholder" tags={['cat', 'bird', 'dog']} onValueChange={vi.fn()} />);
    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();
  });

  it('renders the placeholder', () => {
    const placeholder = 'Test Placeholder';
    render(
      <TagsInput label="Test Label" placeholder={placeholder} tags={['cat', 'bird', 'dog']} onValueChange={vi.fn()} />,
    );
    const inputElement = screen.getByPlaceholderText(`(${placeholder})`);
    expect(inputElement).toBeInTheDocument();
  });
});
