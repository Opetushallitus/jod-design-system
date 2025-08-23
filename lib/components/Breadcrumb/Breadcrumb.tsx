import React from 'react';
import { cx } from '../../cva';
import { type ServiceVariant } from '../../utils';

export interface BreadcrumbItem {
  id?: string;
  label: string;
  to?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  LinkComponent: React.ComponentType<{ to: string; children: React.ReactNode; className?: string }>;
  ariaLabel?: string;
  serviceVariant: ServiceVariant;
  dataTestId?: string;
}

export const Breadcrumb = ({ items, ariaLabel, LinkComponent, serviceVariant, dataTestId }: BreadcrumbProps) => {
  const textColorClass = cx({
    'ds:text-secondary-1-dark': serviceVariant === 'yksilo',
    'ds:text-secondary-2-dark': serviceVariant === 'ohjaaja',
    'ds:text-secondary-3-dark': serviceVariant === 'palveluportaali',
    'ds:text-secondary-4-dark': serviceVariant === 'tietopalvelu',
  });
  return (
    <nav
      aria-label={ariaLabel}
      className={`ds:text-accent ds:text-[12px] ds:font-bold ds:col-span-3 ds:mb-3 ds:print:hidden ${textColorClass}`}
      data-testid={dataTestId}
    >
      <ol className="ds:flex ds:flex-wrap ds:gap-y-2">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li
              key={item.id ?? item.to ?? item.label}
              className="ds:not-first:before:content-['/'] ds:before:mx-2 ds:before:text-secondary-5"
            >
              {item.to && !isLast ? (
                <span className="ds:underline">
                  <LinkComponent to={item.to}>{item.label}</LinkComponent>
                </span>
              ) : (
                <span className="ds:text-black" aria-current="location">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
