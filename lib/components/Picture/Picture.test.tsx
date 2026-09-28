import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';

import { type PictureData, Picture, pictureToImageSet } from './Picture';

const picture: PictureData = {
  sources: [
    { srcSet: '/a-480.avif 480w, /a-960.avif 960w', type: 'image/avif' },
    { srcSet: '/a-480.webp 480w, /a-960.webp 960w', type: 'image/webp' },
  ],
  img: { src: '/a-960.jpg', w: 960, h: 540 },
};

describe('Picture', () => {
  it('renders a source per format and the fallback image', () => {
    const { container } = render(<Picture picture={picture} alt="test image" sizes="100vw" testId="picture" />);
    const sources = container.querySelectorAll('source');
    expect(sources).toHaveLength(2);
    expect(sources[0]).toHaveAttribute('type', 'image/avif');
    expect(sources[0]).toHaveAttribute('srcset', picture.sources[0].srcSet);
    expect(sources[0]).toHaveAttribute('sizes', '100vw');
    expect(sources[1]).toHaveAttribute('type', 'image/webp');
    expect(sources[1]).toHaveAttribute('srcset', picture.sources[1].srcSet);
    expect(sources[1]).toHaveAttribute('sizes', '100vw');

    const img = screen.getByTestId('picture');
    expect(img).toHaveAttribute('src', '/a-960.jpg');
    expect(img).toHaveAttribute('width', '960');
    expect(img).toHaveAttribute('height', '540');
    expect(img).toHaveAttribute('alt', 'test image');
  });

  it('lazy loads by default', () => {
    render(<Picture picture={picture} alt="test image" />);
    const img = screen.getByAltText('test image');
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('decoding', 'async');
  });

  it('passes img attributes through', () => {
    render(<Picture picture={picture} alt="test image" loading="eager" fetchPriority="high" className="w-full" />);
    const img = screen.getByAltText('test image');
    expect(img).toHaveAttribute('loading', 'eager');
    expect(img).toHaveAttribute('fetchpriority', 'high');
    expect(img).toHaveClass('w-full');
  });

  it('has no a11y violations', async () => {
    const { container } = render(<Picture picture={picture} alt="test image" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  describe('pictureToImageSet', () => {
    it('uses the largest candidate of each format and the fallback last', () => {
      expect(pictureToImageSet(picture)).toBe(
        'image-set(url("/a-960.avif") type("image/avif"), url("/a-960.webp") type("image/webp"), url("/a-960.jpg"))',
      );
    });
  });
});
