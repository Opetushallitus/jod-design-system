import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React from 'react';
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
    'text-alert bg-white hover:text-alert active:text-white active:bg-alert focus-visible:text-alert':
      variant === 'destructive',
    'text-black bg-white': variant === 'normal',
  });
};

const Button = ({ label, onClick, variant = 'normal' }: { label: string; onClick?: () => void; variant?: Variant }) => {
  const variantClassNames = getVariantClassNames({ variant });
  return (
    <button
      className={`group flex select-none items-center gap-4 rounded-[30px] px-6 text-button-md hover:text-accent focus-visible:text-accent focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[1.5px] focus-visible:outline-accent active:bg-accent active:text-white active:outline-0 ${variantClassNames}`.trim()}
      onClick={onClick}
    >
      <span className="py-[10px] group-hover:underline group-focus-visible:no-underline group-active:no-underline">
        {label}
      </span>
    </button>
  );
};

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
    onConfirm && onConfirm();
    hideDialog();
  };

  return (
    <>
      {children(showDialog)}
      {isOpen && (
        <Dialog open={isOpen} onClose={hideDialog} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden />
          <div className="fixed inset-0 flex w-screen py-[96px]">
            <div className="flex w-full items-center justify-center">
              <DialogPanel className="overflow-hidden rounded-lg bg-bg-gray">
                <div className="flex max-w-[640px] flex-col p-9">
                  <DialogTitle className="mb-5 text-heading-3 font-poppins">{title}</DialogTitle>
                  <Description className="text-body-sm">{description}</Description>
                  {content && <div className="mt-7">{content}</div>}
                </div>

                <div className="overflow-x-auto overflow-y-hidden bg-bg-gray-2">
                  <div className="flex flex-row gap-5 px-6 py-5 sm:px-9 justify-end">
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
