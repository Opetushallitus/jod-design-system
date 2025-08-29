import { Dialog, DialogPanel } from '@headlessui/react';
import React from 'react';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { tidyClasses as tc } from '../../utils';

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  content: React.ReactNode;
  footer: React.ReactNode;
  progress?: React.ReactNode;
  /** Slot is not used on mobile. */
  sidePanel?: React.ReactNode;
  fullWidthContent?: boolean;
}

/** Modals are containers appearing in front of the main content to provide critical information or an actionable piece of content. */
export const Modal = ({
  open,
  onClose,
  content,
  progress,
  sidePanel,
  footer,
  fullWidthContent = false,
}: ModalProps) => {
  const { sm } = useMediaQueries();
  const id = React.useId();

  /* 204px =   
  40px (gap on top of the screen)
+ 24px (content top padding) 
+ 24px (content bottom padding) 
+ 76px (footer height) 
+ 40px (gap on bottom of the screen)

  ds:sm:max-h-[calc(100vh-204px)] is then the maximum height for the actual content of Modal for desktop
*/
  const heightClasses = `ds:max-h-[calc(100vh-172px)] ds:min-h-[calc(100vh-344px)] ds:sm:max-h-[calc(100vh-204px)]`;

  return (
    <Dialog
      id={`ds-modal-${id}`}
      open={open}
      onClose={() => {
        if (onClose) {
          onClose();
        }
      }}
      className="ds:relative ds:z-50"
    >
      {/* Backdrop */}
      <div className="ds:fixed ds:inset-0 ds:bg-black/30" aria-hidden />
      {/* Wrapper container paddings and margins */}
      <div className="ds:fixed ds:inset-0">
        {/* Wrapper for container centering */}
        <div className="ds:flex ds:items-center ds:justify-center ds:h-full">
          {/* Modal container */}
          <DialogPanel
            id={`ds-modal-panel-${id}`}
            className={tc([
              'ds:flex',
              'ds:flex-col',
              'ds:bg-bg-gray',
              'ds:overflow-hidden',
              'ds:rounded',
              'ds:w-full',
              'ds:max-w-[1092px]',
              'ds:sm:rounded-lg',
            ])}
          >
            {/* Content wrapper */}
            <div
              className={tc([
                heightClasses,
                'ds:grid',
                'ds:max-w-[1092px]',
                'ds:grid-cols-1',
                'ds:gap-6',
                'ds:sm:my-8',
                'ds:my-5',
                'ds:sm:grid-cols-3',
                'ds:px-3',
                'ds:md:px-9',
                'ds:relative',
              ])}
            >
              {/* Main content */}
              {progress && <div className="ds:absolute ds:top-0 ds:right-5 ds:md:right-9">{progress}</div>}
              <div
                className={tc([
                  heightClasses,
                  'ds:col-span-1',
                  'ds:flex',
                  'ds:flex-col',
                  'ds:gap-y-6',
                  'ds:pr-0 sm:ds:pr-5',
                  sidePanel || !fullWidthContent
                    ? 'ds:sm:col-span-2'
                    : 'ds:sm:col-span-3 ds:mr-0 ds:sm:mr-5 ds:md:mr-0',
                  progress && !sm ? 'ds:mt-7 ds:sm:mt-8' : '',
                  'ds:sm:pr-0',
                  sidePanel && progress ? 'ds:sm:mt-8' : '',
                ])}
              >
                <div className={`ds:overflow-y-auto ds:p-0 ds:px-3 sm:ds:p-3 ${progress ? 'ds:sm:mt-0 ds:mt-5' : ''}`}>
                  {content}
                </div>
              </div>
              {/* Side panel */}
              {sm && sidePanel && !fullWidthContent && (
                <div className={`ds:col-span-1 ds:flex ds:flex-col ${heightClasses}`}>
                  <div className={`ds:mr-5 ds:sm:mr-0 ds:overflow-y-auto ${progress ? 'ds:sm:mt-8 ds:mt-6' : ''}`}>
                    {sidePanel}
                  </div>
                </div>
              )}
            </div>
            {/* Footer, button area */}
            <div className="ds:flex ds:bg-bg-gray-2 ds:overflow-x-auto ds:overflow-y-hidden ds:justify-between ds:py-4 ds:sm:py-5 ds:px-4 ds:sm:px-9 ds:z-50">
              {footer}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
