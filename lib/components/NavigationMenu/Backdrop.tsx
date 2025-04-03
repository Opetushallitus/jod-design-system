import React from 'react';

export interface BackdropProps {
  children: React.ReactNode;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  onClose: () => void;
}

export const Backdrop = ({ children, dialogRef, onClose }: BackdropProps) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const handleClickOutside = (event: React.MouseEvent) => {
    if (dialogRef.current && event.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={dialogRef}
      className="ds:-z-1 ds:flex ds:backdrop:bg-black/30 ds:w-[370px] ds:max-w-full ds:max-h-screen ds:min-h-full ds:overflow-auto ds:overscroll-contain ds:hyphens-auto"
      onKeyDown={handleKeyDown}
      onClick={handleClickOutside}
    >
      {children}
    </dialog>
  );
};
