interface LinkProps {
  className?: string;
  children: React.ReactNode;
}

type RoundLinkButtonLink = React.ComponentType<LinkProps>;

export interface RoundLinkButtonProps {
  /** Text shown on the link */
  label: string;
  /** Hide label */
  hideLabel?: boolean;
  /** Selected */
  selected?: boolean;
  /** CSS classname */
  className?: string;
  component: RoundLinkButtonLink;
  /** Icon name from Material Design */
  icon: string;
}

/** Button component for single-step user actions. */
export const RoundLinkButton = ({
  label,
  hideLabel = false,
  selected = false,
  className,
  component: Component,
  icon,
  ...rest
}: RoundLinkButtonProps) => {
  return (
    <Component
      {...rest}
      aria-label={label}
      className={`${className ? className : ''} group inline-flex min-w-[64px] sm:min-w-[110px] flex-col items-center justify-center gap-2 border border-none no-underline`.trim()}
    >
      <span
        aria-hidden
        className={`${selected ? 'text-white' : 'text-black'} material-symbols-outlined size-48 group- flex size-[64px] select-none items-center justify-center self-center rounded-full ${selected ? 'bg-accent' : 'bg-bg-gray hover:text-accent'}`}
      >
        {icon}
      </span>
      <span
        className={`${hideLabel ? 'hidden' : ''} text-button-sm ${selected ? 'text-accent' : 'text-black'} group-hover:text-accent group-hover:underline`.trim()}
      >
        {label}
      </span>
    </Component>
  );
};
