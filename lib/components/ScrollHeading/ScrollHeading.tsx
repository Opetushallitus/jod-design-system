import { JSX } from 'react';

import { cx } from '../../cva';

interface ScrollHeadingProps {
  title: string;
  id?: string;
  heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  className: string;
  appendix?: string;
}

export const ScrollHeading = ({ title, id, heading, className, appendix }: ScrollHeadingProps) => {
  const HeadingTag = heading as keyof JSX.IntrinsicElements;
  const appendixText = appendix ? ` — ${appendix}` : '';

  return (
    <div className={cx('ds:flex ds:gap-3', className)}>
      <HeadingTag
        id={id ?? title}
        // Sticky header height is reserved with scroll-padding-top by NavigationBar, this adds the main padding
        className="ds:text-pretty ds:hyphens-auto ds:scroll-mt-4"
      >
        {`${title}${appendixText}`}
      </HeadingTag>
    </div>
  );
};
