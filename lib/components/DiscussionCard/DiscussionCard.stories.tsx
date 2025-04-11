import type { StoryObj } from '@storybook/react';
import type { TitledMeta } from '../../utils';

import { useState } from '@storybook/preview-api';
import { DiscussionCard } from './DiscussionCard';

const meta = {
  title: 'Cards/DiscussionCard',
  component: DiscussionCard,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof DiscussionCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-8613&t=wQbfg5RSeRDJM45w-4',
    },
    docs: {
      description: {
        story: 'This is a discussion card component for displaying comment messages.',
      },
    },
  },
  render: (args) => {
    const [likes, setLikes] = useState(args.likes);
    return <DiscussionCard {...args} likes={likes} onClickLike={() => setLikes(likes + 1)} />;
  },
  args: {
    author: 'Pirkko Järvi',
    date: '2024-11-07T07:24:55.591Z',
    likes: 0,
    message:
      'Magna consectetur qui eiusmod dolor ad pariatur incididunt excepteur reprehenderit voluptate proident id. Minim sint elit non consequat mollit pariatur cupidatat. Minim occaecat qui veniam sit aliquip eu culpa duis id sit.',
  },
};
