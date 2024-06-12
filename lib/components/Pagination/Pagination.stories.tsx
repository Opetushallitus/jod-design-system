import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';
import { fn } from '@storybook/test';
import React from 'react';
import { PaginationItemLabelDetails } from '@ark-ui/react';

const meta = {
  title: 'Pagination',
  component: Pagination,
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

const render = (args: Story['args']) => {
  const { currentPage, onPageChange, ...rest } = args;
  const [pageNumber, setPageNumber] = React.useState<number>(currentPage);
  return (
    <Pagination
      currentPage={pageNumber}
      onPageChange={(newPage) => {
        setPageNumber(newPage.page);
        onPageChange(newPage);
      }}
      {...rest}
    />
  );
};

const url = 'https://www.figma.com/file/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=542%3A6678';
const translations = {
  prevTriggerLabel: 'Edellinen',
  nextTriggerLabel: 'Seuraava',
  itemLabel: (item: PaginationItemLabelDetails) => `Sivu ${item.page}`,
  firstPageTriggerLabel: 'Ensimmäinen sivu',
  lastPageTriggerLabel: 'Viimeinen sivu',
};

export const Default: Story = {
  render,
  parameters: {
    design: {
      type: 'figma',
      url,
    },
    docs: {
      description: {
        story: 'Pagination component for navigating between pages.',
      },
    },
  },
  args: {
    totalItems: 30,
    pageSize: 20,
    currentPage: 1,
    siblingCount: 2,
    onPageChange: fn(),
    translations,
  },
};

export const Ellipsis: Story = {
  render,
  parameters: {
    design: {
      type: 'figma',
      url,
    },
    docs: {
      description: {
        story: 'Pagination when there are more pages than can be displayed.',
      },
    },
  },
  args: {
    totalItems: 5000,
    pageSize: 20,
    currentPage: 1,
    siblingCount: 2,
    onPageChange: fn(),
    translations,
  },
};
