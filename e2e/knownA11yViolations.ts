/**
 * Known axe violations per story id, as axe rule ids. They are excluded from the
 * failure in a11y.spec.ts until fixed. The test fails if a listed violation no longer
 * occurs, so fixed entries get removed.
 *
 * Found when the a11y checks moved from jest-axe (jsdom) to a real browser, which also
 * checks layout and styles. Do not add entries to hide new violations; fix them instead.
 */
export const KNOWN_VIOLATIONS: Record<string, string[]> = {
  // Icon-only trigger button has no accessible name.
  'components-buttons-aiinfobutton--default': ['button-name'],
  'components-popups-tooltip--focus-or-hover': ['button-name'],

  // Floating UI focus guards (aria-hidden spans with tabindex) around the tooltip.
  'components-popups-tooltip--default': ['aria-hidden-focus'],

  // Text contrast below 4.5:1.
  'components-cards-herocard--small-with-action-button': ['color-contrast'],
  'components-content-emptystate--default': ['color-contrast'],
  'components-popups-note--confirmation-note': ['color-contrast'],
  'components-popups-note--long-title-text': ['color-contrast'],

  // Card links/tags: accessible name does not contain the visible text, and tag links
  // are smaller than the 24px minimum touch target.
  'components-cards-cardcarousel--default': ['label-content-name-mismatch', 'target-size'],
  'components-cards-cardcarousel--different-card-height': ['label-content-name-mismatch', 'target-size'],
  'components-cards-mediacard--default': ['label-content-name-mismatch', 'target-size'],
  'components-cards-mediacard--horizontal': ['label-content-name-mismatch', 'target-size'],
  'components-cards-mediacard--multiple': ['label-content-name-mismatch', 'target-size'],
  'components-cards-mediacard--able-to-be-favorited-vertical': ['label-content-name-mismatch', 'target-size'],
  'components-cards-mediacard--able-to-be-favorited-horizontal': ['label-content-name-mismatch', 'target-size'],

  // User button: accessible name does not contain the visible text.
  'components-navigation-navigationbar--default': ['label-content-name-mismatch'],
  'components-navigation-userbutton--default': ['label-content-name-mismatch'],
  'components-navigation-userbutton--user-in-profile': ['label-content-name-mismatch'],
};
