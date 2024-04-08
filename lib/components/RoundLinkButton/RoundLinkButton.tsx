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
        className={`border-transparent hover:ring-purple-500 size-[72px] rounded-full border no-underline hover:ring ${selected ? 'bg-[#697077]' : 'bg-[#f5f5f5]'}`}
      >
        <Component {...rest} aria-labelledby={labelId}>
          {/** TODO: Need real icons and alignment and styles to be adjusted then */}
          <span
            aria-hidden={true}
            className={`text-5xl flex select-none justify-center pt-1 ${selected ? 'text-[#ffffff]' : 'text-[#4d5358]'}`}
          >
            &#9776;
          </span>
        </Component>
      </div>
      <span id={labelId} className={'text-sm flex justify-center font-normal'}>
        {label}
      </span>
    </div>
  );
};
