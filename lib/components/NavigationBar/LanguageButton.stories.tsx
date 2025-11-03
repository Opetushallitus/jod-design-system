import type { StoryObj } from '@storybook/react-vite';
import type { TitledMeta } from '../../utils';

import { LanguageButton } from './LanguageButton';

const meta = {
  title: 'Navigation/LanguageButton',
  component: LanguageButton,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof LanguageButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=17454-164370',
    },
    docs: {
      description: {
        story: 'Language button component for switching languages.',
      },
    },
  },
  args: {
    serviceVariant: 'yksilo',
    supportedLanguageCodes: ['fi', 'sv', 'en'],
    translations: {
      fi: { change: 'Vaihda kieli.', label: 'Suomeksi' },
      sv: { change: 'Andra språk.', label: 'På svenska' },
      en: { change: 'Change language.', label: 'In English' },
    },
    language: 'fi',
    generateLocalizedPath: (code: string) => `/${code}`,
    linkComponent: ({ children, className, ...rest }) => (
      <a href="/#" className={className} {...rest}>
        {children}
      </a>
    ),
  },
  decorators: [
    (Story) => (
      <div className="ds:flex ds:item-center ds:justify-center ds:h-[250px]">
        <Story />
      </div>
    ),
  ],
};
