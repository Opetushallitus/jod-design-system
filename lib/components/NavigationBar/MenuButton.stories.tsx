import type { StoryObj } from '@storybook/react-vite';
import React from 'react';
import type { TitledMeta } from '../../utils';

import { fn } from 'storybook/test';
import { ServiceVariantProvider } from '../../hooks/useServiceVariant';
import { LinkComponent, NavigationMenu, NavigationMenuProps } from '../NavigationMenu';
import { externalLinkSections, languageSelectionItems, menuSection } from '../NavigationMenu/commonStoriesData';
import { MenuButton, MenuButtonProps } from './MenuButton';

const meta = {
  title: 'Navigation/MenuButton',
  component: MenuButton,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof MenuButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const menuProps: NavigationMenuProps = {
  portalLinkLabel: 'Osaamispolkuportaali',
  portalLinkComponent: ({ children, className }: LinkComponent) => (
    <a href="/#" className={className}>
      {children}
    </a>
  ),
  onClose: fn(),
  open: true,
  menuSection: menuSection,
  openSubMenuLabel: 'Avaa alivalikko',
  ariaCloseMenu: 'Sulje valikko',
  externalLinkSections: externalLinkSections,
  languageSelectionItems: languageSelectionItems,
  languageSelectionTitle: 'Käyttökieli',
  selectedLanguage: 'fi',
  serviceVariant: 'yksilo',
  externalLinkIconAriaLabel: 'Linkki johtaa palvelun ulkopuolelle',
};

const DefaultRender = (props: MenuButtonProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <ServiceVariantProvider value="yksilo">
      <MenuButton {...props} onClick={() => setIsOpen(true)} />
      <NavigationMenu {...menuProps} open={isOpen} onClose={() => setIsOpen(false)} />
    </ServiceVariantProvider>
  );
};

export const Default: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=14130-48895',
    },
    docs: {
      description: {
        story: 'Menu button to open the menu',
      },
    },
  },
  render: DefaultRender,
  args: {
    label: 'Valikko',
    onClick: fn(),
  },
  decorators: [
    (Story) => (
      <div className="ds:flex ds:item-center ds:justify-center ds:h-[250px]">
        <Story />
      </div>
    ),
  ],
};
