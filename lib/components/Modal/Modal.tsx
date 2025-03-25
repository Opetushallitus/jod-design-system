import React from 'react';
import { cx } from '../../cva';
import { BaseModal, type BaseModalProps } from '../BaseModal/BaseModal';

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  content: React.ReactNode;
  footer: ((onCloseClick: () => void) => React.ReactNode) | React.ReactNode;
  /** Configuration for confirm dialog before closing */
  confirmBeforeClose?: BaseModalProps['confirmBeforeClose'];
}

/** Modals are containers appearing in front of the main content to provide critical information or an actionable piece of content. */
export const Modal = ({ open, onClose, content, footer, confirmBeforeClose }: ModalProps) => {
  const setOpen = (value: React.SetStateAction<boolean>) => {
    if (value === false && onClose) {
      onClose();
    }
  };

  /*
    40px (gap on top of the screen)
  + 40px (content top padding) 
  + 40px (content bottom padding) 
  + 76px (footer height) 
  + 40px (gap on bottom of the screen)
  = 236px

    ds:sm:max-h-[calc(100vh-236px)] is then the maximum height for the actual content of Modal for desktop
  */
  const heightClasses = `ds:min-h-[calc(100vh-344px)] ds:max-h-[calc(100vh-156px)] ds:sm:max-h-[calc(100vh-236px)]`;

  return (
    <BaseModal open={open} setOpen={setOpen} confirmBeforeClose={confirmBeforeClose}>
      {(onCloseClick) => (
        <div className="ds:bg-bg-gray ds:flex ds:flex-col ds:max-w-[1092px]">
          <div className={cx(heightClasses, 'ds:overflow-y-auto ds:overscroll-y-contain ds:p-5 ds:sm:px-7 ds:sm:py-8')}>
            {content}
          </div>
          <div
            role="group"
            className="ds:bg-bg-gray-2 ds:overflow-x-auto ds:overflow-y-hidden ds:justify-between ds:p-5 ds:sm:px-7"
          >
            {typeof footer === 'function' ? footer(onCloseClick) : footer}
          </div>
        </div>
      )}
    </BaseModal>
  );
};
