import { Pagination as ArkPagination, PaginationRootProps } from '@ark-ui/react';
import { cx } from '../../cva';

const getClassName = ({ isActive = false, isArrowButton = true, disabled = false } = {}) =>
  cx(`min-w-7 min-h-7 p-2 rounded-full text-button-smflex bg-bg-gray text-black`, {
    'bg-accent text-white': !isArrowButton && isActive,
    'material-symbols-outlined': isArrowButton,
    'disabled:text-inactive-gray disabled:cursor-not-allowed': disabled === true,
    'font-bold': !isArrowButton,
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
      className="inline-flex list-none items-center justify-center gap-3"
    >
      <button
        onClick={() => onPageChange({ page: 1, pageSize })}
        className={getClassName({ disabled: isFirstPage })}
        disabled={isFirstPage}
        type="button"
      >
        <span className="sr-only">{translations.firstPageTriggerLabel}</span>
        <span aria-hidden>first_page</span>
      </button>

      <ArkPagination.PrevTrigger className={getClassName({ disabled: isFirstPage })} disabled={isFirstPage}>
        <span className="sr-only">{translations.prevTriggerLabel}</span>
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
        <span className="sr-only">{translations.nextTriggerLabel}</span>
        <span aria-hidden>chevron_right</span>
      </ArkPagination.NextTrigger>

      <button
        onClick={() => onPageChange({ page: lastPage, pageSize })}
        className={getClassName({ disabled: isLastPage })}
        disabled={isLastPage}
        type="button"
      >
        <span className="sr-only">{translations.lastPageTriggerLabel}</span>
        <span aria-hidden>last_page</span>
      </button>
    </ArkPagination.Root>
  );
};
