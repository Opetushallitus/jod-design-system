import { MdArrowForward } from 'react-icons/md';

interface InfoLinkProps {
  to: string;
  label: string;
  LinkComponent: MoreInfoProps['LinkComponent'];
}

const LinkItem = ({ to, label, LinkComponent }: InfoLinkProps) => (
  <li>
    <LinkComponent to={to} className="ds:flex ds:justify-center ds:gap-4 ds:text-button-md-mobile ds:sm:text-button-md">
      <span>{label}</span>
      <MdArrowForward size={24} />
    </LinkComponent>
  </li>
);

interface Link {
  to: string;
  label: string;
}

export interface MoreInfoProps {
  title: string;
  description: string;
  language: string;
  links: Link[];
  LinkComponent: React.ComponentType<{ children: React.ReactNode; className?: string; to: string }>;
}

export const MoreInfo = ({ title, description, language, LinkComponent, links }: MoreInfoProps) => {
  return (
    <div className="ds:flex ds:justify-start ds:text-white ds:bg-[#333] ds:py-6">
      <div className="ds:w-[1092px] ds:mx-auto ds:px-5 ds:sm:px-6">
        <div className="ds:flex ds:flex-col">
          <div className="ds:text-heading-2-mobile ds:sm:text-heading-2 ds:mb-3">{title}</div>
          <p className="ds:text-body-sm-mobile ds:sm:text-body-sm ds:mb-6">{description}</p>
          <ul className="ds:flex ds:flex-col ds:gap-3 ds:justify-start ds:items-start">
            {links.map((link) => (
              <LinkItem
                key={link.label}
                to={`/${language}/${link.to}`}
                label={link.label}
                LinkComponent={LinkComponent}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
