import { Dialog, DialogPanel } from '@headlessui/react';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { tidyClasses as tc } from '../../utils';

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  content: React.ReactNode;
  footer: React.ReactNode;
  progress?: React.ReactNode;
  /** Slot is not used on mobile. */
  sidePanel?: React.ReactNode;
}

/** Modals are containers appearing in front of the main content to provide critical information or an actionable piece of content. */
export const Modal = ({ open, onClose, content, progress, sidePanel, footer }: ModalProps) => {
  const { sm } = useMediaQueries();

  const heightClasses = `ds-max-h-[calc(100vh-172px)] sm:ds-max-h-[calc(100vh-320px)]`;

  return (
    <Dialog
      open={open}
      onClose={() => {
        if (onClose) {
          onClose();
        }
      }}
      className="ds-relative ds-z-50"
    >
      {/* Backdrop */}
      <div className="ds-fixed ds-inset-0 ds-bg-black/30" aria-hidden />
      {/* Wrapper container paddings and margins */}
      <div className="ds-fixed ds-inset-0">
        {/* Wrapper for container centering */}
        <div className="ds-flex ds-items-center ds-justify-center ds-h-full">
          {/* Modal container */}
          <DialogPanel
            className={tc([
              'ds-mx-3',
              'ds-flex',
              'ds-flex-col',
              'ds-bg-bg-gray',
              'ds-overflow-hidden',
              'ds-rounded',
              'sm:ds-rounded-lg',
            ])}
          >
            {/* Content wrapper */}
            <div
              className={tc([
                'heightClasses',
                'ds-grid',
                'ds-max-w-[1092px]',
                'ds-grid-cols-2',
                'ds-gap-6',
                'ds-my-6',
                'ds-pl-5',
                'sm:ds-grid-cols-6',
                'sm:ds-pl-5',
                'md:ds-pl-9',
              ])}
            >
              {/* Main content */}
              <div
                className={tc([
                  heightClasses,
                  'ds-col-span-2',
                  'ds-flex',
                  'ds-flex-col',
                  'ds-gap-y-6',
                  'ds-pr-5',
                  'sm:ds-col-span-4',
                  'sm:ds-pr-0',
                ])}
              >
                {progress && !sm && <div className="ds-flex ds-grow ds-flex-col ds-items-end">{progress}</div>}
                <div className="ds-overflow-y-auto sm:ds-mt-6">{content}</div>
              </div>
              {/* Side panel */}
              {sm && (
                <div className={`ds-col-span-2 ds-flex ds-flex-col ${heightClasses}`}>
                  {progress && <div className="ds-mr-6 ds-flex ds-grow ds-flex-col ds-items-end">{progress}</div>}
                  <div className={`sm:ds-mr-5 md:ds-mr-9 ds-overflow-y-auto ${!progress ? 'sm:ds-mt-6' : ''}`}>
                    {sidePanel}
                  </div>
                </div>
              )}
            </div>
            {/* Footer, button area */}
            <div className="ds-bg-bg-gray-2 ds-overflow-x-auto ds-overflow-y-hidden ds-justify-between ds-py-4 sm:ds-py-5 ds-px-4 sm:ds-px-9">
              {footer}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
