import { Dialog, DialogPanel } from '@headlessui/react';
import { useMediaQueries } from '../../hooks/useMediaQueries';

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
      <div className="ds-fixed ds-inset-0 ds-bg-black/30" aria-hidden />
      <div className="ds-fixed ds-inset-0 ds-w-screen ds-py-6 sm:ds-py-[96px]">
        <div className="ds-flex ds-h-full ds-items-center ds-justify-center">
          <DialogPanel className="ds-flex ds-h-full ds-flex-col ds-justify-between ds-overflow-hidden ds-rounded sm:ds-rounded-lg ds-bg-bg-gray ds-min-w-full sm:ds-min-w-[640px]">
            <div className="ds-my-6 ds-grid ds-max-h-[calc(100vh-172px)] ds-max-w-[1092px] ds-grid-cols-2 ds-gap-6 ds-pl-5 sm:ds-max-h-[calc(100vh-320px)] sm:ds-grid-cols-6 sm:ds-pl-9">
              <div className="ds-col-span-2 ds-flex ds-max-h-[calc(100vh-172px)] ds-flex-col ds-gap-6 ds-pr-5 sm:ds-col-span-4 sm:ds-max-h-[calc(100vh-320px)] sm:ds-pr-0">
                {progress && !sm && <div className="ds-flex ds-grow ds-flex-col ds-items-end">{progress}</div>}
                <div className="ds-overflow-y-auto sm:ds-mt-6">{content}</div>
              </div>
              {sm && (
                <div className="ds-col-span-2 ds-flex ds-max-h-[calc(100vh-172px)] ds-flex-col ds-gap-x-6 sm:ds-max-h-[calc(100vh-320px)]">
                  {progress && <div className="ds-mr-6 ds-flex ds-grow ds-flex-col ds-items-end">{progress}</div>}
                  <div className={`ds-mr-9 ds-overflow-y-auto ${!progress ? 'sm:ds-mt-6' : ''}`}>{sidePanel}</div>
                </div>
              )}
            </div>

            <div className="ds-bg-bg-gray-2 ds-overflow-x-auto ds-overflow-y-hidden">
              <div className="ds-py-4 sm:ds-py-5 ds-px-9">{footer}</div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
