import { useId } from 'react';
import { Disclosure } from '@headlessui/react';

export interface ExpanderProps {
  label: string;
  description: string;
  children?: React.ReactNode;
}

export const Expander = ({ label, description, children }: ExpanderProps) => {
  const labelId = useId();

  return (
    <Disclosure as="div" className="rounded-[20px] border-[3px] border-[#767676] p-4">
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full flex-col">
            <div className="mb-3 flex w-full flex-row justify-between">
              <span id={labelId} className="text-[20px] font-bold text-[#333333]">
                {label}
              </span>
              <CaretDownIcon className={open ? 'rotate-180' : undefined} />
            </div>
            <span className="mb-4 text-start text-[12px] font-bold text-[#767676]">{description}</span>
          </Disclosure.Button>
          <Disclosure.Panel role="region" aria-labelledby={labelId}>
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

const CaretDownIcon = ({ className }: { className?: string }) => (
  <svg width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M1.08521 1.56995L8.19521 8.56995L15.3052 1.56995" stroke="#767676" strokeWidth="3" />
  </svg>
);
