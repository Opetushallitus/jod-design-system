import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LazyImage } from './LazyImage';

describe('LazyImage', () => {
  it('renders without crashing', () => {
    render(<LazyImage src="test.jpg" alt="test image" />);
    const imgElement = screen.getByAltText('test image');
    expect(imgElement).toBeInTheDocument();
  });

  it('sets the alt attribute correctly', () => {
    render(<LazyImage src="test.jpg" alt="test image" />);
    const imgElement = screen.getByAltText('test image');
    expect(imgElement).toHaveAttribute('alt', 'test image');
  });

  it('applies the correct styles when the image is not loaded', () => {
    render(<LazyImage src="test.jpg" alt="test image" />);
    const imgElement = screen.getByAltText('test image');
    expect(imgElement).toHaveStyle('opacity: 0');
  });
});
