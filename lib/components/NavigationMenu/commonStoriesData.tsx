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
      LinkComponent: DummyLink,
      selected: true,
    },
    {
      label: 'Kartoita tilanteesi',
      // One left in a long form as an example to remind how to use
      LinkComponent: ({ children, className, ...rest }: LinkComponent) => (
        <a href="/#" className={className} {...rest}>
          {children}
        </a>
      ),
      childItems: [
        {
          label: 'Kartoita tilanteesi',
          LinkComponent: DummyLink,
        },
        {
          label: 'Osaamisen kartoitus',
          LinkComponent: DummyLink,
        },
        {
          label: 'Kiinnostusten kartoitus',
          LinkComponent: DummyLink,
        },
        {
          label: 'Työ- ja koulutusmahdollisuudet',
          LinkComponent: DummyLink,
        },
      ],
    },
    {
      label: 'Osaamisprofiilini',
      LinkComponent: DummyLink,
      childItems: [
        {
          label: 'Osaamisprofiilini',
          LinkComponent: DummyLink,
        },
        {
          label: 'Asetukseni',
          LinkComponent: DummyLink,
        },
        {
          label: 'Suosikkini',
          LinkComponent: DummyLink,
        },
        {
          label: 'Päämääräni',
          LinkComponent: DummyLink,
        },
        {
          label: 'Osaamiseni',
          LinkComponent: DummyLink,
          childItems: [
            {
              label: 'Työpaikkani',
              LinkComponent: DummyLink,
            },
            {
              label: 'Koulutukseni',
              LinkComponent: DummyLink,
            },
            {
              label: 'Vapaa-ajan toimintoni',
              LinkComponent: DummyLink,
            },
            {
              label: 'Muut osaamiseni',
              LinkComponent: DummyLink,
            },
          ],
        },
        {
          label: 'Kiinnostuksen kohteeni',
          LinkComponent: DummyLink,
        },
        {
          label: 'Väliotsikko 2',
        },
        {
          label: 'Lorem ipsum 2',
          LinkComponent: DummyLink,
        },
      ],
    },
    {
      label: 'Väliotsikko',
    },
    {
      label: 'Lorem ipsum',
      LinkComponent: DummyLink,
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
