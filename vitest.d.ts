import '@testing-library/jest-dom/vitest';

// Vitest 5 no longer picks up the global `jest.Matchers` augmentations, so the matchers
// used in tests are declared on Vitest's own `Assertion` interface.
declare module 'vitest' {
  interface Assertion {
    toHaveNoViolations(): void;
  }
}
