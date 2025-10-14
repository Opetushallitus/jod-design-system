import type { Meta } from '@storybook/react-vite';
import { cx } from './cva';

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

// Utility functions to get CSS classes based on service variant
export const getAccentBgClassForService = (variant: ServiceVariant) =>
  cx({
    'ds:bg-secondary-1-dark': variant === 'yksilo',
    'ds:bg-secondary-2-dark': variant === 'ohjaaja',
    'ds:bg-secondary-gray': variant === 'palveluportaali',
    'ds:bg-secondary-4-dark': variant === 'tietopalvelu',
  });

export const getPressedBgColorClassForService = (variant: ServiceVariant) =>
  cx({
    'ds:active:bg-secondary-1-dark-2': variant === 'yksilo',
    'ds:active:bg-secondary-2-dark-2': variant === 'ohjaaja',
    'ds:active:bg-primary-gray': variant === 'palveluportaali',
    'ds:active:bg-secondary-4-dark-2': variant === 'tietopalvelu',
  });

export const getTextColorClassForService = (variant: ServiceVariant) =>
  cx({
    'ds:text-secondary-1-dark': variant === 'yksilo',
    'ds:text-secondary-2-dark': variant === 'ohjaaja',
    'ds:text-secondary-gray': variant === 'palveluportaali',
    'ds:text-secondary-4-dark': variant === 'tietopalvelu',
  });

export const getFocusOutlineClassForService = (variant: ServiceVariant) =>
  cx({
    'ds:focus-visible:outline-secondary-1-dark': variant === 'yksilo',
    'ds:focus-visible:outline-secondary-2-dark': variant === 'ohjaaja',
    'ds:focus-visible:outline-secondary-gray': variant === 'palveluportaali',
    'ds:focus-visible:outline-secondary-4-dark': variant === 'tietopalvelu',
  });

export const getTruthyValuesAsString = (...ids: string[]) => {
  const filteredIds = ids.filter(Boolean);
  return filteredIds.length > 0 ? filteredIds.join(' ') : undefined;
};
