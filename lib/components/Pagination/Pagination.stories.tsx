import { PaginationItemLabelDetails } from '@ark-ui/react';
import type { StoryObj } from '@storybook/react-vite';
import { useState } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import type { TitledMeta } from '../../utils';
import { Pagination } from './Pagination';

const meta = {
  title: 'Content/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    controls: {
      exclude: ['translations', 'onPageChange'],
    },
  },
  argTypes: {
    serviceVariant: {
      control: { type: 'radio' },
      options: ['yksilo', 'ohjaaja', 'tietopalvelu', 'palveluportaali'],
    },
  },
} satisfies TitledMeta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

const render = (args: Story['args']) => {
  const { currentPage, onPageChange, ...rest } = args;
  const [pageNumber, setPageNumber] = useState<number>(currentPage);
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
