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
        className={`${selected ? 'bg-accent text-white' : 'text-black bg-bg-gray-2 group-hover:text-accent'} material-symbols-outlined size-48 flex size-[64px] select-none items-center justify-center self-center rounded-full`}
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
