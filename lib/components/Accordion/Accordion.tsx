import React from 'react';
import { cx } from '../../cva';

interface AccordionProps {
  title: React.ReactNode | string;
  children: React.ReactNode;
  expandLessText: string;
  expandMoreText: string;
  lang: string;
  underline?: boolean;
}

const INITIAL_STATE = true;

const Caret = ({ isOpen }: { isOpen: boolean }) => (
  <span
    className="material-symbols-outlined size-32 select-none text-secondary-gray group-hover:!text-accent"
    aria-hidden
  >
    {isOpen ? 'expand_less' : 'expand_more'}
  </span>
);

export const Accordion = ({ title, children, expandLessText, expandMoreText, lang, underline }: AccordionProps) => {
  const [isOpen, setIsOpen] = React.useState(INITIAL_STATE);
  const toggleOpen = () => setIsOpen(!isOpen);
  const isTitleValidElement = React.isValidElement(title);
  const wrapperClassnames = cx('flex w-full items-center justify-between gap-x-4 mb-2 group-hover:!text-accent', {
    'border-b border-border-gray': underline,
  });

  // Reset the state when the children change
  React.useEffect(() => {
    setIsOpen(INITIAL_STATE);
  }, [children]);

  return (
    <>
      {isTitleValidElement ? (
        <div className={wrapperClassnames}>
          {title}
          <button aria-label={isOpen ? expandLessText : expandMoreText} onClick={toggleOpen} className="flex">
            <Caret isOpen={isOpen} />
          </button>
        </div>
      ) : (
        <div className="group">
          <button
            aria-label={isOpen ? expandLessText : expandMoreText}
            onClick={toggleOpen}
            className={wrapperClassnames}
          >
            <span
              className="mr-5 w-full text-left hyphens-auto text-heading-3 font-poppins group-hover:underline"
              lang={lang}
            >
              {title}
            </span>
            <Caret isOpen={isOpen} />
          </button>
        </div>
      )}
      {isOpen && children}
    </>
  );
};
