import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ActiveIndicator } from './ActiveIndicator';

describe('ActiveIndicator', () => {
  it('renders the ActiveIndicator component correctly', () => {
    const { container } = render(<ActiveIndicator />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('height', '15');
    expect(svgElement).toHaveAttribute('width', '15');
    expect(container.firstChild).toMatchSnapshot();
  });
});
