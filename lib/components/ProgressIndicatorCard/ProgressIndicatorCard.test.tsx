import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
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
