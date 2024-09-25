import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
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

  it('should not be a button and no icons are present when using presentation variant', () => {
    const { container, queryByRole } = render(<Tag label="presentation" variant="presentation" />);
    expect(queryByRole('button')).toBeNull();
    expect(container.querySelector('svg')).toBeNull();
  });
});
