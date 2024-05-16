import { Dialog, DialogPanel } from '@headlessui/react';
import { useMediaQueries } from '../../hooks/useMediaQueries';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  content: React.ReactNode;
  footer: React.ReactNode;
  progress?: React.ReactNode;
  /** Slot is not used on mobile. */
  sidePanel?: React.ReactNode;
}

export const Modal = ({ open, onClose, content, progress, sidePanel, footer }: ModalProps) => {
  const { sm } = useMediaQueries();

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden />
      <div className="fixed inset-0 w-screen py-[96px]">
        <div className="flex items-center justify-center">
          <DialogPanel className="overflow-hidden rounded-[40px] border-[5px] border-inactive-gray bg-white">
            <div className="my-6 grid max-h-[calc(100vh-320px)] max-w-[1092px] grid-cols-2 gap-6 pl-5 sm:grid-cols-6 sm:pl-9">
              <div className="col-span-2 flex max-h-[calc(100vh-320px)] flex-col gap-6 pr-5 sm:col-span-4 sm:pr-0">
                {progress && !sm && <div className="flex grow flex-col items-end">{progress}</div>}
                <div className="overflow-y-auto sm:mt-6">{content}</div>
              </div>
              {sm && (
                <div className="col-span-2 flex max-h-[calc(100vh-320px)] flex-col gap-6">
                  {progress && <div className="mr-6 flex grow flex-col items-end">{progress}</div>}
                  <div className="mr-9 overflow-y-auto">{sidePanel}</div>
                </div>
              )}
            </div>

            <div className="h-[70px] max-h-[70px] overflow-x-auto bg-bg-gray">
              <div className="px-6 py-5 sm:px-9">{footer}</div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
