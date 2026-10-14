import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { expect, test } from 'vitest';

import { ProgressIndicatorCard } from './ProgressIndicatorCard';

test('renders ProgressIndicatorCard', () => {
  const { container } = render(<ProgressIndicatorCard testId="pic" />);
  expect(container.querySelector('[data-testid="pic"]')).toBeInTheDocument();
  expect(container.firstChild).toMatchSnapshot();
});

it('has no a11y violations', async () => {
  const { container } = render(<ProgressIndicatorCard />);
  expect(await axe(container)).toHaveNoViolations();
});

it('exposes the label to screen readers in a status region', () => {
  render(<ProgressIndicatorCard label="Ladataan tuloksia" />);
  expect(screen.getByRole('status')).toHaveTextContent('Ladataan tuloksia');
});

it('has no a11y violations with label', async () => {
  const { container } = render(<ProgressIndicatorCard label="Ladataan tuloksia" />);
  expect(await axe(container)).toHaveNoViolations();
});
