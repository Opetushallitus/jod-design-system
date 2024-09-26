import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import { ProgressIndicatorCard } from './ProgressIndicatorCard';

test('renders ProgressIndicatorCard', () => {
  const { container } = render(<ProgressIndicatorCard />);
  expect(container.firstChild).toMatchSnapshot();
});
