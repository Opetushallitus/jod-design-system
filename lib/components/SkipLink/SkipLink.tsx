export interface SkipLinkProps {
  label: string;
  hash: string;
}

export const SkipLink = ({ label, hash }: SkipLinkProps) => {
  return (
    <a
      href={hash}
      className="absolute -left-full z-50 flex rounded-[4px] border-2 border-secondary-gray bg-white p-5 text-body-md text-button-sm text-link hover:text-accent hover:underline focus:left-auto focus:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[1.5px]"
    >
      {label}
    </a>
  );
};
