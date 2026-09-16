import { MotionGlobalConfig } from 'motion/react';

let applied = false;

/**
 * Disables Motion animations globally when the user prefers reduced motion.
 *
 * Called at module scope from the components that animate, rather than from the
 * package entry point, so that importing the entry does not pull in `motion`.
 * Idempotent and safe to call in environments without a DOM.
 */
export const applyReducedMotionPreference = (): void => {
  if (applied || typeof globalThis.matchMedia !== 'function') {
    return;
  }
  applied = true;
  if (globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    MotionGlobalConfig.skipAnimations = true;
  }
};
