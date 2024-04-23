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
      className={`${className ? className : ''} group inline-flex min-w-[110px] flex-col items-center justify-center gap-2 border border-none no-underline`}
    >
      <span
        aria-hidden
        className={`${selected ? 'text-white' : 'text-primary-gray'} material-symbols-outlined size-48 group- flex size-[72px] select-none items-center justify-center self-center rounded-full ${selected ? 'bg-accent' : 'bg-bg-gray hover:text-accent'}`}
      >
        {icon}
      </span>
      <span
        className={`text-button-sm ${selected ? 'text-accent' : 'text-primary-gray'} group-hover:text-accent group-hover:underline`}
      >
        {label}
      </span>
    </Component>
  );
};
