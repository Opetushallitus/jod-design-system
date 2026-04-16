import { Transition } from '@headlessui/react';
import React from 'react';
import { cx } from '../../cva';
import { JodCaretDown, JodCaretUp } from '../../icons';
import { useMediaQueries } from '../../main';
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
  /** Classnames for title */
  titleClassName?: string;
  /** Content to show when accordion is collapsed */
  collapsedContent?: React.ReactNode;
  /** Whether to show ellipsis for long titles */
  ellipsis?: boolean;
  /** Whether to animate the accordion */
  animated?: boolean;
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
  collapsedContent,
  className = '',
  titleClassName = '',
  ellipsis = true,
  animated = true,
}: AccordionProps) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [internalIsOpen, setInternalIsOpen] = React.useState(initialState);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  const setIsOpen = isControlled && controlledSetIsOpen ? controlledSetIsOpen : setInternalIsOpen;
  const { reduceMotion } = useMediaQueries();
  const shouldAnimate = reduceMotion ? false : animated;

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

  const captureHeight = () =>
    contentRef.current && (contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`);
  const clearHeight = () => contentRef.current && (contentRef.current.style.maxHeight = '');

  return (
    <div className={cx('ds:w-full ds:text-primary-gray', className)}>
      <div className={cx('ds:group ds:w-full', titleClassName)}>
        <button
          type="button"
          {...(triggerId ? { id: triggerId } : {})}
          {...(ariaControls ? { 'aria-controls': ariaControls } : {})}
          aria-expanded={isOpen}
          aria-label={typeof title === 'string' ? title : ariaLabel}
          onClick={() => void toggleOpen()}
          className={cx(
            'ds:cursor-pointer ds:flex ds:w-full ds:items-center ds:justify-between ds:gap-x-4 ds:group-hover:text-accent! ds:group',
            {
              'ds:border-b ds:border-border-gray': underline,
            },
          )}
          data-testid={testId}
        >
          <span
            className={cx('ds:text-left ds:text-heading-3 ds:hyphens-auto', {
              'ds:overflow-hidden ds:text-ellipsis ds:whitespace-nowrap': ellipsis,
            })}
          >
            {title}
          </span>
          <span className="ds:shrink-0" style={{ alignSelf: caretPosition === 'top' ? 'flex-start' : 'center' }}>
            {fetchStatus === 'loading' ? <Spinner size={24} color="accent" /> : <Caret isOpen={isOpen} />}
          </span>
        </button>
      </div>
      {shouldAnimate ? (
        <>
          <Transition
            ref={contentRef}
            as="div"
            show={isOpen && (!fetchData || fetchStatus === 'done')}
            enter="ds:transition-[max-height,opacity] ds:duration-300 ds:ease-in ds:overflow-hidden"
            enterFrom="ds:max-h-0! ds:opacity-0"
            enterTo="ds:max-h-full ds:opacity-100"
            leave="ds:overflow-hidden ds:transition-[max-height,opacity] ds:ease-out ds:duration-300"
            leaveFrom="ds:max-h-full ds:opacity-100"
            leaveTo="ds:max-h-0! ds:opacity-0"
            beforeEnter={captureHeight}
            afterEnter={clearHeight}
            beforeLeave={captureHeight}
            afterLeave={clearHeight}
          >
            {children}
          </Transition>
          <Transition
            show={!isOpen && !!collapsedContent}
            as="div"
            enter="ds:transition-opacity ds:duration-150 ds:ease-in ds:delay-300"
            enterFrom="ds:opacity-0"
            enterTo="ds:opacity-100"
            leave="ds:transition-opacity ds:duration-100 ds:ease-out"
            leaveFrom="ds:opacity-100"
            leaveTo="ds:opacity-0"
          >
            {collapsedContent}
          </Transition>
        </>
      ) : (
        <>
          {isOpen && (!fetchData || fetchStatus === 'done') && children}
          {!isOpen && collapsedContent}
        </>
      )}
    </div>
  );
};
