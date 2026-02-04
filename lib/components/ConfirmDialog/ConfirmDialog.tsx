import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React from 'react';
import { JSX } from 'react/jsx-runtime';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { tidyClasses as tc } from '../../utils';
import { Button } from '../Button/Button';

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
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  content?: React.ReactNode;
} & FooterProps & { testId?: string };

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
  testId,
}: ConfirmDialogProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const id = React.useId();
  const { sm } = useMediaQueries();
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [mobileHeight, setMobileHeight] = React.useState<'50dvh' | '90dvh'>('50dvh');
  const [isMeasuring, setIsMeasuring] = React.useState(false);

  const getTestId = (suffix: string) => (testId ? `${testId}-${suffix}` : undefined);
  const contentPadding = 'ds:px-5 ds:sm:px-9';

  // Handle mobile height measurement when modal opens
  React.useEffect(() => {
    if (!sm) {
      setIsMeasuring(true);

      requestAnimationFrame(() => {
        if (panelRef.current) {
          const naturalHeight = panelRef.current.scrollHeight;
          const smallHeightThreshold = window.innerHeight * 0.5;

          const height = naturalHeight > smallHeightThreshold ? '90dvh' : '50dvh';
          setMobileHeight(height);
          setIsMeasuring(false);
        }
      });
    }
  }, [isOpen, sm, content, footer]);

  // Reset state when switching to desktop
  React.useEffect(() => {
    if (sm) {
      setMobileHeight('50dvh');
      setIsMeasuring(false);
    }
  }, [sm]);

  // Determine panel height classes based on mobile state
  const getPanelHeightClasses = () => {
    if (isMeasuring) {
      return 'ds:max-h-[90dvh] ds:opacity-0 ds:sm:opacity-100';
    }
    if (mobileHeight === '50dvh') {
      return 'ds:h-[50dvh] ds:opacity-100 ds:sm:h-auto';
    }
    if (mobileHeight === '90dvh') {
      return 'ds:h-[90dvh] ds:opacity-100 ds:sm:h-auto';
    }
    return '';
  };

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

  const descriptionTag = React.useMemo(() => (typeof description === 'string' ? undefined : 'div'), [description]);

  return (
    <>
      {children(showDialog)}
      {isOpen && (
        <Dialog
          arial-labelledby={`ds-confirm-dialog-title-${id}`}
          id={`ds-confirm-dialog-${id}`}
          open={isOpen}
          onClose={() => {
            /* unused on purpose to prevent close on ESC or clicking the dimmed area */
          }}
          className="ds:relative ds:z-50"
          data-testid={testId}
        >
          <div className="ds:fixed ds:inset-0 ds:bg-black/30" aria-hidden data-testid={getTestId('backdrop')} />
          <div className="ds:fixed ds:inset-0 ds:flex ds:w-screen ds:sm:py-[96px]">
            <div className="ds:flex ds:w-full ds:items-end ds:sm:items-center ds:justify-center ds:h-full">
              <DialogPanel
                ref={panelRef}
                id={`ds-confirm-dialog-panel-${id}`}
                className={tc([
                  'ds:flex',
                  'ds:flex-col',
                  'ds:bg-bg-gray',
                  'ds:overflow-hidden',
                  'ds:rounded-t-xl',
                  'ds:sm:rounded-lg',
                  'ds:transition-opacity',
                  'ds:duration-0',
                  'ds:min-h-[270px]',
                  'ds:w-[630px]',
                  'ds:sm:max-h-[80dvh]',
                  getPanelHeightClasses(),
                ])}
                data-testid={getTestId('panel')}
              >
                <div className="ds:flex ds:flex-col ds:flex-1 ds:min-h-0 ds:max-w-[640px]">
                  <div className={tc(['ds:pt-6', 'ds:sm:pt-7', 'ds:pb-5', contentPadding])}>
                    <DialogTitle
                      id={`ds-confirm-dialog-title-${id}`}
                      className="ds:sm:text-[32px] ds:text-[20px] ds:sm:leading-8 ds:leading-[26px] ds:font-semibold"
                    >
                      {title}
                    </DialogTitle>
                  </div>
                  <div
                    className={tc([
                      'ds:overflow-y-auto',
                      'ds:flex',
                      'ds:flex-col',
                      contentPadding,
                      'ds:pb-6',
                      'ds:sm:pb-9',
                    ])}
                  >
                    <Description as={descriptionTag} className="ds:text-body-sm ds:font-arial ds:min-h-[60px]">
                      {description}
                    </Description>
                    {content && <div className="ds:mt-7">{content}</div>}
                  </div>
                </div>

                <div className="ds:shrink-0 ds:overflow-x-auto ds:overflow-y-hidden ds:bg-bg-gray-2">
                  <div className="ds:flex ds:flex-row ds:gap-5 ds:px-6 ds:py-4 ds:sm-py-5 ds:sm:px-9 ds:justify-end">
                    {footer ? (
                      footer(hideDialog)
                    ) : (
                      <>
                        <Button size={sm ? 'lg' : 'sm'} label={cancelText} onClick={hideDialog} />
                        <Button
                          size={sm ? 'lg' : 'sm'}
                          label={confirmText}
                          onClick={confirmHandler}
                          variant={variant === 'destructive' ? 'red-delete' : 'white'}
                        />
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
