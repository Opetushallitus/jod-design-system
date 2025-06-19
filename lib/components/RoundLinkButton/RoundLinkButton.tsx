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
  /** Icon shown on the link */
  icon: React.ReactNode;
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
      className={`${className ? className : ''} ds:group ds:inline-flex ds:min-w-[64px] ds:sm:min-w-[124px] ds:flex-col ds:items-center ds:justify-center ds:gap-2 ds:border ds:border-none ds:no-underline`.trim()}
    >
      <span
        aria-hidden
        className={`${selected ? 'ds:bg-accent ds:text-white' : 'ds:text-primary-gray ds:bg-bg-gray-2 ds:group-hover:text-accent'} ds:flex ds:size-[64px] ds:select-none ds:items-center ds:justify-center ds:self-center ds:rounded-full`}
      >
        {icon}
      </span>
      <span
        className={`${hideLabel ? 'ds:hidden' : ''} ds:text-button-md ${selected ? 'ds:text-accent' : 'ds:text-primary-gray'} ds:group-hover:text-accent ds:group-hover:underline`.trim()}
      >
        {label}
      </span>
    </Component>
  );
};
