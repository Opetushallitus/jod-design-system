import { Pagination as ArkPagination, PaginationRootProps } from '@ark-ui/react';
import { cx } from '../../cva';
import { JodMore, JodPagerNext, JodPagerPrev } from '../../icons';
import { getAccentBgClassForService, ServiceVariant } from '../../utils';

interface GetClassNameProps {
  isActive?: boolean;
  isArrowButton?: boolean;
  disabled?: boolean;
  isEllipsis?: boolean;
  serviceVariant?: ServiceVariant;
}
const getClassName = ({
  isActive = false,
  isArrowButton = true,
  disabled = false,
  isEllipsis = false,
  serviceVariant = 'yksilo',
}: GetClassNameProps) =>
  cx(
    `ds:sm:min-w-[37px] ds:min-h-7 ds:min-w-7 ds:sm:min-h-[37px] ds:p-2 ds:rounded-full ds:flex ds:justify-center ds:items-center`,
    {
      'ds:cursor-pointer': !isEllipsis || !disabled,
      'ds:cursor-default': isEllipsis,
      'ds:disabled:text-inactive-gray ds:disabled:cursor-not-allowed': disabled === true,
      [`${getAccentBgClassForService(serviceVariant)} ds:text-white`]: !isArrowButton && isActive,
      'ds:bg-bg-gray-2 ds:text-primary-gray': !isActive,
      'ds:font-bold': !isArrowButton,
    },
  );

export interface PageChangeDetails {
  page: number;
  pageSize: number;
}

export interface PaginationProps {
  totalItems: number;
  pageSize: number;
  siblingCount: number;
  currentPage: number;
  translations: PaginationRootProps['translations'];
  onPageChange: (details: PageChangeDetails) => void;
  type?: 'button' | 'link';
  ariaLabel?: string;
  serviceVariant?: ServiceVariant;
  dataTestId?: string;
}

/** Pagination component for navigating through a list of items. */
export const Pagination = ({
  totalItems,
  pageSize,
  siblingCount,
  currentPage,
  translations,
  type,
  ariaLabel,
  onPageChange,
  serviceVariant = 'yksilo',
  dataTestId,
}: PaginationProps) => {
  const lastPage = Math.ceil(totalItems / pageSize);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === lastPage;

  return (
    <ArkPagination.Root
      count={totalItems}
      pageSize={pageSize}
      page={currentPage}
      siblingCount={siblingCount}
      translations={translations}
      onPageChange={onPageChange}
      type={type}
      aria-label={ariaLabel}
      className="ds:inline-flex ds:list-none ds:items-center ds:justify-center ds:gap-3"
      data-testid={dataTestId}
    >
      <ArkPagination.PrevTrigger className={getClassName({ disabled: isFirstPage })} disabled={isFirstPage}>
        <JodPagerPrev size={24} />
      </ArkPagination.PrevTrigger>
      <ArkPagination.Context>
        {(pagination) =>
          pagination.pages.map((page, index) =>
            page.type === 'page' ? (
              <ArkPagination.Item
                key={page.value}
                {...page}
                className={getClassName({ isArrowButton: false, isActive: currentPage === page.value, serviceVariant })}
              >
                {page.value}
              </ArkPagination.Item>
            ) : (
              <ArkPagination.Ellipsis
                // The page object for ellipsis does not contain a value, so index must be used as a key.
                // eslint-disable-next-line react/no-array-index-key
                key={`ellipsis_${index}`}
                index={index}
                className={getClassName({ isEllipsis: true })}
              >
                <JodMore size={24} className="ds:rotate-90" />
              </ArkPagination.Ellipsis>
            ),
          )
        }
      </ArkPagination.Context>
      <ArkPagination.NextTrigger className={getClassName({ disabled: isLastPage })} disabled={isLastPage}>
        <JodPagerNext size={24} />
      </ArkPagination.NextTrigger>
    </ArkPagination.Root>
  );
};
