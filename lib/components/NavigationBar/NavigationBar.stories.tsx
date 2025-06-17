import type { StoryObj } from '@storybook/react-vite';
import { MdExpandMore, MdLanguage, MdMenu, MdPersonOutline } from 'react-icons/md';
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
    menuComponent: (
      <button
        className="ds:flex ds:gap-2 ds:justify-center ds:items-center ds:select-none ds:cursor-pointer"
        aria-label="Avaa valikko"
      >
        <span className="ds:size-7 ds:flex ds:justify-center ds:items-center">
          {}
          <MdMenu size={24} />
        </span>
        <span className="ds:py-3 ds:pr-3">Valikko</span>
      </button>
    ),
    languageButtonComponent: (
      <button className="ds:flex ds:gap-2 ds:justify-center ds:items-center ds:select-none ds:cursor-pointer">
        <span className="ds:size-7 ds:flex ds:justify-center ds:items-center">
          <MdLanguage size={24} />
        </span>
        <span className="ds:py-3 ds:whitespace-nowrap">Suomeksi</span>
        <span className="ds:size-7 ds:flex ds:justify-center ds:items-center">
          <MdExpandMore size={24} />
        </span>
      </button>
    ),
    userButtonComponent: (
      <button className="ds:flex ds:gap-2 ds:justify-center ds:items-center ds:select-none ds:cursor-pointer">
        <span className="ds:size-7 ds:flex ds:justify-center ds:items-center">
          <MdPersonOutline size={24} />
        </span>
        <span className="ds:py-3 ds:whitespace-nowrap">Juho Henrik Anttila</span>
        <span className="ds:size-7 ds:flex ds:justify-center ds:items-center">
          <MdExpandMore size={24} />
        </span>
      </button>
    ),
  },
};
