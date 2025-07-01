import type { Meta } from '@storybook/react-vite';

/**
 * Tidies up a string (or array of strings) of CSS class names by removing any extra whitespace and empty strings
 * @param classNames String or a list of strings
 * @returns Tidied up string of CSS class names
 */
export const tidyClasses = (classNames: string | string[]): string =>
  Array.isArray(classNames) ? tidyClasses(classNames.join(' ')) : classNames?.replace(/\s+/g, ' ').trim();

/**
 * Clamps a number between a minimum and maximum value
 * @param value Number value
 * @param min Minimum value
 * @param max Maximum value
 * @returns Value clamped between min and max
 */
export const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

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
export type ServiceVariant = 'yksilo' | 'ohjaaja' | 'tietopalvelu' | 'palveluportaali';
