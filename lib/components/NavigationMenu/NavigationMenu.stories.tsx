import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { fn } from 'storybook/test';
import { ServiceVariantProvider } from '../../hooks/useServiceVariant/ServiceVariantProvider';
import { Button } from '../Button/Button';
import { externalLinkSections, languageSelectionItems, menuSection } from './commonStoriesData';
import { NavigationMenu, type NavigationMenuProps } from './NavigationMenu';
import { LinkComponent } from './types';

const meta = {
  title: 'Navigation/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
  argTypes: {
    serviceVariant: {
      control: { type: 'radio' },
      options: ['yksilo', 'ohjaaja', 'tietopalvelu', 'palveluportaali'],
    },
  },
} satisfies Meta<typeof NavigationMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

const parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=16193-157159',
  },
};

const baseProps: NavigationMenuProps = {
  portalLinkLabel: 'Osaamispolkuportaali',
  PortalLinkComponent: ({ children, className }: LinkComponent) => (
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
};

const DefaultRender = (props: NavigationMenuProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <ServiceVariantProvider value={props.serviceVariant}>
      <Button label="Open menu" onClick={() => setIsOpen(true)} variant="white" />
      <NavigationMenu {...props} open={isOpen} onClose={() => setIsOpen(false)} />
    </ServiceVariantProvider>
  );
};

export const Default: Story = {
  parameters: {
    ...parameters,
    docs: {
      description: {
        story: 'NavigationMenu component for displaying a list of links.',
      },
    },
  },
  render: DefaultRender,
  args: {
    ...baseProps,
  },
};

export const WithoutMenuSection: Story = {
  parameters: {
    ...parameters,
    docs: {
      description: {
        story: 'NavigationMenu component without the the main menu section.',
      },
    },
  },
  render: DefaultRender,
  args: {
    ...baseProps,
    menuSection: undefined,
  },
};
