import { JodHome } from '../../icons';
import { ExternalLinkSection } from './components/ExternalLinkSections';
import { MenuSection } from './components/MenuList';
import { DummyLangLink, DummyLink } from './storyDummyLinks';
import { LinkComponent } from './types';

export const menuSection: MenuSection = {
  title: 'Osaamispolkuni',
  linkItems: [
    {
      icon: <JodHome size={24} />,
      label: 'Osaamispolkuni',
      linkComponent: DummyLink,
      selected: true,
    },
    {
      label: 'Kartoita tilanteesi',
      // One left in a long form as an example to remind how to use
      linkComponent: ({ children, className, ...rest }: LinkComponent) => (
        <a href="/#" className={className} {...rest}>
          {children}
        </a>
      ),
      childItems: [
        {
          label: 'Kartoita tilanteesi',
          linkComponent: DummyLink,
        },
        {
          label: 'Osaamisen kartoitus',
          linkComponent: DummyLink,
        },
        {
          label: 'Kiinnostusten kartoitus',
          linkComponent: DummyLink,
        },
        {
          label: 'Työ- ja koulutusmahdollisuudet',
          linkComponent: DummyLink,
        },
      ],
    },
    {
      label: 'Osaamisprofiilini',
      linkComponent: DummyLink,
      childItems: [
        {
          label: 'Osaamisprofiilini',
          linkComponent: DummyLink,
        },
        {
          label: 'Asetukseni',
          linkComponent: DummyLink,
        },
        {
          label: 'Suosikkini',
          linkComponent: DummyLink,
        },
        {
          label: 'Päämääräni',
          linkComponent: DummyLink,
        },
        {
          label: 'Osaamiseni',
          linkComponent: DummyLink,
          childItems: [
            {
              label: 'Työpaikkani',
              linkComponent: DummyLink,
            },
            {
              label: 'Koulutukseni',
              linkComponent: DummyLink,
            },
            {
              label: 'Vapaa-ajan toimintoni',
              linkComponent: DummyLink,
            },
            {
              label: 'Muut osaamiseni',
              linkComponent: DummyLink,
            },
          ],
        },
        {
          label: 'Kiinnostuksen kohteeni',
          linkComponent: DummyLink,
        },
        {
          label: 'Väliotsikko 2',
        },
        {
          label: 'Lorem ipsum 2',
          linkComponent: DummyLink,
        },
      ],
    },
    {
      label: 'Väliotsikko',
    },
    {
      label: 'Lorem ipsum',
      linkComponent: DummyLink,
    },
  ],
};

export const externalLinkSections: ExternalLinkSection[] = [
  {
    title: 'Osaamispolun sisältökokonaisuudet',
    linkItems: [
      {
        label: 'Ohjaajan osio',
        url: 'https://www.example.com',
        description: 'Ohjausalasta kiinnostuneille',
        accentColor: '#00818A',
      },
      {
        label: 'Tietopalvelu',
        url: 'https://www.example.com',
        description: 'Tietoa päätöksentekijöille',
        accentColor: '#AD4298',
      },
    ],
  },
];

export const languageSelectionItems = [
  {
    label: 'Suomeksi',
    value: 'fi',
    linkComponent: (props: LinkComponent) => <DummyLangLink href="#?lang=fi" {...props} />,
  },
  {
    label: 'På svenska',
    value: 'sv',
    linkComponent: (props: LinkComponent) => <DummyLangLink href="#?lang=sv" {...props} />,
  },
  {
    label: 'In English',
    value: 'en',
    linkComponent: (props: LinkComponent) => <DummyLangLink href="#?lang=en" {...props} />,
  },
];
