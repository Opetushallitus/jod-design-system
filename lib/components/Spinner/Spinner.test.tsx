import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';

import { Spinner } from './Spinner';

describe('Spinner Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Spinner size={24} color="white" testId="spinner" />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(container).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Spinner size={24} color="white" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('is decorative and hidden from assistive technology', () => {
    render(<Spinner size={24} color="white" testId="spinner" />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toHaveAttribute('aria-hidden', 'true');
  });

  it('has an accessible name when label is given', () => {
    render(<Spinner size={24} color="white" label="Ladataan" testId="spinner" />);
    expect(screen.getByRole('img', { name: 'Ladataan' })).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).not.toHaveAttribute('aria-hidden');
  });

  it('spins slower when the user prefers reduced motion', () => {
    render(<Spinner size={24} color="white" testId="spinner" />);
    expect(screen.getByTestId('spinner')).toHaveClass('ds:motion-reduce:animate-[spin_3s_linear_infinite]');
  });

  it('has no a11y violations', async () => {
    const { container } = render(<Spinner size={24} color="white" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no a11y violations with label', async () => {
    const { container } = render(<Spinner size={24} color="white" label="Ladataan" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
