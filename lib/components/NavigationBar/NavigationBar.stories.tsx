import type { StoryObj } from '@storybook/react-vite';
import { MdExpandMore, MdLanguage, MdMenu, MdPersonOutline } from 'react-icons/md';
import { useMediaQueries } from '../../main';
import type { TitledMeta } from '../../utils';
import { NavigationBar } from './NavigationBar';

const meta = {
  title: 'Navigation/NavigationBar',
  component: NavigationBar,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof NavigationBar>;

export default meta;

type Story = StoryObj<typeof meta>;

const parameters = {
  layout: 'fullscreen',
  viewport: {
    defaultViewport: 'desktop',
  },
};

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="ds:pb-7">
        <Story />
      </div>
    ),
  ],

  parameters: {
    ...parameters,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=11387-38805',
    },
    docs: {
      description: {
        story: 'This is a light navigation bar with logo, menu, language, and user buttons.',
      },
    },
  },
  args: {
    renderLink: ({ children }) => <a href="#">{children}</a>,
    logo: {
      to: '/',
      language: 'fi',
      srText: 'JOD',
    },
  },
  render: (args) => {
    const { sm } = useMediaQueries();
    const menuComponent = (
      <button
        className="ds:flex ds:sm:flex-row ds:flex-col ds:gap-2 ds:justify-center ds:items-center ds:select-none ds:cursor-pointer"
        aria-label="Avaa valikko"
      >
        <MdMenu size={24} className="ds:mx-auto" />
        <span className="ds:md:pr-3 ds:sm:text-[12px] ds:text-[10px]">Valikko</span>
      </button>
    );

    const languageButtonComponent = (
      <button className="ds:flex ds:sm:flex-row ds:flex-col ds:gap-2 ds:justify-center ds:items-center ds:select-none ds:cursor-pointer">
        <MdLanguage size={24} className="ds:mx-auto" />
        <span className="ds:whitespace-nowrap ds:sm:text-[12px] ds:text-[10px]">Suomeksi</span>
        {sm && <MdExpandMore size={20} />}
      </button>
    );

    const userButtonComponent = (
      <button className="ds:flex ds:sm:flex-row ds:flex-col ds:gap-2 ds:justify-center ds:items-center ds:select-none ds:cursor-pointer">
        <MdPersonOutline size={24} className="ds:mx-auto" />
        <span className="ds:whitespace-nowrap ds:sm:text-[12px] ds:text-[10px]">Juho-Henrik</span>
        {sm && <MdExpandMore size={20} />}
      </button>
    );

    return (
      <NavigationBar
        {...args}
        userButtonComponent={userButtonComponent}
        languageButtonComponent={languageButtonComponent}
        menuComponent={menuComponent}
      />
    );
  },
};
