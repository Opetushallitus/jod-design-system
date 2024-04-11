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
  /** Icon name from Material Design */
  icon: string;
}

export const RoundLinkButton = ({
  label,
  selected = false,
  className,
  component: Component,
  icon,
  ...rest
}: RoundLinkButtonProps) => {
  return (
    <Component
      {...rest}
      className={`${className ? className : ''} inline-flex min-w-[110px] flex-col items-center justify-center border border-none no-underline`}
    >
      <span
        aria-hidden
        className={`${selected ? 'text-white' : 'text-secondary-gray'} material-symbols-outlined size-48 flex size-[72px] select-none items-center justify-center self-center rounded-full ${selected ? 'bg-[#697077]' : 'bg-[#f5f5f5]'}`}
      >
        {icon}
      </span>
      <span className={`text-sm font-normal ${selected ? 'text-accent' : 'text-primary-gray'}`}>{label}</span>
    </Component>
  );
};
