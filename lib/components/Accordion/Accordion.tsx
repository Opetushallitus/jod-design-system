import React from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { cx } from '../../cva';

type TitleProps =
  | {
      title: React.ReactNode;
      titleText: string;
    }
  | {
      title: string;
      titleText?: never;
    };

type AccordionProps = {
  title: React.ReactNode | string;
  children: React.ReactNode;
  lang: string;
  underline?: boolean;
  intialState?: boolean;
} & TitleProps;

const Caret = ({ isOpen }: { isOpen: boolean }) => (
  <span className="ds:text-black ds:group-hover:text-accent!" aria-hidden>
    {isOpen ? <MdExpandLess size={24} /> : <MdExpandMore size={24} />}
  </span>
);

export const Accordion = ({ title, titleText, children, lang, underline, intialState = true }: AccordionProps) => {
  const [isOpen, setIsOpen] = React.useState(intialState);
  const toggleOpen = () => setIsOpen(!isOpen);
  const isTitleValidElement = React.isValidElement(title);
  const wrapperClassnames = cx(
    'ds:cursor-pointer ds:flex ds:w-full ds:items-center ds:justify-between ds:gap-x-4 ds:mb-2 ds:group-hover:text-accent!',
    {
      'ds:border-b ds:border-border-gray': underline,
    },
  );

  // Reset the state when the children change
  React.useEffect(() => {
    setIsOpen(intialState);
  }, [children, intialState]);

  return (
    <>
      {isTitleValidElement ? (
        <div className={wrapperClassnames}>
          {title}
          <button
            aria-label={titleText}
            aria-expanded={isOpen}
            onClick={toggleOpen}
            className="ds:cursor-pointer ds:flex"
          >
            <Caret isOpen={isOpen} />
          </button>
        </div>
      ) : (
        <div className="ds:group">
          <button aria-expanded={isOpen} onClick={toggleOpen} className={wrapperClassnames}>
            <span
              className="ds:mr-5 ds:w-full ds:text-left ds:hyphens-auto ds:text-heading-3 ds:group-hover:underline"
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
