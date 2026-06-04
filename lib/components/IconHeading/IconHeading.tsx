import React from 'react';

interface IconHeadingProps {
  icon: React.ReactNode;
  title: React.ReactNode;
  testId?: string;
  bgClassName?: string;
  textClassName?: string;
}

export const IconHeading = ({
  icon,
  title,
  testId,
  bgClassName = 'ds:bg-secondary-1-dark',
  textClassName = 'ds:text-secondary-1-dark',
}: IconHeadingProps) => {
  return (
    <div className="ds:mb-6 ds:flex ds:items-start ds:gap-x-4 ds:sm:mb-6">
      {icon && (
        <span
          aria-hidden="true"
          className={`ds:flex ds:size-9 ds:items-center ds:justify-center ds:aspect-square ds:rounded-full ds:text-white ${bgClassName} ds:print:hidden`}
        >
          {icon}
        </span>
      )}
      <h1
        data-testid={testId}
        className={`ds:text-hero-mobile ds:text-pretty ds:wrap-break-word ds:hyphens-auto ds:focus:outline-0 ds:sm:text-hero ${textClassName}`}
      >
        {title}
      </h1>
    </div>
  );
};
