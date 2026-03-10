import type { Meta } from '@storybook/react-vite';
import { TargetAndTransition } from 'motion';

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

// Service variant color tokens - single source of truth for service-specific colors
export const serviceColors = {
  yksilo: {
    bg: 'ds:bg-secondary-1-dark',
    bgActive: 'ds:active:bg-secondary-1-dark-2',
    border: 'ds:border-secondary-1-dark',
    text: 'ds:text-secondary-1-dark',
    textHover: 'ds:hover:text-secondary-1-dark',
    textActive: 'ds:active:text-secondary-1-dark-2',
    textFocus: 'ds:focus-visible:text-secondary-1-dark',
    outline: 'ds:focus-visible:outline-secondary-1-dark',
  },
  ohjaaja: {
    bg: 'ds:bg-secondary-2-dark',
    bgActive: 'ds:active:bg-secondary-2-dark-2',
    border: 'ds:border-secondary-2-dark',
    text: 'ds:text-secondary-2-dark',
    textHover: 'ds:hover:text-secondary-2-dark',
    textActive: 'ds:active:text-secondary-2-dark-2',
    textFocus: 'ds:focus-visible:text-secondary-2-dark',
    outline: 'ds:focus-visible:outline-secondary-2-dark',
  },
  palveluportaali: {
    bg: 'ds:bg-secondary-gray',
    bgActive: 'ds:active:bg-primary-gray',
    border: 'ds:border-secondary-gray',
    text: 'ds:text-secondary-gray',
    textHover: 'ds:hover:text-secondary-3-dark',
    textActive: 'ds:active:text-secondary-3-dark-2',
    textFocus: 'ds:focus-visible:text-secondary-3-dark',
    outline: 'ds:focus-visible:outline-secondary-gray',
  },
  tietopalvelu: {
    bg: 'ds:bg-secondary-4-dark',
    bgActive: 'ds:active:bg-secondary-4-dark-2',
    border: 'ds:border-secondary-4-dark',
    text: 'ds:text-secondary-4-dark',
    textHover: 'ds:hover:text-secondary-4-dark',
    textActive: 'ds:active:text-secondary-4-dark-2',
    textFocus: 'ds:focus-visible:text-secondary-4-dark',
    outline: 'ds:focus-visible:outline-secondary-4-dark',
  },
} as const;

// Utility functions to get CSS classes based on service variant

export const getAccentBgClassForService = (variant: ServiceVariant) => serviceColors[variant].bg;

export const getAccentBorderClassForService = (variant: ServiceVariant) => serviceColors[variant].border;

export const getPressedBgColorClassForService = (variant: ServiceVariant) => serviceColors[variant].bgActive;

export const getTextColorClassForService = (variant: ServiceVariant) => serviceColors[variant].text;

export const getFocusOutlineClassForService = (variant: ServiceVariant) => serviceColors[variant].outline;

export const getTruthyValuesAsString = (...ids: string[]) => {
  const filteredIds = ids.filter(Boolean);
  return filteredIds.length > 0 ? filteredIds.join(' ') : undefined;
};

export interface ModalAnimations {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
}

export type AnimationMode = 'single' | 'stacked-background' | 'stacked-foreground';

/**
 * Calculate modal animations based on animation mode and device type
 * @param animationMode - The animation mode determining how the modal should animate
 * @param isMobile - Whether the device is mobile (affects slide direction)
 * @returns Panel and backdrop animations for the modal
 */
export function getModalAnimations(
  animationMode: AnimationMode,
  isMobile: boolean,
): { panelAnimations: ModalAnimations; backdropAnimations: ModalAnimations | null } {
  const slideDistance = isMobile ? '100vh' : '-100vh'; // Mobile: from bottom, Desktop: from top

  switch (animationMode) {
    case 'single':
      // Single modal: slides in from top (desktop) or bottom (mobile)
      return {
        panelAnimations: {
          initial: { y: slideDistance, transition: { duration: 0.3, ease: 'easeIn' } },
          animate: { y: 0, transition: { duration: 0.3, ease: 'easeIn' } },
          exit: { y: slideDistance, transition: { duration: 0.3, ease: 'easeOut' } },
        },
        backdropAnimations: {
          initial: { opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } },
          animate: { opacity: 1, transition: { duration: 0.3, ease: 'easeIn' } },
          exit: { opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } },
        },
      };

    case 'stacked-background':
      // Background modal when foreground modal opens: scales down and fades out
      // Uses easeOut to start quickly so it syncs with foreground modal's easeIn
      // Exit: restore visibility first, then slide away
      return {
        panelAnimations: {
          initial: { scale: 1, opacity: 1, transition: { duration: 0.3, ease: 'easeIn' } },
          animate: { scale: 0.9, opacity: 0, transition: { duration: 0.3, ease: 'easeIn', delay: 0.05 } },
          exit: {
            scale: 1,
            opacity: 1,
            y: slideDistance,
            transition: { duration: 0.3, ease: 'easeOut' },
          },
        },
        backdropAnimations: {
          // Backdrop stays visible at full opacity during stacking, fades out on exit
          initial: { opacity: 1 },
          animate: { opacity: 1 },
          exit: { opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } },
        },
      };

    case 'stacked-foreground':
      // Foreground modal: slides in like single modal but without backdrop
      // When transitioning from stacked-background to stacked-foreground, Framer Motion
      // automatically animates scale/opacity back to defaults (1, 1) creating the restore effect
      return {
        panelAnimations: {
          initial: { y: slideDistance, transition: { duration: 0.3, ease: 'easeIn' } },
          animate: { y: 0, transition: { duration: 0.3, ease: 'easeIn' } },
          exit: { y: slideDistance, transition: { duration: 0.3, ease: 'easeOut' } },
        },
        backdropAnimations: null, // Uses background modal's backdrop
      };

    default:
      // Fallback to single mode
      return getModalAnimations('single', isMobile);
  }
}
