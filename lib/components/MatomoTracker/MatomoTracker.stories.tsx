import type { StoryObj } from '@storybook/react-vite';

import type { TitledMeta } from '../../storybook';
import { MatomoTracker } from './MatomoTracker';

const meta = {
  title: 'Misc/MatomoTracker',
  component: MatomoTracker,
  // !test: Renders nothing and loads the Matomo tracker from an external host, so automated tests (e2e/a11y.spec.ts) skip it.
  tags: ['autodocs', '!test'],
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
