import { RxExternalLink } from 'react-icons/rx';
import { Placeholder } from './Placeholder';

export interface LinkItem {
  label: string;
  url: string;
  description: string;
  accentColor: string;
}

export interface ExternalLinkSection {
  title: string;
  linkItems: LinkItem[];
}

const ExternalLinkItem = ({ item }: { item: LinkItem }) => {
  return (
    <li
      key={item.label}
      className="ds:border-l-[8px] ds:text-button-md ds:flex"
      style={{ borderColor: item.accentColor }}
    >
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="ds:pl-5 ds:flex ds:flex-row ds:flex-1 ds:space-between ds:focus:outline-accent"
      >
        <div className="ds:flex ds:flex-col ds:flex-1 ds:gap-3 ds:py-3 ds:group">
          <div className="ds:flex ds:flex-row">
            <span className="ds:flex ds:flex-1 ds:group-hover:underline">{item.label}</span>
            <RxExternalLink size={24} role="presentation" />
          </div>
          <span className="ds:text-body-sm">{item.description}</span>
        </div>
      </a>
      <Placeholder />
    </li>
  );
};

export const ExternalLinkSections = ({ sections }: { sections: ExternalLinkSection[] }) => {
  return (
    <div>
      {sections.map((section) => (
        <div key={section.title}>
          <span className="ds:text-body-sm ds:mb-5 ds:mt-2 ds:flex">{section.title}</span>
          <ul className="ds:gap-3 ds:flex ds:flex-col">
            {section.linkItems.map((item) => (
              <ExternalLinkItem key={item.label} item={item} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
