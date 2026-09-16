import type { Meta } from '@storybook/react-vite';

export type StoryBookCategory =
  | 'Buttons'
  | 'Cards'
  | 'Content'
  | 'Forms'
  | 'Images'
  | 'Misc'
  | 'Navigation'
  | 'Popups'
  | 'Lists';
export type ValidTitle = `${StoryBookCategory}/${string}`;
export type TitledMeta<T> = Meta<T> & {
  title: ValidTitle;
};
