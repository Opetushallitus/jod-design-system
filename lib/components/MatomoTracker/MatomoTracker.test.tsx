// oxlint-disable vitest/require-mock-type-parameters
// oxlint-disable typescript/no-misused-spread
import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { loadMatomo } from './loadMatomo';
import { MatomoTracker } from './MatomoTracker';

vi.mock('./loadMatomo', () => ({
  loadMatomo: vi.fn(),
}));

describe('MatomoTracker', () => {
  const trackerUrl = 'https://matomo.example.com/';
  const siteId = 1;
  let originalLocation: Location;

  beforeEach(() => {
    originalLocation = window.location;
    delete (window as any).location;
    (window as any).location = {
      ...originalLocation,
      href: 'https://example.com/test',
      assign: vi.fn(),
      replace: vi.fn(),
    };
    document.title = 'Test Title';
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    });
  });

  it('calls loadMatomo with correct arguments', () => {
    render(<MatomoTracker trackerUrl={trackerUrl} siteId={siteId} pathname="/foo" />);
    expect(loadMatomo).toHaveBeenCalledWith(trackerUrl, siteId);
  });

  it('does nothing if window._paq is undefined', () => {
    (window as any)._paq = undefined;
    render(<MatomoTracker trackerUrl={trackerUrl} siteId={siteId} pathname="/foo" />);
    expect(window._paq).toBeUndefined();
  });

  it('tracks page view with URL without query parameters', () => {
    (window as any).location = {
      ...window.location,
      href: 'https://example.com/test?foo=bar&baz=qux',
      origin: 'https://example.com',
      pathname: '/test',
    };
    const paq: unknown[] = [];
    (window as any)._paq = paq;
    render(<MatomoTracker trackerUrl={trackerUrl} siteId={siteId} pathname="/test" />);
    expect(paq).toContainEqual(['setCustomUrl', 'https://example.com/test']);
    expect(paq).not.toContainEqual(['setCustomUrl', 'https://example.com/test?foo=bar&baz=qux']);
  });

  it('does not include query parameters in setCustomUrl even when present', () => {
    (window as any).location = {
      ...window.location,
      href: 'https://example.com/page?token=secret',
      origin: 'https://example.com',
      pathname: '/page',
    };
    const paq: unknown[] = [];
    (window as any)._paq = paq;
    render(<MatomoTracker trackerUrl={trackerUrl} siteId={siteId} pathname="/page" />);
    const setCustomUrlCall = (paq as unknown[][]).find(([cmd]) => cmd === 'setCustomUrl');
    expect(setCustomUrlCall?.[1]).toBe('https://example.com/page');
  });
});
