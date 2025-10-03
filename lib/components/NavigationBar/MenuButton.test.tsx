import { fireEvent, render, screen } from '@testing-library/react';
import { fn } from 'storybook/test';
import { describe, expect, it, vi } from 'vitest';
import { MenuButton } from './MenuButton';

describe('MenuButton', () => {
  it('renders the label text', () => {
    render(<MenuButton label="Valikko" onClick={fn()} />);
    expect(screen.getByText('Valikko')).toBeInTheDocument();
  });

  it('calls onClick when button is clicked', () => {
    const handler = vi.fn();
    render(<MenuButton label="Click me" onClick={handler} />);
    fireEvent.click(screen.getByTestId('open-nav-menu'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('has required accessibility and test attributes', () => {
    render(<MenuButton label="Menu" onClick={fn()} />);
    const btn = screen.getByTestId('open-nav-menu');
    expect(btn).toHaveAttribute('aria-haspopup', 'dialog');
  });
});
describe('Snapshot', () => {
  it('should render with defaults', () => {
    const { container } = render(<MenuButton label="Valikko" onClick={fn()} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
