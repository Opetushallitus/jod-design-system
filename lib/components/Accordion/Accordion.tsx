import React from 'react';
import { cx } from '../../cva';
import { JodCaretDown, JodCaretUp } from '../../icons';
import { tidyClasses } from '../../utils';
import { Spinner } from '../Spinner/Spinner';

type TitleProps =
  | {
      title: React.ReactNode;
      /** If the title is a component, titleText should be provided for a11y */
      titleText: string;
    }
  | {
      title: string;
      titleText?: never;
    };

type AccordionProps = {
  /** Accordion title, can be a component or a string */
  title: React.ReactNode | string;
  /** Accordion contents */
  children: React.ReactNode;
  /** Language code for the accordion */
  lang: string;
  /** Show underline on the title */
  underline?: boolean;
  /** The initial open state of the accordion */
  initialState?: boolean;
  /** The position of the caret icon */
  caretPosition?: 'top' | 'center';
  /** Is the accordion open (controlled mode) */
  isOpen?: boolean;
  /** Function to update the open state (controlled mode) */
  setIsOpen?: (isOpen: boolean) => void;
  /** Async function to fetch data when the accordion is opened. A loading spinner will be shown while fetching. */
  fetchData?: () => Promise<void>;
  /** Test id for querying in tests */
  dataTestId?: string;
  /**  className for wrapper */
  className?: string;
} & TitleProps;

const Caret = ({ isOpen }: { isOpen: boolean }) => (
  <span className="ds:text-primary-gray ds:group-hover:text-accent!" aria-hidden>
    {isOpen ? <JodCaretUp size={24} /> : <JodCaretDown size={24} />}
  </span>
);

export const Accordion = ({
  title,
  titleText,
  children,
  caretPosition = 'center',
  lang,
  underline,
  initialState = true,
  fetchData,
  dataTestId,
  isOpen: controlledIsOpen,
  setIsOpen: controlledSetIsOpen,
  className,
}: AccordionProps) => {
  const [internalIsOpen, setInternalIsOpen] = React.useState(initialState);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  const setIsOpen = isControlled && controlledSetIsOpen ? controlledSetIsOpen : setInternalIsOpen;
  const isTitleValidElement = React.isValidElement(title);
  const wrapperClassnames = cx(
    'ds:cursor-pointer ds:flex ds:w-full ds:items-center ds:justify-between ds:gap-x-4 ds:group-hover:text-accent! ds:group',
    {
      'ds:border-b ds:border-border-gray': underline,
      'ds:mb-2': isOpen,
    },
  );

  // Reset the state when the children change
  React.useEffect(() => {
    // If fetchData is provided, the accordion will not open on the first try
    if (!isControlled && !fetchData) {
      setInternalIsOpen(initialState);
    }
  }, [children, fetchData, initialState, isControlled]);

  const [fetchStatus, setFetchStatus] = React.useState<'idle' | 'loading' | 'done'>('idle');

  const toggleOpen = React.useCallback(async () => {
    if (fetchStatus === 'loading') {
      return;
    }

    if (fetchData && fetchStatus === 'idle' && !isOpen) {
      try {
        setFetchStatus('loading');
        await fetchData();
        setFetchStatus('done');
      } catch {
        setFetchStatus('idle');
      }
    }

    setIsOpen(!isOpen);
  }, [fetchData, fetchStatus, isOpen, setIsOpen]);

  return (
    <div className={tidyClasses(className || '')}>
      {isTitleValidElement ? (
        <div className={wrapperClassnames}>
          {title}
          <button
            aria-label={titleText}
            aria-expanded={isOpen}
            onClick={() => void toggleOpen()}
            style={{ alignSelf: caretPosition === 'top' ? 'flex-start' : 'center' }}
            className="ds:cursor-pointer ds:flex"
            data-testid={dataTestId}
          >
            {fetchStatus === 'loading' ? <Spinner size={24} color="accent" /> : <Caret isOpen={isOpen} />}
          </button>
        </div>
      ) : (
        <div className="ds:group">
          <button
            aria-expanded={isOpen}
            onClick={() => void toggleOpen()}
            className={wrapperClassnames}
            data-testid={dataTestId}
          >
            <span
              className="ds:mr-5 ds:w-full ds:text-left ds:hyphens-auto ds:text-heading-3 ds:group-hover:underline"
              lang={lang}
            >
              {title}
            </span>
            {fetchStatus === 'loading' ? <Spinner size={24} color="accent" /> : <Caret isOpen={isOpen} />}
          </button>
        </div>
      )}
      {isOpen && (!fetchData || fetchStatus === 'done') && children}
    </div>
  );
};
