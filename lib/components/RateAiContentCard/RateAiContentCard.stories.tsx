import type { StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import type { TitledMeta } from '../../utils';
import { RateAiContentCard } from './RateAiContentCard';

const meta = {
  title: 'Cards/RateAiContentCard',
  component: RateAiContentCard,
  tags: ['autodocs'],
} satisfies TitledMeta<typeof RateAiContentCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const render = (args: Story['args']) => {
  const { onSubmit, ...rest } = args;
  return <RateAiContentCard {...rest} onSubmit={onSubmit} />;
};

export const Default: Story = {
  render,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=17660-164446',
    },
    docs: {
      description: {
        story: 'This is a card component for displaying a text with a label.',
      },
    },
  },
  args: {
    translations: {
      card: {
        title: 'Arvioi sinulle ehdotettuja mahdollisuuksia',
        aiLabel: 'Tekoälyn tuottamaa sisältöä',
        content:
          'Tällä sivulla ehdotetaan syöttämiesi tietojen perusteella sinulle sopivia mahdollisuuksia. Kerro miten onnistuimme',
        likeLabel: 'Tykkää painike',
        dislikeLabel: 'Älä tykkää painike',
      },
      modal: {
        close: 'Sulje',
        send: 'Lähetä',
        sending: 'Lähetetään',
        title: 'Tarkenna palautettasi',
        description: (
          <>
            <p>Olemme käyttäneet tämän sivun sisällön luomisessa hyödyksi kielimallia seuraavissa kohdissa:</p>
            <ul className="ds:list-disc ds:ml-5">
              <li>työmahdollisuudet,</li>
              <li>koulutusmahdollisuudet,</li>
              <li>mahdollisuuksien sopivuuden laskeminen.</li>
            </ul>
            <br />
            <p>
              Voisitko kertoa tarkemmin, mikä ei toiminut? Palautteesi auttaa meitä kehittämään sekä sisällön laatua
              että tekoälyn toimintaa.
            </p>
          </>
        ),
        placeholder: 'Esim. sisältö epätarkkaa, ei vastannut tarvetta, väärä sävy...',
      },
    },
    onSubmit: fn(async (data) => {
      return new Promise<void>((resolve) => {
        console.log('Submitted data:', data);
        setTimeout(() => {
          console.log('Submission processed');
          resolve();
        }, 2000);
      });
    }),
  },
};
