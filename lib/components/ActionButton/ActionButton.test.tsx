import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';

import { JodPrint, JodShare } from '../../icons';
import { ActionButton } from './ActionButton';

describe('ActionButton', () => {
  const onClick = vi.fn<() => void>();

  it('matches the snapshot', () => {
    const { container } = render(
      <ActionButton label="Print" icon={<JodPrint className="ds:text-accent" />} onClick={onClick} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders the label correctly', () => {
    render(<ActionButton label="Jaa" icon={<JodShare className="ds:text-accent" />} onClick={onClick} />);
    expect(screen.getByText('Jaa')).not.toBeNull();
  });

  it('calls the onClick funtion when pressed', () => {
    render(<ActionButton label="Jaa" icon={<JodShare className="ds:text-accent" />} onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('adds the custom classname correctly', () => {
    render(
      <ActionButton
        className="added-classname"
        label="Jaa"
        icon={<JodShare className="ds:text-accent" />}
        onClick={onClick}
      />,
    );
    expect(screen.getByRole('button')).toHaveClass('added-classname');
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <ActionButton label="Print" icon={<JodPrint className="ds:text-accent" />} onClick={onClick} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
