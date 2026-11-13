/**
 * Known axe violations per story id, as axe rule ids. They are excluded from the
 * failure in a11y.spec.ts until fixed. The test fails if a listed violation no longer
 * occurs, so fixed entries get removed.
 *
 * Found when the a11y checks moved from jest-axe (jsdom) to a real browser, which also
 * checks layout and styles. Do not add entries to hide new violations; fix them instead.
 */
export const KNOWN_VIOLATIONS: Record<string, string[]> = {};
