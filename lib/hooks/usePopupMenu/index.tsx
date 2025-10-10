import React from 'react';

interface UsePopupMenuOptions {
  closeOnEscape?: boolean;
  closeOnClickOutside?: boolean;
  closeOnFocusOut?: boolean;
}

export const usePopupMenu = (options: UsePopupMenuOptions = {}) => {
  const { closeOnEscape = true, closeOnClickOutside = true, closeOnFocusOut = true } = options;

  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const close = React.useCallback(() => setIsOpen(false), []);
  const open = React.useCallback(() => setIsOpen(true), []);
  const toggle = React.useCallback(() => setIsOpen((prev) => !prev), []);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        close();
        triggerRef.current?.focus();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (!closeOnClickOutside) {
        return;
      }

      const target = event.target as Node;
      const isClickInsideTrigger = triggerRef.current?.contains(target);
      const isClickInsideMenu = menuRef.current?.contains(target);

      if (!isClickInsideTrigger && !isClickInsideMenu) {
        close();
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      if (!closeOnFocusOut) {
        return;
      }

      const relatedTarget = event.relatedTarget as Node | null;
      const isFocusInsideTrigger = triggerRef.current?.contains(relatedTarget);
      const isFocusInsideMenu = menuRef.current?.contains(relatedTarget);

      if (!isFocusInsideTrigger && !isFocusInsideMenu) {
        close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, [isOpen, close, closeOnEscape, closeOnClickOutside, closeOnFocusOut]);

  return {
    isOpen,
    open,
    close,
    toggle,
    triggerRef,
    menuRef,
    triggerProps: {
      ref: triggerRef,
      onClick: toggle,
      'aria-expanded': isOpen,
      'aria-haspopup': true,
    },
    menuProps: {
      ref: menuRef,
    },
  };
};
