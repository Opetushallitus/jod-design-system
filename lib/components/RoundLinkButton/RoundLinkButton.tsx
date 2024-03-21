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
      <div
        className={`size-[72px] rounded-full border border-transparent no-underline hover:ring hover:ring-purple-500 ${selected ? 'bg-[#697077]' : 'bg-[#f5f5f5]'}`}
      >
        <Component {...rest} aria-labelledby={labelId}>
          {/** TODO: Need real icons and alignment and styles to be adjusted then */}
          <span
            aria-hidden={true}
            className={`flex select-none justify-center pt-1 text-5xl ${selected ? 'text-[#ffffff]' : 'text-[#4d5358]'}`}
          >
            &#9776;
          </span>
        </Component>
      </div>
      <span id={labelId} className={'flex justify-center text-sm font-normal'}>
        {label}
      </span>
    </div>
  );
};
