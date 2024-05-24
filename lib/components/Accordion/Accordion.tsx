import { isValidElement, useEffect, useState } from 'react';

interface AccordionProps {
  title: React.ReactNode | string;
  children: React.ReactNode;
  expandLessText: string;
  expandMoreText: string;
  lang: string;
}

const INITIAL_STATE = true;

export const Accordion = ({ title, children, expandLessText, expandMoreText, lang }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(INITIAL_STATE);
  const isTitleValidElement = isValidElement(title);

  // Reset the state when the children change
  useEffect(() => {
    setIsOpen(INITIAL_STATE);
  }, [children]);

  return (
    <>
      {isTitleValidElement ? (
        <div className="flex w-full items-center justify-between gap-x-4">
          {title}
          <button
            aria-label={isOpen ? expandLessText : expandMoreText}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="flex"
          >
            <span className="material-symbols-outlined size-32 m-[-5px] select-none font-bold" aria-hidden>
              {isOpen ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        </div>
      ) : (
        <button
          aria-label={isOpen ? expandLessText : expandMoreText}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="flex w-full items-center justify-between gap-x-4"
        >
          <div className="hyphens-auto text-heading-4" lang={lang}>
            {title}
          </div>
          <span className="material-symbols-outlined size-32 m-[-5px] select-none font-bold" aria-hidden>
            {isOpen ? 'expand_less' : 'expand_more'}
          </span>
        </button>
      )}
      {isOpen && children}
    </>
  );
};
