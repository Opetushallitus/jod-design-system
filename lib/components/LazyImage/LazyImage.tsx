import React from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** The source of the image to be loaded */
  src: string;
  /** The alt text for the image */
  alt: string;
  testId?: string;
}

/**
 * LazyImage is a lazy loading image component that preloads the image before displaying it.
 */
export const LazyImage: React.FC<LazyImageProps> = ({ src, alt, ...props }) => {
  const [loaded, setLoaded] = React.useState(false);
  const [isCached, setIsCached] = React.useState(false);

  React.useEffect(() => {
    const img = new Image();
    img.src = src;
    if (img.complete) {
      setIsCached(true);
      setLoaded(true);
    } else {
      img.onload = () => setLoaded(true);
    }
    img.onload = () => setLoaded(true);
  }, [src]);

  return (
    <div className={`ds:flex ds:bg-secondary-5 ${props.className}`.trim()} data-testid={props.testId}>
      <img
        src={loaded ? src : undefined}
        alt={alt}
        style={{ opacity: loaded ? 1 : 0, transition: isCached ? 'none' : 'opacity 0.3s' }}
        className="ds:w-full ds:h-full ds:object-cover"
      />
    </div>
  );
};
