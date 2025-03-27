import React from 'react';
import { cx } from '../../cva';
import { BaseModal, type BaseModalProps } from '../BaseModal/BaseModal';

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

export interface ModalProps {
  /** State to control the open state */
  open: boolean;
  /** Function to set the open state */
  onClose?: () => void;
  /** Children to render inside the modal */
  children?: React.ReactNode;
  /** Deprecated: Use children instead */
  content?: React.ReactNode;
  /** Configuration for confirm dialog before closing */
  confirmBeforeClose?: BaseModalProps['confirmBeforeClose'];
  /** Render function for the footer */
  renderFooter?: (onCloseClick: () => void) => React.ReactNode;
  /** Deprecated: Use renderFooter instead */
  footer?: React.ReactNode;
}

/** Modals are containers appearing in front of the main content to provide critical information or an actionable piece of content. */
export const Modal = ({ open, onClose, children, content, confirmBeforeClose, renderFooter, footer }: ModalProps) => {
  const setOpen = (value: React.SetStateAction<boolean>) => {
    if (value === false && onClose) {
      onClose();
    }
  };

  return (
    <BaseModal
      open={open}
      setOpen={setOpen}
      confirmBeforeClose={confirmBeforeClose}
      className="ds:max-w-[min(100%,1092px)] ds:min-w-[min(100%,1092px)] ds:w-[min(100%,1092px)]"
    >
      {(onCloseClick) => (
        <div className="ds:bg-bg-gray ds:flex ds:flex-col">
          <div className={cx(heightClasses, 'ds:overflow-y-auto ds:overscroll-y-contain ds:p-5 ds:sm:px-7 ds:sm:py-8')}>
            {children ?? content}
          </div>
          <div
            role="group"
            className="ds:bg-bg-gray-2 ds:overflow-x-auto ds:overflow-y-hidden ds:justify-between ds:p-5 ds:sm:px-7"
          >
            {renderFooter?.(onCloseClick) ?? footer}
          </div>
        </div>
      )}
    </BaseModal>
  );
};
