/**
 * Stories that scroll horizontally at 320px (WCAG 1.4.10 Reflow), with the reason. They
 * are excluded from the failure in reflow.spec.ts until fixed. The test fails if a listed
 * story reflows, so fixed entries get removed.
 *
 * Do not add entries to hide new overflow; fix it instead. Only content that genuinely
 * needs two-dimensional layout is exempt from the criterion.
 */
export const KNOWN_REFLOW_ISSUES: Record<string, string> = {
  // Exempt: a showcase table of all variants side by side, not a component layout.
  'components-buttons-button--all-variants': 'Variant showcase table',
};
