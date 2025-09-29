import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SkipLink } from './SkipLink';

describe('SkipLink', () => {
  it('renders the label correctly', () => {
    const label = 'Skip to main content';
    const { getByText } = render(<SkipLink label={label} hash={'#'} dataTestId="skip" />);
    expect(document.querySelector('[data-testid="skip"]')).toBeInTheDocument();
    expect(getByText(label)).toBeInTheDocument();
  });

  it('renders the component correctly', () => {
    const label = 'Skip to main content';
    const { container } = render(<SkipLink label={label} hash={'#'} dataTestId="skip2" />);
    expect(document.querySelector('[data-testid="skip2"]')).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
