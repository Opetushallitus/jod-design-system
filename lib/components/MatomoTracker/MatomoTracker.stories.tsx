import type { StoryObj } from '@storybook/react-vite';
import type { TitledMeta } from '../../utils';

import { MatomoTracker } from './MatomoTracker';

const meta = {
  title: 'Misc/MatomoTracker',
  component: MatomoTracker,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof MatomoTracker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trackerUrl: 'https://analytiikka.opintopolku.fi',
    siteId: 37,
    pathname: '/',
  },
};
