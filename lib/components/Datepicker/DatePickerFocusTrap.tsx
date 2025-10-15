import { FocusTrap } from 'focus-trap-react';

export const DatepickerFocusTrap = ({ children, active }: { children: React.ReactNode; active: boolean }) => {
  return (
    <FocusTrap
      active={active}
      focusTrapOptions={{
        initialFocus: false,
        escapeDeactivates: true,
        clickOutsideDeactivates: true,
        checkCanFocusTrap: async (containers) => {
          return new Promise((resolve) => {
            let tries = 0;
            const check = () => {
              const el = containers[0].querySelector('[data-scope="date-picker"][data-part="view-control"]') as
                | HTMLDivElement
                | undefined;

              if (el || tries > 10) {
                resolve();
              } else {
                setTimeout(check, 10);
                tries += 1;
              }
            };
            check();
          });
        },
      }}
    >
      {children}
    </FocusTrap>
  );
};
