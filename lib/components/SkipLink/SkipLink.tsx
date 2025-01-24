export interface SkipLinkProps {
  label: string;
  hash: string;
}

export const SkipLink = ({ label, hash }: SkipLinkProps) => {
  return (
    <a
      href={hash}
      className="ds:absolute ds:-left-full ds:z-50 ds:m-5 ds:flex ds:rounded-[4px] ds:border-2 ds:border-secondary-gray ds:bg-white ds:p-5 ds:text-body-md ds:font-arial ds:text-button-sm ds:text-link ds:hover:text-accent ds:hover:underline ds:focus:left-auto ds:focus:underline ds:focus-visible:outline ds:focus-visible:outline-[3px] ds:focus-visible:outline-offset-[1.5px]"
    >
      {label}
    </a>
  );
};
