import { Dialog, DialogPanel } from '@headlessui/react';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  content: React.ReactNode;
  footer: React.ReactNode;
  progressSlot?: React.ReactNode;
  sidePanelSlot?: React.ReactNode;
}

export const Modal = ({ open, onClose, content, progressSlot, sidePanelSlot, footer }: ModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden />

      <div className="fixed inset-0 w-screen py-[96px]">
        <div className="flex items-center justify-center">
          <DialogPanel className="overflow-hidden rounded-[40px] border-[5px] border-inactive-gray bg-white">
            <div className="my-6 grid max-h-[calc(100vh-320px)] max-w-[1092px] grid-cols-6 gap-6 pl-9">
              <div className="col-span-4 max-h-[calc(100vh-320px)] min-w-[656px] overflow-y-auto">{content}</div>
              <div className="col-span-2 flex max-h-[calc(100vh-320px)] min-w-[316px] flex-col gap-6">
                {progressSlot && <>{progressSlot}</>}
                <div className="mr-9 overflow-y-auto">{sidePanelSlot}</div>
              </div>
            </div>

            {footer && (
              <div className="h-[70px] max-h-[70px] bg-bg-gray">
                <div className="px-9 py-5">{footer}</div>
              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
