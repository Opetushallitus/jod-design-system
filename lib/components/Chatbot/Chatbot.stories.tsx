import type { StoryObj } from '@storybook/react';
import { TitledMeta } from '../../utils';
import { Chatbot } from './Chatbot';

const meta = {
  title: 'Misc/Chatbot',
  component: Chatbot,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
} satisfies TitledMeta<typeof Chatbot>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    agent: '2c134474-326f-4456-9139-8e585a569a9a',
    language: 'fi',
    agentIcon: '/chatbot-icon.svg',
    header: 'Neuvontabotti',
    openWindowText: 'Kysy neuvoa?',
    agentName: 'Neuvontabotti',
    errorMessage: 'Tapahtui jokin virhe.',
    greeting: 'Hei, olen Osaamispolun neuvontabotti.',
    textInputPlaceholder: 'Kirjoita kysymyksesi tähän',
    textInputHelper: 'Ole hyvä ja odota edellisen vastauksen valmistumista.',
    eraseChatHistory: 'Tyhjennä keskusteluhistoria',
    saveChatAsCsv: 'Tallenna keskustelu CSV-tiedostona',
    close: 'Sulje',
  },
};
