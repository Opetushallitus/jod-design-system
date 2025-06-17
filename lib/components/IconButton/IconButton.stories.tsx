import type { StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import type { TitledMeta } from '../../utils';
import { IconButton } from './IconButton';

const meta = {
  title: 'Buttons/IconButton',
  component: IconButton,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const Icon = () => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="18px"
      width="18px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path>
    </svg>
  );
};

const render = (args: Story['args']) => {
  return <IconButton {...args} icon={<Icon />} />;
};

export const Base: Story = {
  render,
  args: {
    label: 'Filter',
    onClick: fn(),
    icon: null,
  },
};
