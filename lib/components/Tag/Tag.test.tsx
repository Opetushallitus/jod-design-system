import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Tag } from './Tag';

describe('Snapshot testing', () => {
  it('matches the snapshot', () => {
    const { container } = render(<Tag label="Label here" onClick={vi.fn()} />);
    expect(container).toMatchSnapshot();
  });
});

describe('Tag', () => {
  it('renders the label correctly', () => {
    const label = 'Test Label';
    const { getByText } = render(<Tag label={label} onClick={vi.fn()} />);
    expect(getByText(label)).toBeInTheDocument();
  });

  it('calls the onClick function when clicked', () => {
    const onClick = vi.fn();
    const { getByRole } = render(<Tag label="onClick testing" onClick={onClick} />);
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders the "add" symbol when variant is "selectable"', () => {
    const { getByText } = render(<Tag label="Selectable" variant="selectable" onClick={vi.fn()} />);
    expect(getByText('add')).toBeInTheDocument();
  });

  it('renders the "close" symbol when variant is "added"', () => {
    const { getByText } = render(<Tag label="Added" variant="added" onClick={vi.fn()} />);
    expect(getByText('close')).toBeInTheDocument();
  });
});
