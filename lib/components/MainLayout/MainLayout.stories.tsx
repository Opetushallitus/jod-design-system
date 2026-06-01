import type { StoryObj } from '@storybook/react-vite';

import { ServiceVariantProvider } from '../../hooks/useServiceVariant';
import { useMediaQueries } from '../../main';
import type { TitledMeta } from '../../utils';
import { LinkComponent, MenuSection } from '../NavigationMenu';
import { PageNavigation } from '../PageNavigation/PageNavigation';
import { MainLayout } from './MainLayout';

const meta = {
  title: 'Content/MainLayout',
  component: MainLayout,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof MainLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

// Not as a component in Figma

const sections = [
  {
    navTitle: 'Description',
    showDivider: false,
    showAiInfoInTitle: true,
    content: <p className="ds:font-arial ds:text-body-md ds:whitespace-pre-line"></p>,
  },
  {
    navTitle: 'Most common tasks',
    showDivider: false,
    showAiInfoInTitle: true,
    content: (
      <ul className="ds:ml-7 ds:list-disc">
        <li key="aaa" className="ds:text-capitalize ds:font-arial ds:text-body-md ds:text-primary-gray">
          A
        </li>
        <li key="bbb" className="ds:text-capitalize ds:font-arial ds:text-body-md ds:text-primary-gray">
          B
        </li>
        <li key="ccc" className="ds:text-capitalize ds:font-arial ds:text-body-md ds:text-primary-gray">
          C
        </li>
      </ul>
    ),
  },
];

// oxlint-disable-next-line jsx_a11y/anchor-has-content jsx_a11y/anchor-is-valid
const DummyLink = (props: LinkComponent) => <a href="#" {...props} />;

const menuSection: MenuSection = {
  title: 'On this page',
  linkItems: sections.map((section) => ({
    label: section.navTitle,
    linkComponent: DummyLink,
  })),
};

const navChildren = (
  <ServiceVariantProvider value="yksilo">
    <div className="ds:flex ds:flex-col ds:gap-6">
      <PageNavigation menuSection={menuSection} activeIndicator="dot" />
    </div>
  </ServiceVariantProvider>
);

const DefaultRender = (args: Story['args']) => {
  const { lg } = useMediaQueries();

  return (
    <div className="ds:bg-bg-gray">
      <MainLayout {...args}>
        <div className="ds:px-5">
          {!lg && menuSection.linkItems.length > 0 && (
            <ServiceVariantProvider value="yksilo">
              <div className="ds:mb-8 ds:print:hidden">
                <PageNavigation menuSection={menuSection} collapsed />
              </div>
            </ServiceVariantProvider>
          )}
          <div className="ds:mt-6">Test content</div>
        </div>
      </MainLayout>
    </div>
  );
};

export const Default: Story = {
  render: DefaultRender,
  parameters: {
    docs: {
      description: {
        story: 'MainLayout with minimal implementation',
      },
    },
  },
  args: {
    children: <div>Test content</div>,
    breadcrumbComponent: null,
    navChildren: navChildren,
  },
};
