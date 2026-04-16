import '@testing-library/jest-dom/vitest';
import React from 'react';

import { toHaveNoViolations } from 'jest-axe';
import { expect, vi } from 'vitest';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

Element.prototype.scrollTo = vi.fn();

// Mock Framer Motion
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, initial, animate, exit, transition, ...props }: Record<string, unknown>) =>
      React.createElement('div', props as React.HTMLAttributes<HTMLDivElement>, children as React.ReactNode),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

expect.extend(toHaveNoViolations);
