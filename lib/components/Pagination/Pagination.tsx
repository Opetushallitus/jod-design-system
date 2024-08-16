import { Pagination as ArkPagination, PaginationRootProps } from '@ark-ui/react';
import { cx } from '../../cva';

const getClassName = ({ isActive = false, isArrowButton = true, disabled = false } = {}) =>
  cx(`ds-min-w-7 ds-min-h-7 ds-p-2 ds-rounded-full ds-bg-bg-gray-2 ds-text-black`, {
    'ds-bg-accent ds-text-white': !isArrowButton && isActive,
    'material-symbols-outlined': isArrowButton,
    'disabled:ds-text-inactive-gray disabled:ds-cursor-not-allowed': disabled === true,
    'ds-font-poppins ds-font-bold': !isArrowButton,
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
        <span aria-hidden>first_page</span>
      </button>

      <ArkPagination.PrevTrigger className={getClassName({ disabled: isFirstPage })} disabled={isFirstPage}>
        <span className="ds-sr-only">{translations.prevTriggerLabel}</span>
        <span aria-hidden>chevron_left</span>
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
                <span aria-hidden>more_horiz</span>
              </ArkPagination.Ellipsis>
            ),
          )
        }
      </ArkPagination.Context>
      <ArkPagination.NextTrigger className={getClassName({ disabled: isLastPage })} disabled={isLastPage}>
        <span className="ds-sr-only">{translations.nextTriggerLabel}</span>
        <span aria-hidden>chevron_right</span>
      </ArkPagination.NextTrigger>

      <button
        onClick={() => onPageChange({ page: lastPage, pageSize })}
        className={getClassName({ disabled: isLastPage })}
        disabled={isLastPage}
        type="button"
      >
        <span className="ds-sr-only">{translations.lastPageTriggerLabel}</span>
        <span aria-hidden>last_page</span>
      </button>
    </ArkPagination.Root>
  );
};
