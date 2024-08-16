import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import React from 'react';

export interface ExpanderProps {
  label: string;
  description: string;
  children?: React.ReactNode;
}

export const Expander = ({ label, description, children }: ExpanderProps) => {
  const labelId = React.useId();

  return (
    <Disclosure as="div" className="ds-rounded-[20px] ds-border-[3px] ds-border-[#767676] ds-p-4">
      {({ open }) => (
        <>
          <DisclosureButton className="ds-flex ds-w-full ds-flex-col">
            <div className="ds-mb-3 ds-flex ds-w-full ds-flex-row ds-justify-between">
              <span id={labelId} className="ds-text-[20px] ds-font-bold ds-text-[#333333]">
                {label}
              </span>
              <span className="material-symbols-outlined size-32 ds-select-none ds-text-secondary-gray">
                {open ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
              </span>
            </div>
            <span className="ds-mb-4 ds-text-start ds-text-[12px] ds-font-bold ds-text-[#767676]">{description}</span>
          </DisclosureButton>
          <DisclosurePanel role="region" aria-labelledby={labelId}>
            {children}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};
