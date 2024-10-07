import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Pagination, PaginationProps } from './Pagination';

describe('Pagination', () => {
  const mockTranslations = {
    prevTriggerLabel: 'Previous',
    nextTriggerLabel: 'Next',
  };

  const mockOnPageChange = vi.fn();

  afterEach(() => {
    mockOnPageChange.mockReset();
  });

  const renderPagination = (props: PaginationProps) =>
    render(
      <Pagination
        totalItems={props.totalItems}
        pageSize={props.pageSize}
        siblingCount={props.siblingCount}
        currentPage={props.currentPage}
        translations={props.translations}
        onPageChange={mockOnPageChange}
      />,
    );

  it('renders the pagination component with correct number of pages without ellipsis', () => {
    const props: PaginationProps = {
      totalItems: 100,
      pageSize: 25,
      siblingCount: 4,
      currentPage: 1,
      translations: mockTranslations,
      onPageChange: mockOnPageChange,
    };

    const { container } = renderPagination(props);

    const pageElements = screen.getAllByRole('button', { name: /[0-9]+/ });
    expect(pageElements.length).toBe(4);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the pagination component with correct number of pages with ellipsis', () => {
    const props: PaginationProps = {
      totalItems: 100,
      pageSize: 10,
      siblingCount: 1,
      currentPage: 1,
      translations: mockTranslations,
      onPageChange: mockOnPageChange,
    };

    const { container } = renderPagination(props);

    const pageElements = screen.getAllByRole('button', { name: /[0-9]+/ });
    expect(pageElements.length).toBe(6);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('calls onPageChange when a page is clicked', async () => {
    const props: PaginationProps = {
      totalItems: 100,
      pageSize: 10,
      siblingCount: 1,
      currentPage: 1,
      translations: mockTranslations,
      onPageChange: mockOnPageChange,
    };

    renderPagination(props);

    const pageElement = screen.getByRole('button', { name: '2' });
    pageElement.click();
    await waitFor(() => expect(mockOnPageChange).toHaveBeenCalledWith({ page: 2, pageSize: 10 }));
  });

  it('goes to first page', async () => {
    const props: PaginationProps = {
      totalItems: 100,
      pageSize: 5,
      siblingCount: 1,
      currentPage: 5,
      translations: mockTranslations,
      onPageChange: mockOnPageChange,
    };

    renderPagination(props);

    const pageElement = screen.getByRole('button', { name: '1' });
    pageElement.click();
    await waitFor(() => expect(mockOnPageChange).toHaveBeenCalledWith({ page: 1, pageSize: 5 }));
  });

  it('goes to last page', async () => {
    const props: PaginationProps = {
      totalItems: 100,
      pageSize: 5,
      siblingCount: 1,
      currentPage: 1,
      translations: mockTranslations,
      onPageChange: mockOnPageChange,
    };

    renderPagination(props);

    const pageElement = screen.getByRole('button', { name: '20' });
    pageElement.click();
    await waitFor(() => expect(mockOnPageChange).toHaveBeenCalledWith({ page: 20, pageSize: 5 }));
  });
});
