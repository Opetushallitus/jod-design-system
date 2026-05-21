import { JSX } from 'react';

import { cx } from '../../cva';
import { useNoteStack } from '../NavigationBar';

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
  const { permanentNotesHeight } = useNoteStack();
  // NavigationBar + closed service bar (border) + permanent notes + main padding
  const scrollMarginTop = `${64 + 4 + permanentNotesHeight + 64}px`;

  return (
    <div className={cx('ds:flex ds:gap-3', className)}>
      <HeadingTag
        id={id ?? title}
        className="ds:text-pretty ds:hyphens-auto"
        style={{
          scrollMarginTop,
        }}
      >
        {`${title}${appendixText}`}
      </HeadingTag>
    </div>
  );
};
