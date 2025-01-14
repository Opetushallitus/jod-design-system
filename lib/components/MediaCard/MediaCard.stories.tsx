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

export const Default: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/6M2LrpSCcB0thlFDaQAI2J/cx_jod_client?node-id=2217-8529',
    },
    docs: {
      description: {
        story: 'MediaCard where there is no favorite-button available',
      },
    },
  },
  args: {
    imageSrc: 'https://images.unsplash.com/photo-1523464862212-d6631d073194?q=80&w=260?q=80&w=260',
    imageAlt: 'Woman standing in front of a colourful wall',
    label: 'Tulevaisuusmatka',
    description: 'Tulevaisuusmatka on koulutus, joka auttaa sinua löytämään oman polkusi ja tavoitteesi.',
    tags: ['Taglorem', 'Loremtag', 'Nonutag'],
  },
};

export const AbleToBeFavorited: Story = {
  parameters: {
    docs: {
      description: {
        story: 'MediaCard where the favorite status can be toggled.',
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
    imageSrc: 'https://images.unsplash.com/photo-1523464862212-d6631d073194?q=80&w=260?q=80&w=260',
    imageAlt: 'Woman standing in front of a colourful wall',
    label: 'Tulevaisuusmatka',
    description: 'Tulevaisuusmatka on koulutus, joka auttaa sinua löytämään oman polkusi ja tavoitteesi.',
    tags: ['Taglorem', 'Loremtag', 'Nonutag'],
    isFavorite: true,
    onFavoriteClick: fn(),
    favoriteLabel: 'Poista suosikeista',
  },
};
