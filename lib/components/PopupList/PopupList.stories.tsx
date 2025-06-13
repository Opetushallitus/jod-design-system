import type { StoryObj } from '@storybook/react-vite';
import type { TitledMeta } from '../../utils';
import { PopupList, PopupListItem } from './PopupList';

const meta = {
  title: 'Lists/PopupList',
  component: PopupList,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof PopupList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default popup list behavior with links.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-7341&t=5Uc1JYa0GCm43PGV-4',
    },
  },
  args: {
    children: (
      <>
        <PopupListItem>
          <a href="/#">Omat sivut</a>
        </PopupListItem>
        <PopupListItem>
          <button onClick={console.log} className="ds:cursor-pointer">
            Kirjaudu ulos
          </button>
        </PopupListItem>
      </>
    ),
  },
};
