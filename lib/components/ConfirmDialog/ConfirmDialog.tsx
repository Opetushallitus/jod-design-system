import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React from 'react';
import { JSX } from 'react/jsx-runtime';
import { cx } from '../../cva';

type Variant = 'normal' | 'destructive';

type FooterProps =
  | {
      footer?: never;

      onConfirm: () => void;
      confirmText: string;
      variant?: Variant;
      cancelText: string;
    }
  | {
      footer: (closeDialog: () => void) => React.ReactNode;

      onConfirm?: never;
      confirmText?: never;
      variant?: never;
      cancelText?: never;
    };

export type ConfirmDialogProps = {
  children: (showDialog: () => void) => JSX.Element;
  title: string;
  description: string;
  content?: React.ReactNode;
} & FooterProps;

const getVariantClassNames = ({ variant }: { variant: Variant }) => {
  return cx({
    'ds:text-alert ds:bg-white ds:hover:text-alert ds:active:text-white ds:active:bg-alert ds:focus-visible:text-alert':
      variant === 'destructive',
    'ds:text-black ds:bg-white': variant === 'normal',
  });
};

const Button = ({ label, onClick, variant = 'normal' }: { label: string; onClick?: () => void; variant?: Variant }) => {
  const variantClassNames = getVariantClassNames({ variant });
  return (
    <button
      className={`ds:cursor-pointer ds:group ds:flex ds:select-none ds:items-center ds:gap-4 ds:rounded-[30px] ds:px-6 ds:text-button-md ds:hover:text-accent ds:focus-visible:text-accent ds:focus-visible:outline ds:focus-visible:outline-[3px] ds:focus-visible:outline-offset-[1.5px] ds:focus-visible:outline-accent ds:active:bg-accent ds:active:text-white ds:active:outline-0 ${variantClassNames}`.trim()}
      onClick={onClick}
    >
      <span className="ds:py-[10px] ds:group-hover:underline ds:group-focus-visible:no-underline ds:group-active:no-underline">
        {label}
      </span>
    </button>
  );
};

/** Confirm dialogs are used to confirm an action before proceeding. They appear over the interface and block further interactions. */
export const ConfirmDialog = ({
  children,
  title,
  description,
  content,
  footer,
  onConfirm,
  confirmText,
  variant = 'normal',
  cancelText,
}: ConfirmDialogProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const showDialog = () => {
    setIsOpen(true);
  };

  const hideDialog = () => {
    setIsOpen(false);
  };

  const confirmHandler = () => {
    onConfirm?.();
    hideDialog();
  };

  return (
    <>
      {children(showDialog)}
      {isOpen && (
        <Dialog open={isOpen} onClose={hideDialog} className="ds:relative ds:z-50">
          <div className="ds:fixed ds:inset-0 ds:bg-black/30" aria-hidden />
          <div className="ds:fixed ds:inset-0 ds:flex ds:w-screen ds:py-[96px]">
            <div className="ds:flex ds:w-full ds:items-center ds:justify-center">
              <DialogPanel className="ds:overflow-hidden ds:rounded-lg ds:bg-bg-gray">
                <div className="ds:flex ds:max-w-[640px] ds:flex-col ds:p-9">
                  <DialogTitle className="ds:mb-5 ds:text-heading-2">{title}</DialogTitle>
                  <Description className="ds:text-body-sm ds:font-arial">{description}</Description>
                  {content && <div className="ds:mt-7">{content}</div>}
                </div>

                <div className="ds:overflow-x-auto ds:overflow-y-hidden ds:bg-bg-gray-2">
                  <div className="ds:flex ds:flex-row ds:gap-5 ds:px-6 ds:py-5 ds:sm:px-9 ds:justify-end">
                    {footer ? (
                      footer(hideDialog)
                    ) : (
                      <>
                        <Button label={cancelText} onClick={hideDialog} />
                        <Button label={confirmText} onClick={confirmHandler} variant={variant} />
                      </>
                    )}
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
};
