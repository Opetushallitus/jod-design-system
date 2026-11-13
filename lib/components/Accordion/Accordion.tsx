import { Transition } from '@headlessui/react';
import React from 'react';

import { cx } from '../../cva';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { useOnChange } from '../../hooks/useOnChange';
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
  /** Text announced to screen readers while fetchData is loading, e.g. "Loading". Used only with fetchData. */
  loadingText?: string;
  /** Text shown and announced to screen readers when fetchData fails, e.g. "Loading failed". Used only with fetchData. */
  errorText?: string;
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

/**
 * The hover color is the darker accent, as the accent has too little contrast (4.38:1) on the gray-2 background that
 * accordions are often placed on.
 */
const Caret = ({ isOpen }: { isOpen: boolean }) => (
  <span className="ds:text-primary-gray ds:group-hover:text-primary-1-dark-2!" aria-hidden>
    {isOpen ? <JodCaretUp /> : <JodCaretDown />}
  </span>
);

const AccordionTitle = ({ title, ellipsis, testId }: { title: React.ReactNode; ellipsis: boolean; testId: string }) =>
  typeof title === 'string' ? (
    <span
      className={cx('ds:block ds:min-w-0 ds:flex-1 ds:text-left ds:text-heading-3 ds:hyphens-auto', {
        'ds:overflow-hidden ds:text-ellipsis ds:whitespace-nowrap': ellipsis,
      })}
      data-testid={testId}
    >
      {title}
    </span>
  ) : (
    <div
      className={cx('ds:min-w-0 ds:flex-1 ds:text-left ds:text-heading-3 ds:hyphens-auto', {
        'ds:overflow-hidden ds:text-ellipsis ds:whitespace-nowrap': ellipsis,
      })}
      data-testid={testId}
    >
      {title}
    </div>
  );

type FetchStatusValue = 'idle' | 'loading' | 'done' | 'error';

/**
 * Live region for the fetch status. The loading text is only announced, while the error is also shown, as nothing else
 * tells that the accordion did not open.
 */
const FetchStatus = ({
  status,
  loadingText,
  errorText,
  testId,
}: {
  status: FetchStatusValue;
  loadingText?: string;
  errorText?: string;
  testId: string;
}) => {
  const texts: Partial<Record<FetchStatusValue, string>> = { loading: loadingText, error: errorText };
  const text = texts[status];
  return (
    <span // NOSONAR (same reason as above)
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- <output> is not reliably exposed as a live region
      role="status"
      className={
        status === 'error' && text ? 'ds:mt-2 ds:block ds:font-arial ds:text-form-error ds:text-alert-2' : 'ds:sr-only'
      }
      data-testid={testId}
    >
      {text}
    </span>
  );
};

/**
 * Toggles the accordion. With fetchData, the content is fetched before the accordion first opens. If fetching fails,
 * the accordion stays closed, so that it is not announced as expanded without content, and the next click retries.
 */
const useToggle = (isOpen: boolean, setIsOpen: (isOpen: boolean) => void, fetchData?: () => Promise<void>) => {
  const [fetchStatus, setFetchStatus] = React.useState<FetchStatusValue>('idle');

  const toggleOpen = React.useCallback(async () => {
    if (fetchStatus === 'loading') {
      return;
    }

    if (fetchData && fetchStatus !== 'done' && !isOpen) {
      try {
        setFetchStatus('loading');
        await fetchData();
        setFetchStatus('done');
      } catch {
        setFetchStatus('error');
        return;
      }
    }

    setIsOpen(!isOpen);
  }, [fetchData, fetchStatus, isOpen, setIsOpen]);

  return { fetchStatus, toggleOpen };
};

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
  loadingText,
  errorText,
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
  // With fetchData, an open accordion would be announced as expanded while it shows nothing until the first click.
  const [internalIsOpen, setInternalIsOpen] = React.useState(initialState && !fetchData);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  const setIsOpen = isControlled && controlledSetIsOpen ? controlledSetIsOpen : setInternalIsOpen;
  const { reduceMotion } = useMediaQueries();
  const shouldAnimate = reduceMotion ? false : animated;
  const getTestId = (suffix: string) => (testId ? `${testId}-${suffix}` : suffix);

  // Reset the state when the children change. With fetchData the accordion stays as it is, as it opens only once the
  // content has been fetched.
  useOnChange([children, fetchData, initialState, isControlled], () => {
    if (!isControlled && !fetchData) {
      setInternalIsOpen(initialState);
    }
  });

  const { fetchStatus, toggleOpen } = useToggle(isOpen, setIsOpen, fetchData);

  const showContent = isOpen && (!fetchData || fetchStatus === 'done');

  const captureHeight = () =>
    contentRef.current && (contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`);
  const clearHeight = () => contentRef.current && (contentRef.current.style.maxHeight = '');

  return (
    <div className={cx('ds:w-full ds:text-primary-gray', className)} data-testid={getTestId('wrapper')}>
      <div className={cx('ds:group ds:w-full', titleClassName)}>
        <button
          type="button"
          {...(triggerId ? { id: triggerId } : {})}
          {...(ariaControls ? { 'aria-controls': ariaControls } : {})}
          aria-expanded={isOpen}
          aria-label={typeof title === 'string' ? title : ariaLabel}
          onClick={() => void toggleOpen()}
          className={cx(
            'ds:cursor-pointer ds:flex ds:w-full ds:items-center ds:justify-between ds:gap-x-4 ds:group-hover:text-primary-1-dark-2! ds:group',
            {
              'ds:border-b ds:border-border-gray': underline,
            },
          )}
          data-testid={getTestId('trigger')}
        >
          <AccordionTitle title={title} ellipsis={ellipsis} testId={getTestId('title')} />
          <span className="ds:shrink-0" style={{ alignSelf: caretPosition === 'top' ? 'flex-start' : 'center' }}>
            {fetchStatus === 'loading' ? (
              <Spinner size={24} color="accent" testId={getTestId('spinner')} />
            ) : (
              <Caret isOpen={isOpen} />
            )}
          </span>
        </button>
      </div>
      {/* Persistent live region outside the button: screen readers only announce changes to regions that already exist */}
      {fetchData && (
        <FetchStatus
          status={fetchStatus}
          loadingText={loadingText}
          errorText={errorText}
          testId={getTestId('status')}
        />
      )}
      {shouldAnimate ? (
        <>
          <Transition
            ref={contentRef}
            as="div"
            show={showContent}
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
            data-testid={getTestId('content')}
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
            data-testid={getTestId('collapsed-content')}
          >
            {collapsedContent}
          </Transition>
        </>
      ) : (
        <>
          {showContent && <div data-testid={getTestId('content')}>{children}</div>}
          {!isOpen && collapsedContent && <div data-testid={getTestId('collapsed-content')}>{collapsedContent}</div>}
        </>
      )}
    </div>
  );
};
