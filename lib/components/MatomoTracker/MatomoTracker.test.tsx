/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MatomoTracker } from './MatomoTracker';
import { loadMatomo } from './loadMatomo';

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
});
