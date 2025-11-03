import React from 'react';
import { cx } from '../../cva';
import { JodCaretDown, JodCaretUp } from '../../icons';
import { Spinner } from '../Spinner/Spinner';

type TitleProps =
  | {
      title: React.ReactNode;
      /** If the title is a component, ariaLabel should be provided for a11y */
      ariaLabel: string;
    }
  | {
      title: string;
      ariaLabel?: never;
    };

type AccordionProps = {
  /** Accordion title, can be a component or a string */
  title: React.ReactNode | string;
  /** Accordion contents */
  children: React.ReactNode;
  /** Show underline on the title */
  underline?: boolean;
  /** The initial open state of the accordion */
  initialState?: boolean;
  /** The vertical position of the caret icon */
  caretPosition?: 'top' | 'center';
  /** Is the accordion open (controlled mode) */
  isOpen?: boolean;
  /** Id of the button that triggers the accordion, for a11y */
  triggerId?: string;
  /** Aria controls attribute */
  ariaControls?: string;
  /** Function to update the open state (controlled mode) */
  setIsOpen?: (isOpen: boolean) => void;
  /** Async function to fetch data when the accordion is opened. A loading spinner will be shown while fetching. */
  fetchData?: () => Promise<void>;
  /** Test id for querying in tests */
  testId?: string;
  /** Classnames for wrapper */
  className?: string;
} & TitleProps;

const Caret = ({ isOpen }: { isOpen: boolean }) => (
  <span className="ds:text-primary-gray ds:group-hover:text-accent!" aria-hidden>
    {isOpen ? <JodCaretUp /> : <JodCaretDown />}
  </span>
);

export const Accordion = ({
  title,
  ariaLabel,
  ariaControls,
  children,
  caretPosition = 'center',
  underline,
  initialState = true,
  triggerId,
  fetchData,
  testId,
  isOpen: controlledIsOpen,
  setIsOpen: controlledSetIsOpen,
  className = '',
}: AccordionProps) => {
  const [internalIsOpen, setInternalIsOpen] = React.useState(initialState);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  const setIsOpen = isControlled && controlledSetIsOpen ? controlledSetIsOpen : setInternalIsOpen;

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
    <div className={className}>
      <div className="ds:group">
        <button
          {...(triggerId ? { id: triggerId } : {})}
          {...(ariaControls ? { 'aria-controls': ariaControls } : {})}
          aria-expanded={isOpen}
          aria-label={typeof title === 'string' ? title : ariaLabel}
          onClick={() => void toggleOpen()}
          className={cx(
            'ds:cursor-pointer ds:flex ds:w-full ds:items-center ds:justify-between ds:gap-x-4 ds:group-hover:text-accent! ds:group',
            {
              'ds:border-b ds:border-border-gray': underline,
              'ds:mb-2': isOpen,
            },
          )}
          data-testid={testId}
        >
          <span className="ds:mr-5 ds:w-full ds:text-left ds:hyphens-auto ds:text-heading-3 ds:group-hover:underline">
            {title}
          </span>
          <span style={{ alignSelf: caretPosition === 'top' ? 'flex-start' : 'center' }}>
            {fetchStatus === 'loading' ? <Spinner size={24} color="accent" /> : <Caret isOpen={isOpen} />}
          </span>
        </button>
      </div>
      {isOpen && (!fetchData || fetchStatus === 'done') && children}
    </div>
  );
};
