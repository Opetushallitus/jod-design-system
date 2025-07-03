import React from 'react';
import { RxExternalLink } from 'react-icons/rx';
import { getFocusOutlineClassForService, getPressedColorClassForService, tidyClasses as tc } from '../../../utils';
import { useServiceVariant } from '../hooks/useServiceVariant';
import { MenuSeparator } from './MenuSeparator';

export interface LinkItem {
  label: string;
  url: string;
  description?: string;
  accentColor?: string;
}

export interface ExternalLinkSection {
  title: string;
  linkItems: LinkItem[];
}

const ExternalLinkItem = ({ item }: { item: LinkItem }) => {
  const serviceVariant = useServiceVariant();

  return (
    <li
      key={item.label}
      className={`${item.accentColor ? 'ds:border-l-8' : 'ds:pl-3'} ds:text-button-md ds:flex`}
      style={{ borderColor: item.accentColor }}
    >
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className={tc([
          'ds:ml-3',
          'ds:pl-3',
          'ds:flex',
          'ds:flex-1',
          'ds:space-between',
          'ds:rounded',
          'ds:text-black',
          'ds:active:text-white',
          'ds:hover:bg-bg-gray',
          getFocusOutlineClassForService(serviceVariant),
          getPressedColorClassForService(serviceVariant),
        ])}
      >
        <div className="ds:flex ds:flex-col ds:flex-1 ds:gap-3 ds:py-3 ds:group">
          <div className="ds:flex ds:flex-row ds:gap-3 ds:pr-3">
            <span className="ds:flex ds:flex-1 ds:group-hover:underline">{item.label}</span>
            <RxExternalLink size={24} role="presentation" />
          </div>
          {item.description && <span className="ds:text-body-sm">{item.description}</span>}
        </div>
      </a>
    </li>
  );
};

export const ExternalLinkSections = ({ sections }: { sections: ExternalLinkSection[] }) => {
  return (
    <div>
      {sections.map((section) => (
        <React.Fragment key={section.title}>
          {/* Only show section title if there are link items */}
          <div>
            <MenuSeparator />
            <span className="ds:text-body-sm ds:mb-5 ds:mt-2 ds:flex">{section.title}</span>
            <ul className="ds:gap-3 ds:flex ds:flex-col">
              {section.linkItems.map((item) => (
                <ExternalLinkItem key={item.label} item={item} />
              ))}
            </ul>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
