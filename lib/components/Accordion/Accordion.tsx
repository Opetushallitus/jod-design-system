import React from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { cx } from '../../cva';
import { Spinner } from '../Spinner/Spinner';

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
  initialState?: boolean;
  // Optional function to fetch data when the accordion is opened. A loading spinner will be shown while fetching.
  fetchData?: () => Promise<void>;
} & TitleProps;

const Caret = ({ isOpen }: { isOpen: boolean }) => (
  <span className="ds:text-primary-gray ds:group-hover:text-accent!" aria-hidden>
    {isOpen ? <MdExpandLess size={24} /> : <MdExpandMore size={24} />}
  </span>
);

export const Accordion = ({
  title,
  titleText,
  children,
  lang,
  underline,
  initialState = true,
  fetchData,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = React.useState(initialState);

  const isTitleValidElement = React.isValidElement(title);
  const wrapperClassnames = cx(
    'ds:cursor-pointer ds:flex ds:w-full ds:items-center ds:justify-between ds:gap-x-4 ds:group-hover:text-accent!',
    {
      'ds:border-b ds:border-border-gray': underline,
      'ds:mb-2': isOpen,
    },
  );

  // Reset the state when the children change
  React.useEffect(() => {
    // If fetchData is provided, the accordion will not open on the first try
    if (!fetchData) {
      setIsOpen(initialState);
    }
  }, [children, fetchData, initialState]);

  const [loading, setLoading] = React.useState(false);
  const [dataFetched, setDataFetched] = React.useState(false);

  const toggleOpen = React.useCallback(async () => {
    if (loading) {
      return;
    }

    if (fetchData && !dataFetched && !isOpen) {
      setLoading(true);
      await fetchData();
      setLoading(false);
      setDataFetched(true);
    }

    setIsOpen(!isOpen);
  }, [dataFetched, isOpen, fetchData, loading]);

  return (
    <>
      {isTitleValidElement ? (
        <div className={wrapperClassnames}>
          {title}
          <button
            aria-label={titleText}
            aria-expanded={isOpen}
            onClick={() => void toggleOpen()}
            className="ds:cursor-pointer ds:flex"
          >
            {loading ? <Spinner size={24} color="accent" /> : <Caret isOpen={isOpen} />}
          </button>
        </div>
      ) : (
        <div className="ds:group">
          <button aria-expanded={isOpen} onClick={() => void toggleOpen()} className={wrapperClassnames}>
            <span
              className="ds:mr-5 ds:w-full ds:text-left ds:hyphens-auto ds:text-heading-3 ds:group-hover:underline"
              lang={lang}
            >
              {title}
            </span>
            {loading ? <Spinner size={24} color="accent" /> : <Caret isOpen={isOpen} />}
          </button>
        </div>
      )}
      {fetchData && dataFetched && isOpen && children}
      {!fetchData && isOpen && children}
    </>
  );
};
