const focusHistory: string[] = [];

export const addToFocusHistory = (id: string) => {
  focusHistory.push(id);
};

export const returnFocus = () => {
  if (focusHistory.length > 0) {
    const elementIdToFocus = focusHistory.pop();
    if (elementIdToFocus) {
      const button = document.querySelector(`[data-list-id="${elementIdToFocus}"] button`);
      if (button && button instanceof HTMLButtonElement) {
        setTimeout(() => {
          button.focus();
        }, 0);
      }
      return true;
    }
  }
  return false;
};

export const menuFocusManager = {
  addToFocusHistory,
  returnFocus,
};
