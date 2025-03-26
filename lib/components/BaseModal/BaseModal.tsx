import React from 'react';
import { Button } from '../Button/Button';

interface ConfirmTranslations {
  title: string;
  description: string;
  noLabel: string;
  yesLabel: string;
}

export interface BaseModalProps {
  /** State to control the open state */
  open: boolean;
  /** Function to set the open state */
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  /** Configuration for confirm dialog before closing */
  confirmBeforeClose?: {
    translations: ConfirmTranslations;
  };
  /** Children to render inside the modal */
  children?: (onCloseClick: () => void) => React.ReactNode;
}

export const BaseModal = (props: BaseModalProps) => {
  const { open, setOpen, confirmBeforeClose, children } = props;
  const ref = React.createRef<HTMLDialogElement>();
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const confirmRef = React.createRef<HTMLDialogElement>();

  // Handle dialog events in correct order
  React.useEffect(() => {
    if (open) {
      const element = ref.current;
      // Workaround to show the dialog after the children are rendered
      const timeoutId = setTimeout(() => {
        element?.showModal();
      });
      return () => clearTimeout(timeoutId);
    } else {
      ref.current?.close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();

      close();
    }
  };

  const onClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if ((e.target as HTMLDialogElement).tagName === 'DIALOG') {
      e.preventDefault();
      e.stopPropagation();

      close();
    }
  };

  const close = () => {
    if (confirmBeforeClose) {
      setConfirmOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={ref}
      onKeyDown={onKeyDown}
      onClick={onClick}
      className="ds:backdrop:bg-black/30 ds:rounded-lg ds:m-auto ds:max-w-full"
    >
      {children?.(close)}
      {confirmBeforeClose && (
        <ConfirmModal
          ref={confirmRef}
          open={confirmOpen}
          setOpen={setConfirmOpen}
          setParentOpen={setOpen}
          translations={confirmBeforeClose.translations}
        />
      )}
    </dialog>
  );
};

export interface ConfirmModalProps {
  /** Ref to the dialog element */
  ref: React.RefObject<HTMLDialogElement | null>;
  /** State to control the confirm open state */
  open: boolean;
  /** Function to set the confirm open state */
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  /** Function to set the parent open state */
  setParentOpen: React.Dispatch<React.SetStateAction<boolean>>;
  translations: ConfirmTranslations;
}

const ConfirmModal = (props: ConfirmModalProps) => {
  const {
    ref,
    open,
    setOpen,
    setParentOpen,
    translations: { title, description, noLabel, yesLabel },
  } = props;
  const yesRef = React.createRef<HTMLButtonElement>();

  // Focus on the yes button when the dialog is opened
  React.useEffect(() => {
    if (open) {
      ref.current?.showModal();
      yesRef.current?.focus();
    } else {
      ref.current?.close();
    }
  }, [yesRef, open, ref]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (ref && e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();

      setOpen(false);
    }
  };

  const onClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (ref && (e.target as HTMLDialogElement).tagName === 'DIALOG') {
      e.preventDefault();
      e.stopPropagation();

      setOpen(false);
    }
  };

  const onNoClick = () => {
    setOpen(false);
  };

  const onYesClick = () => {
    setOpen(false);
    setParentOpen(false);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={ref}
      onKeyDown={onKeyDown}
      onClick={onClick}
      className="ds:backdrop:bg-black/30 ds:rounded-lg ds:m-auto ds:max-w-full"
    >
      <div className="ds:flex ds:flex-col">
        <div className="ds:flex ds:flex-col ds:max-w-[640px] ds:p-7 ds:sm:p-9">
          <h2 className="ds:text-heading-2 ds:mb-5">{title}</h2>
          <p className="ds:text-body-sm ds:font-arial">{description}</p>
        </div>
        <div
          className="ds:flex ds:gap-5 ds:justify-end ds:p-5 ds:sm:px-7 ds:overflow-x-auto ds:bg-bg-gray-2"
          role="group"
        >
          <Button label={noLabel} onClick={onNoClick} variant="white" />
          <Button ref={yesRef} label={yesLabel} onClick={onYesClick} variant="white" />
        </div>
      </div>
    </dialog>
  );
};
