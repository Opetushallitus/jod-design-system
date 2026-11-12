import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { ProgressIndicatorCard } from './ProgressIndicatorCard';

test('renders ProgressIndicatorCard', () => {
  const { container } = render(<ProgressIndicatorCard testId="pic" />);
  expect(container.querySelector('[data-testid="pic"]')).toBeInTheDocument();
  expect(container.firstChild).toMatchSnapshot();
});

test('exposes the label to screen readers in a status region', () => {
  render(<ProgressIndicatorCard label="Ladataan tuloksia" />);
  expect(screen.getByRole('status')).toHaveTextContent('Ladataan tuloksia');
});
