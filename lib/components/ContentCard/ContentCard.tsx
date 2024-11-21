import { tidyClasses as tc } from '../../main';

export interface ContentCardProps {
  title: string;
  description: string;
  tags: string[];
  className?: string;
}

const Tag = ({ label }: { label: string }) => {
  return <li className="ds-px-2 first:ds-pl-0 last:ds-pr-0">{label}</li>;
};

export const ContentCard = ({ title, description, tags, className = '' }: ContentCardProps) => {
  return (
    <div className={tc(`ds-py-4 ds-flex ds-flex-col ds-gap-3 ${className}`)}>
      <div className="ds-text-heading-3">{title}</div>
      <div className="ds-text-body-sm">{description}</div>
      <div className="ds-flex ds-flex-row ds-gap-3 ds-items-center">
        <ul className="ds-text-attrib-value ds-flex ds-flex-row ds-divide-x ds-flex-wrap ds-text-accent">
          {tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </ul>
      </div>
    </div>
  );
};
