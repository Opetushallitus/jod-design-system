import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Tag } from './Tag';

describe('Tag', () => {
  it('matches the snapshot', () => {
    const { container } = render(<Tag label="Label here" onClick={vi.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it('renders the label correctly', () => {
    const label = 'Test Label';
    const { getByText } = render(<Tag label={label} onClick={vi.fn()} dataTestId="tag1" />);
    expect(document.querySelector('[data-testid="tag1"]')).toBeInTheDocument();
    expect(getByText(label)).toBeInTheDocument();
  });

  it('calls the onClick function when clicked', () => {
    const onClick = vi.fn();
    const { getByRole } = render(<Tag label="onClick testing" onClick={onClick} dataTestId="tag2" />);
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should not be a button and no icons are present when using presentation variant', () => {
    const { container, queryByRole } = render(<Tag label="presentation" variant="presentation" dataTestId="tag3" />);
    expect(document.querySelector('[data-testid="tag3"]')).toBeInTheDocument();
    expect(queryByRole('button')).toBeNull();
    expect(container.querySelector('svg')).toBeNull();
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
});
