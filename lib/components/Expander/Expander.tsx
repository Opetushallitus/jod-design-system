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
    <Disclosure as="div" className="rounded-[20px] border-[3px] border-[#767676] p-4">
      {({ open }) => (
        <>
          <DisclosureButton className="flex w-full flex-col">
            <div className="mb-3 flex w-full flex-row justify-between">
              <span id={labelId} className="text-[20px] font-bold text-[#333333]">
                {label}
              </span>
              <span className="material-symbols-outlined size-32 select-none text-secondary-gray">
                {open ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
              </span>
            </div>
            <span className="mb-4 text-start text-[12px] font-bold text-[#767676]">{description}</span>
          </DisclosureButton>
          <DisclosurePanel role="region" aria-labelledby={labelId}>
            {children}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};
