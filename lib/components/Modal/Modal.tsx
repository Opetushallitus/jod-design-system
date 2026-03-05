import { Dialog, DialogPanel } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { type AnimationMode, getModalAnimations, tidyClasses as tc } from '../../utils';

export interface ModalProps {
  /** Required name for the screenreader */
  name: string;
  open: boolean;
  onClose?: () => void;
  content: React.ReactNode;
  footer?: React.ReactNode;
  progress?: React.ReactNode;
  topSlot?: React.ReactNode;
  /** Slot is not used on mobile. */
  sidePanel?: React.ReactNode;
  fullWidthContent?: boolean;
  /** Test id for querying in tests */
  testId?: string;
  className?: string;
  /** Animation mode for stacked modals. Defaults to 'single' for backward compatibility. */
  animationMode?: AnimationMode;
  /** Whether this modal should render a backdrop. Only the bottom-most modal in a stack should render backdrop. Defaults to true for backward compatibility. */
  shouldRenderBackdrop?: boolean;
}

/** Modals are containers appearing in front of the main content to provide critical information or an actionable piece of content. */
export const Modal = ({
  name,
  open,
  onClose,
  content,
  progress,
  topSlot,
  sidePanel,
  footer,
  fullWidthContent = false,
  testId,
  className = '',
  animationMode = 'single',
  shouldRenderBackdrop = true,
}: ModalProps) => {
  const { sm } = useMediaQueries();
  const id = React.useId();
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [mobileHeight, setMobileHeight] = React.useState<'50dvh' | '90dvh' | null>(null);
  const [isMeasuring, setIsMeasuring] = React.useState(false);

  // Handle mobile height measurement when modal opens
  React.useLayoutEffect(() => {
    if (!sm && open) {
      // First render without height constraints to measure
      setIsMeasuring(true);
    } else if (sm) {
      setMobileHeight(null);
      setIsMeasuring(false);
    }
  }, [open, sm, content, footer]);

  // Measure after DOM has been updated with measurement classes
  React.useLayoutEffect(() => {
    if (isMeasuring && panelRef.current) {
      const naturalHeight = panelRef.current.scrollHeight;
      const smallHeightThreshold = window.innerHeight * 0.5;

      const height = naturalHeight > smallHeightThreshold ? '90dvh' : '50dvh';
      setMobileHeight(height);
      setIsMeasuring(false);
    }
  }, [isMeasuring]);

  // Get mobile height classes based on state
  const getMobileHeightClasses = (): string => {
    if (sm) {
      return '';
    }
    if (isMeasuring) {
      return 'ds:h-auto ds:max-h-none ds:overflow-visible ds:invisible';
    }
    if (mobileHeight === '50dvh') {
      return 'ds:h-[50dvh] ds:overflow-hidden';
    }
    if (mobileHeight === '90dvh') {
      return 'ds:h-[90dvh] ds:overflow-hidden';
    }
    return 'ds:overflow-hidden';
  };

  // Calculate animations based on animation mode and device type
  const { panelAnimations, backdropAnimations } = getModalAnimations(animationMode, !sm);

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          aria-label={name}
          id={`ds-modal-${id}`}
          open={open}
          onClose={() => {
            if (onClose) {
              onClose();
            }
          }}
          className="ds:relative ds:z-50"
          data-testid={testId}
          static
        >
          {/* Backdrop - only render if backdropAnimations is not null AND shouldRenderBackdrop is true */}
          {backdropAnimations && shouldRenderBackdrop && (
            <motion.div
              initial={backdropAnimations.initial}
              animate={backdropAnimations.animate}
              exit={backdropAnimations.exit}
              className="ds:fixed ds:inset-0 ds:bg-black/30"
              aria-hidden
              data-testid={testId ? `${testId}-backdrop` : undefined}
            />
          )}
          {/* Wrapper container paddings and margins */}
          <div
            className="ds:fixed ds:inset-0 ds:pt-5 ds:sm:p-10"
            data-testid={testId ? `${testId}-container` : undefined}
          >
            {/* Wrapper for container centering */}
            <div
              className="ds:flex ds:items-end ds:sm:items-center ds:justify-center ds:h-full"
              data-testid={testId ? `${testId}-center` : undefined}
            >
              {/* Modal container */}
              <DialogPanel
                ref={panelRef}
                id={`ds-modal-panel-${id}`}
                as={motion.div}
                initial={panelAnimations.initial}
                animate={panelAnimations.animate}
                exit={panelAnimations.exit}
                className={tc([
                  'ds:flex',
                  'ds:flex-col',
                  'ds:bg-bg-gray',
                  'ds:rounded-t-xl',
                  'ds:sm:rounded-lg',
                  'ds:w-full',
                  'ds:max-w-[890px]',
                  getMobileHeightClasses(),
                  'ds:sm:h-auto',
                  'ds:sm:max-h-[80dvh]',
                  'ds:sm:overflow-hidden',
                  className,
                ])}
                data-testid={testId ? `${testId}-panel` : undefined}
              >
                {/* Content wrapper - height is controlled here */}
                <div
                  className={tc([
                    'ds:max-w-[890px]',
                    'ds:flex-1',
                    'ds:min-h-0',
                    'ds:sm:mt-7',
                    'ds:mt-6',
                    'ds:relative',
                    'ds:overflow-hidden',
                    'ds:flex',
                    'ds:flex-col',
                  ])}
                  data-testid={testId ? `${testId}-content-wrapper` : undefined}
                >
                  {/* Top */}
                  <div className="ds:flex ds:flex-row ds:justify-between ds:px-5 ds:md:px-9 ds:pb-3">
                    {topSlot}
                    {progress && (
                      <div
                        className="ds:flex ds:flex-1 ds:justify-items-end"
                        data-testid={testId ? `${testId}-progress` : undefined}
                      >
                        <div className="ds:ml-auto">{progress}</div>
                      </div>
                    )}
                  </div>
                  {/* Main content */}
                  <div className="ds:grid ds:grid-cols-1 ds:sm:grid-cols-3 ds:overflow-hidden ds:flex-1">
                    <div
                      className={tc([
                        'ds:col-span-1',
                        'ds:flex',
                        'ds:flex-col',
                        'ds:min-h-0',
                        'ds:overflow-hidden',
                        'ds:pr-0 sm:ds:pr-5',
                        sidePanel || !fullWidthContent ? 'ds:sm:col-span-2' : 'ds:sm:col-span-3',
                        'ds:sm:pr-0',
                        sidePanel && progress ? 'ds:sm:mt-8' : '',
                      ])}
                      data-testid={testId ? `${testId}-main` : undefined}
                    >
                      <div
                        className="ds:overflow-y-auto ds:flex ds:flex-col ds:flex-1"
                        data-testid={testId ? `${testId}-scroll` : undefined}
                      >
                        {content}
                      </div>
                    </div>
                    {/* Side panel */}
                    {sm && sidePanel && !fullWidthContent && (
                      <div
                        className={tc(['ds:col-span-1', 'ds:flex', 'ds:flex-col', 'ds:min-h-0', 'ds:overflow-hidden'])}
                        data-testid={testId ? `${testId}-side` : undefined}
                      >
                        <div
                          className={`ds:mr-5 ds:sm:mr-0 ds:overflow-y-auto ds:flex-1 ${progress ? 'ds:sm:mt-8 ds:mt-6' : ''}`}
                          data-testid={testId ? `${testId}-side-scroll` : undefined}
                        >
                          {sidePanel}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Footer, button area */}
                {footer && (
                  <div
                    className="ds:flex ds:shrink-0 ds:bg-bg-gray-2 ds:overflow-x-auto ds:overflow-y-hidden ds:justify-between ds:py-4 ds:sm:py-5 ds:px-4 ds:sm:px-9 ds:z-50"
                    data-testid={testId ? `${testId}-footer` : undefined}
                  >
                    {footer}
                  </div>
                )}
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
