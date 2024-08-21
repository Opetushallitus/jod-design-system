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
    className="material-symbols-outlined size-32 ds-select-none ds-text-secondary-gray group-hover:!ds-text-accent"
    aria-hidden
  >
    {isOpen ? 'expand_less' : 'expand_more'}
  </span>
);

export const Accordion = ({ title, children, expandLessText, expandMoreText, lang, underline }: AccordionProps) => {
  const [isOpen, setIsOpen] = React.useState(INITIAL_STATE);
  const toggleOpen = () => setIsOpen(!isOpen);
  const isTitleValidElement = React.isValidElement(title);
  const wrapperClassnames = cx(
    'ds-flex ds-w-full ds-items-center ds-justify-between ds-gap-x-4 ds-mb-2 group-hover:!ds-text-accent',
    {
      'ds-border-b ds-border-border-gray': underline,
    },
  );

  // Reset the state when the children change
  React.useEffect(() => {
    setIsOpen(INITIAL_STATE);
  }, [children]);

  return (
    <>
      {isTitleValidElement ? (
        <div className={wrapperClassnames}>
          {title}
          <button aria-label={isOpen ? expandLessText : expandMoreText} onClick={toggleOpen} className="ds-flex">
            <Caret isOpen={isOpen} />
          </button>
        </div>
      ) : (
        <div className="ds-group">
          <button
            aria-label={isOpen ? expandLessText : expandMoreText}
            onClick={toggleOpen}
            className={wrapperClassnames}
          >
            <span
              className="ds-mr-5 ds-w-full ds-text-left ds-hyphens-auto ds-text-heading-3 group-hover:ds-underline"
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
