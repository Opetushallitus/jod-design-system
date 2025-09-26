import type { StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'storybook/preview-api';
import type { TitledMeta } from '../../utils';

import React from 'react';
import { LanguageButton } from './LanguageButton';

const meta = {
  title: 'Navigation/LanguageButton',
  component: LanguageButton,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof LanguageButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const Render = (args: Story['args']) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const handleBlur = () => setLangMenuOpen(false);
  return (
    <LanguageButton
      {...args}
      onClick={() => setLangMenuOpen(!langMenuOpen)}
      langMenuOpen={langMenuOpen}
      menuRef={menuRef}
      onMenuBlur={handleBlur}
      onMenuClick={() => setLangMenuOpen(false)}
    />
  );
};

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
    supportedLanguageCodes: ['fi', 'sv', 'en'],
    translations: {
      fi: { change: 'Vaihda kieli.', label: 'Suomeksi' },
      sv: { change: 'Andra språk.', label: 'På svenska' },
      en: { change: 'Change language.', label: 'In English' },
    },
    onClick: () => {},
    langMenuOpen: false,
    menuRef: React.createRef(),
    onMenuBlur: () => {},
    onMenuClick: () => {},
    language: 'fi',
    generateLocalizedPath: (code: string) => `/${code}`,
    LinkComponent: ({ children, className, ...rest }) => (
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
  render: Render,
};
