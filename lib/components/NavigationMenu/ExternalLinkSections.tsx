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
    <li key={item.label} className="ds:border-l-[8px] ds:text-button-md" style={{ borderColor: item.accentColor }}>
      <div className="ds:pl-5  ds:flex ds:flex-row ds:space-between">
        <div className="ds:flex ds:flex-col ds:flex-1 ds:gap-3 ds:py-3 ds:group">
          <div className="ds:flex ds:flex-row">
            <span className="ds:flex ds:flex-1 ds:group-hover:underline">{item.label}</span>
            <span>
              <RxExternalLink size={24} />
            </span>
          </div>
          <span className="ds:text-body-sm">{item.description}</span>
        </div>
        <Placeholder />
      </div>
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
