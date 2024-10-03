import { Pagination as ArkPagination, PaginationRootProps } from '@ark-ui/react';
import { MdChevronLeft, MdChevronRight, MdFirstPage, MdLastPage, MdMoreHoriz } from 'react-icons/md';
import { cx } from '../../cva';

const getClassName = ({ isActive = false, isArrowButton = true, disabled = false } = {}) =>
  cx(`ds-min-w-7 ds-min-h-7 ds-p-2 ds-rounded-full`, {
    'disabled:ds-text-inactive-gray disabled:ds-cursor-not-allowed': disabled === true,
    'ds-bg-accent ds-text-white': !isArrowButton && isActive,
    'ds-bg-bg-gray-2 ds-text-black': !isActive,
    'ds-font-bold': !isArrowButton,
  });

export interface PaginationProps {
  totalItems: number;
  pageSize: number;
  siblingCount: number;
  currentPage: number;
  translations: PaginationRootProps['translations'] & { firstPageTriggerLabel?: string; lastPageTriggerLabel?: string };
  onPageChange: (details: ArkPagination.PageChangeDetails) => void;
  type?: 'button' | 'link';
}

/** Pagination component for navigating through a list of items. */
export const Pagination = ({
  totalItems,
  pageSize,
  siblingCount,
  currentPage,
  translations,
  type,
  onPageChange,
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
      className="ds-inline-flex ds-list-none ds-items-center ds-justify-center ds-gap-3"
    >
      <button
        onClick={() => onPageChange({ page: 1, pageSize })}
        className={getClassName({ disabled: isFirstPage })}
        disabled={isFirstPage}
        type="button"
      >
        <span className="ds-sr-only">{translations.firstPageTriggerLabel}</span>
        <MdFirstPage size={24} />
      </button>

      <ArkPagination.PrevTrigger className={getClassName({ disabled: isFirstPage })} disabled={isFirstPage}>
        <span className="ds-sr-only">{translations.prevTriggerLabel}</span>
        <MdChevronLeft size={24} />
      </ArkPagination.PrevTrigger>
      <ArkPagination.Context>
        {(pagination) =>
          pagination.pages.map((page, index) =>
            page.type === 'page' ? (
              <ArkPagination.Item
                key={page.value}
                {...page}
                className={getClassName({ isArrowButton: false, isActive: currentPage === page.value })}
              >
                {page.value}
              </ArkPagination.Item>
            ) : (
              <ArkPagination.Ellipsis key={`ellipsis_${index}`} index={index} className={getClassName()}>
                <MdMoreHoriz size={24} />
              </ArkPagination.Ellipsis>
            ),
          )
        }
      </ArkPagination.Context>
      <ArkPagination.NextTrigger className={getClassName({ disabled: isLastPage })} disabled={isLastPage}>
        <span className="ds-sr-only">{translations.nextTriggerLabel}</span>
        <MdChevronRight size={24} />
      </ArkPagination.NextTrigger>

      <button
        onClick={() => onPageChange({ page: lastPage, pageSize })}
        className={getClassName({ disabled: isLastPage })}
        disabled={isLastPage}
        type="button"
      >
        <span className="ds-sr-only">{translations.lastPageTriggerLabel}</span>
        <MdLastPage size={24} />
      </button>
    </ArkPagination.Root>
  );
};
