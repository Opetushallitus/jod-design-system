export interface SkipLinkProps {
  label: string;
  hash: string;
}

export const SkipLink = ({ label, hash }: SkipLinkProps) => {
  return (
    <a
      href={hash}
      className="ds-absolute -ds-left-full ds-z-50 ds-m-5 ds-flex ds-rounded-[4px] ds-border-2 ds-border-secondary-gray ds-bg-white ds-p-5 ds-text-body-md ds-text-button-sm ds-text-link hover:ds-text-accent hover:ds-underline focus:ds-left-auto focus:ds-underline focus-visible:ds-outline focus-visible:ds-outline-[3px] focus-visible:ds-outline-offset-[1.5px]"
    >
      {label}
    </a>
  );
};
