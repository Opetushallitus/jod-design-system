import type { Meta, StoryObj } from '@storybook/react';

import { useState } from '@storybook/preview-api';
import { fn } from '@storybook/test';
import { MediaCard } from './MediaCard';

const meta = {
  title: 'Cards/MediaCard',
  component: MediaCard,
  tags: ['autodocs'],
} satisfies Meta<typeof MediaCard>;

export default meta;

type Story = StoryObj<typeof meta>;
const imageSrc = 'https://images.unsplash.com/photo-1523464862212-d6631d073194?q=80&w=260';

export const Default: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-8529',
    },
    docs: {
      description: {
        story: 'Vertical MediaCard where there is no favorite-button available',
      },
    },
  },
  args: {
    imageSrc,
    imageAlt: 'Woman standing in front of a colourful wall',
    label: 'Tulevaisuusmatka',
    description: 'Tulevaisuusmatka on koulutus, joka auttaa sinua löytämään oman polkusi ja tavoitteesi.',
    tags: ['Taglorem', 'Loremtag', 'Nonutag'],
  },
};

export const Horizontal: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-8529',
    },
    docs: {
      description: {
        story: 'Horizontal MediaCard where there is no favorite-button available',
      },
    },
  },
  args: {
    variant: 'horizontal',
    imageSrc,
    imageAlt: 'Woman standing in front of a colourful wall',
    label: 'Tulevaisuusmatka',
    description: 'Tulevaisuusmatka on koulutus, joka auttaa sinua löytämään oman polkusi ja tavoitteesi.',
    tags: ['Taglorem', 'Loremtag', 'Nonutag'],
  },
};

export const Multiple: Story = {
  render: (args) => {
    const longTitle = 'Otsikko joka aina vain jatkuu ja jatkuu ja rivittyy';
    const shortTitle = 'Lyhyt otsikko';
    const longDescription = 'Teksti joka on tosi pitkä, eikä se mahdu millään yhdelle tai edes kahdelle riville.';
    const shortDescription = 'Tosi vähän tekstiä';
    return (
      <div className="ds:flex ds:flex-row ds:gap-4">
        <MediaCard {...args} label={longTitle} description={longDescription} />
        <MediaCard {...args} label={longTitle} description={shortDescription} />
        <MediaCard {...args} label={shortTitle} description={longDescription} tags={args.tags.slice(0, 3)} />
        <MediaCard {...args} label={shortTitle} description={shortDescription} tags={[]} />
      </div>
    );
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-8529',
    },
    docs: {
      description: {
        story: `Group of Vertical MediaCards with different lengths of title, description and tags.`,
      },
    },
  },
  args: {
    imageSrc,
    imageAlt: 'Woman standing in front of a colourful wall',
    label: 'Otsikko joka aina vain jatkuu ja jatkuu ja rivittyy',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam adipiscin amet consectetur.',
    tags: ['Taglorem', 'Loremtag', 'Nonutag', 'Dolortag', 'Tagamet', 'Nullatag'],
  },
};

const getAbleToBeFavorite = (description: string, variant: 'horizontal' | 'vertical'): Story => {
  return {
    parameters: {
      docs: {
        description: {
          story: description,
        },
      },
      design: {
        type: 'figma',
        url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-8529',
      },
    },
    render: (args) => {
      const [isFavorite, setFavorite] = useState(true);
      return (
        <MediaCard
          {...args}
          favoriteLabel={isFavorite ? 'Poista suosikeista' : 'Lisää suosikkeihin'}
          isFavorite={isFavorite}
          onFavoriteClick={() => setFavorite(!isFavorite)}
        />
      );
    },
    args: {
      variant,
      imageSrc,
      imageAlt: 'Woman standing in front of a colourful wall',
      label: 'Tulevaisuusmatka',
      description: 'Tulevaisuusmatka on koulutus, joka auttaa sinua löytämään oman polkusi ja tavoitteesi.',
      tags: ['Taglorem', 'Loremtag', 'Nonutag'],
      isFavorite: true,
      onFavoriteClick: fn(),
      favoriteLabel: 'Poista suosikeista',
    },
  };
};

export const AbleToBeFavoritedVertical: Story = getAbleToBeFavorite(
  'Vertical MediaCard where the favorite status can be toggled.',
  'vertical',
);

export const AbleToBeFavoritedHorizontal: Story = getAbleToBeFavorite(
  'Horizontal MediaCard where the favorite status can be toggled.',
  'horizontal',
);
