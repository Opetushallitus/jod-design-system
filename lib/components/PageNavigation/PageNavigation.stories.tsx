import type { Meta, StoryObj } from '@storybook/react-vite';
import { ServiceVariantProvider } from '../../hooks/useServiceVariant/ServiceVariantProvider';
import type { LinkComponent, MenuListProps, MenuSection } from '../NavigationMenu';
import { PageNavigation } from './PageNavigation';

const meta = {
  title: 'Navigation/PageNavigation',
  component: PageNavigation,
  tags: ['autodocs'],
  argTypes: {
    serviceVariant: {
      control: { type: 'radio' },
      options: ['yksilo', 'ohjaaja', 'tietopalvelu', 'palveluportaali'],
    },
  },
  globals: {
    backgrounds: { value: 'gray', grid: false },
  },
  parameters: {
    controls: {
      exclude: ['menuRef', 'menuSection', 'itemClassname'],
    },
  },
} satisfies Meta<typeof PageNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

const parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=14026-25623',
  },
};

const DummyLink = (props: LinkComponent) => <a href="/#" {...props} />;

const labels = ['Omat sivuni', 'Asetukseni', 'Suosikkini', 'Päämääräni', 'Osaamiseni', 'Kiinnostukseni'];
const osaamiseniLabels = ['Työpaikkani', 'Koulutukseni', 'Vapaa-ajan toimintoni', 'Muut osaaminen'];

const menuSection: MenuSection = {
  title: 'Tässä osiossa',
  linkItems: labels.map((label, index) => ({
    label,
    selected: index === 0,
    linkComponent: DummyLink,
    childItems:
      label === 'Osaamiseni'
        ? osaamiseniLabels.map((osaaminenLabel) => ({
            label: osaaminenLabel,
            linkComponent: DummyLink,
          }))
        : undefined,
  })),
};

const DefaultRender = (props: MenuListProps) => {
  return (
    <ServiceVariantProvider value={props.serviceVariant ?? 'yksilo'}>
      <PageNavigation {...props} />
    </ServiceVariantProvider>
  );
};

export const Default: Story = {
  parameters: {
    ...parameters,
    docs: {
      description: {
        story: 'PageNavigation for internal pages, active indicator is background color.',
      },
    },
  },
  render: DefaultRender,

  args: {
    activeIndicator: 'bg',
    isNested: false,
    itemClassname: '',
    menuRef: undefined,
    menuSection,
    openSubMenuLabel: 'Avaa alivalikko',
    serviceVariant: 'yksilo',
  },
};

export const Collapsed: Story = {
  parameters: {
    ...parameters,
    docs: {
      description: {
        story: 'PageNavigation for internal pages in a collapsed state.',
      },
    },
  },
  render: DefaultRender,

  args: {
    collapsed: true,
    isNested: false,
    itemClassname: '',
    menuRef: undefined,
    menuSection,
    openSubMenuLabel: 'Avaa alivalikko',
    serviceVariant: 'yksilo',
  },
};

export const DotIndicator: Story = {
  parameters: {
    ...parameters,
    docs: {
      description: {
        story: 'PageNavigation for internal pages, active indicator is a dot in accent color.',
      },
    },
  },
  render: DefaultRender,

  args: {
    activeIndicator: 'dot',
    isNested: false,
    itemClassname: '',
    menuRef: undefined,
    menuSection,
    openSubMenuLabel: 'Avaa alivalikko',
    serviceVariant: 'yksilo',
  },
};
