import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import { ProgressIndicatorCard } from './ProgressIndicatorCard';

test('renders ProgressIndicatorCard', () => {
  const { container } = render(<ProgressIndicatorCard testId="pic" />);
  expect(container.querySelector('[data-testid="pic"]')).toBeInTheDocument();
  expect(container.firstChild).toMatchSnapshot();
});
