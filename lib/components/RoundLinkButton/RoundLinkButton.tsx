import { useId } from 'react';

interface LinkProps {
  className?: string;
  children: React.ReactNode;
}

type RoundLinkButtonLink = React.ComponentType<LinkProps>;

export interface RoundLinkButtonProps {
  /** Text shown on the link */
  label: string;
  /** Selected */
  selected?: boolean;
  /** CSS classname */
  className?: string;
  component: RoundLinkButtonLink;
}

export const RoundLinkButton = ({
  label,
  selected = false,
  className,
  component: Component,
  ...rest
}: RoundLinkButtonProps) => {
  const labelId = useId();
  return (
    <div className={`${className ? className : ''} flex flex-col items-center justify-center px-1`.trim()}>
      <Component
        {...rest}
        aria-labelledby={labelId}
        className={`flex size-[72px] justify-center rounded-full border border-none no-underline hover:ring hover:ring-accent focus:outline-none focus:ring focus:hover:border-none ${selected ? 'bg-[#697077]' : 'bg-[#f5f5f5]'}`}
      >
        {/** TODO: Need real icons and alignment and styles to be adjusted then */}
        <span
          aria-hidden={true}
          className={`select-none text-[42px] ${selected ? 'text-[#ffffff]' : 'text-[#4d5358]'}`}
        >
          &#9776;
        </span>
      </Component>
      <span id={labelId} className={'text-sm flex justify-center font-normal'}>
        {label}
      </span>
    </div>
  );
};
