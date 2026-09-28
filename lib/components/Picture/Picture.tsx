import React from 'react';

interface PictureSource {
  srcSet: string;
  type: string;
  sizes?: string;
  media?: string;
}

/**
 * An image available in several formats and widths.
 */
export interface PictureData {
  /** Key is the image format (e.g. `avif`) if type is not present in value, value is its srcset */
  sources: PictureSource[];
  /** The fallback image */
  img: {
    src: string;
    w: number;
    h: number;
  };
}

export interface PictureProps extends Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'srcSet' | 'width' | 'height'
> {
  /** The image in its available formats and widths */
  picture: PictureData;
  /** The alt text for the image */
  alt: string;
  /** Tells the browser the rendered width of the image, e.g. `(min-width: 1024px) 752px, 100vw` */
  sizes?: string;
  testId?: string;
}

/**
 * Picture renders an image as `<picture>` with a `<source>` per format,
 * so the browser picks the smallest format and width it supports.
 */
export const Picture = ({
  picture,
  alt,
  sizes,
  testId,
  loading = 'lazy',
  decoding = 'async',
  ...rest
}: PictureProps) => (
  <picture className="ds:contents">
    {picture.sources.map(({ srcSet, type, sizes: sourceSizes, media }) => (
      <source key={srcSet} type={type} srcSet={srcSet} sizes={sourceSizes ?? sizes} media={media} />
    ))}
    <img
      {...rest}
      src={picture.img.src}
      width={picture.img.w}
      height={picture.img.h}
      alt={alt}
      loading={loading}
      decoding={decoding}
      data-testid={testId}
    />
  </picture>
);

/**
 * Converts a picture into a CSS `image-set()` value for background images.
 * Uses the largest candidate of each format.
 */
export const pictureToImageSet = ({ sources, img }: PictureData) => {
  const candidates = sources.map(({ srcSet, type }) => {
    const url = srcSet.split(', ').at(-1)?.split(' ')[0];
    return `url("${url}") type("${type}")`;
  });
  const fallback = `url("${img.src}")`;
  return `image-set(${[...candidates, fallback].join(', ')})`;
};
