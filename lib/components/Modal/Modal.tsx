import React from 'react';
import { Button } from '../Button/Button';

export interface ModalProps {
  /** Ref for the dialog element */
  ref: React.RefObject<HTMLDialogElement | null>;
  /** Content of the modal */
  children?: React.ReactNode;
  /** Ref for the confirm dialog element */
  confirmRef?: React.RefObject<HTMLDialogElement | null>;
  /** Ref for the yes button */
  confirmYesRef?: React.RefObject<HTMLButtonElement | null>;
}

export const Modal = ({ ref, children, confirmRef, confirmYesRef }: ModalProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={ref}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          e.stopPropagation();

          if (confirmRef) {
            confirmRef.current?.showModal();
            confirmYesRef?.current?.focus();
          } else {
            ref.current?.close();
          }
        }
      }}
      onClick={(e) => {
        if ((e.target as HTMLDialogElement).tagName === 'DIALOG') {
          e.preventDefault();
          e.stopPropagation();

          if (confirmRef) {
            confirmRef?.current?.showModal();
          } else {
            ref.current?.close();
          }
        }
      }}
      className="ds:backdrop:bg-black/30 ds:rounded-lg ds:m-auto ds:max-w-full"
    >
      {children}
      {confirmRef && <ConfirmModal ref={confirmRef} parentRef={ref} yesRef={confirmYesRef} />}
    </dialog>
  );
};

export interface ConfirmModalProps {
  /** Ref for the dialog element */
  ref: React.RefObject<HTMLDialogElement | null>;
  /** Ref for the parent dialog element */
  parentRef: React.RefObject<HTMLDialogElement | null>;
  /** Ref for the yes button */
  yesRef?: React.RefObject<HTMLButtonElement | null>;
}

const ConfirmModal = ({ ref, parentRef, yesRef }: ConfirmModalProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={ref}
      onKeyDown={(e) => {
        if (ref && e.key === 'Escape') {
          e.preventDefault();
          e.stopPropagation();

          ref.current?.close();
        }
      }}
      onClick={(e) => {
        if (ref && (e.target as HTMLDialogElement).tagName === 'DIALOG') {
          e.preventDefault();
          e.stopPropagation();

          ref.current?.close();
        }
      }}
      className="ds:backdrop:bg-black/30 ds:rounded-lg ds:m-auto ds:max-w-full"
    >
      <div className="ds:flex ds:flex-col">
        <div className="ds:p-5 ds:flex ds:flex-col ds:gap-5">
          <h2 className="ds:text-heading-2">Are you sure you want to close?</h2>
          <p className="ds:text-body-sm ds:font-arial">If you close, you will lose any unsaved changes.</p>
        </div>
        <div className="ds:flex ds:gap-3 ds:p-3 ds:justify-end ds:bg-bg-gray-2" role="group">
          <Button label="No" onClick={() => ref.current?.close()} variant="white" />
          <Button
            ref={yesRef}
            label="Yes"
            onClick={() => {
              ref.current?.close();
              parentRef.current?.close();
            }}
            variant="white"
          />
        </div>
      </div>
    </dialog>
  );
};
