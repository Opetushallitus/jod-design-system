import { describe, expect, it } from 'vitest';

import {
  COOKIE_CURRENT_VERSION,
  COOKIE_NAME,
  CookieConsentData,
  readCookieConsent,
  writeCookieConsent,
} from './cookieConsentUtils';

describe('cookieConsentUtils', () => {
  it('returns null when cookie is missing', () => {
    document.cookie = `${COOKIE_NAME}=; max-age=0; path=/`;

    expect(readCookieConsent()).toBeNull();
  });

  it('reads and parses valid consent cookie', () => {
    const data: CookieConsentData = {
      version: COOKIE_CURRENT_VERSION,
      timestamp: 123,
      consent: {
        thirdPartyContent: false,
      },
    };

    document.cookie = `${COOKIE_NAME}=; max-age=0; path=/`;
    document.cookie = `${COOKIE_NAME}=${btoa(JSON.stringify(data))}; path=/`;

    expect(readCookieConsent()).toEqual(data);
  });

  it('returns null for malformed cookie content', () => {
    document.cookie = `${COOKIE_NAME}=; max-age=0; path=/`;
    document.cookie = `${COOKIE_NAME}=not-base64; path=/`;

    expect(readCookieConsent()).toBeNull();
  });

  it('returns null when cookie version is unsupported', () => {
    const invalid = {
      version: '0',
      timestamp: 123,
      consent: {
        thirdPartyContent: true,
      },
    };

    document.cookie = `${COOKIE_NAME}=; max-age=0; path=/`;
    document.cookie = `${COOKIE_NAME}=${btoa(JSON.stringify(invalid))}; path=/`;

    expect(readCookieConsent()).toBeNull();
  });

  it('writes consent cookie with expected payload and attributes', () => {
    const data: CookieConsentData = {
      version: COOKIE_CURRENT_VERSION,
      timestamp: 999,
      consent: {
        thirdPartyContent: true,
      },
    };

    document.cookie = `${COOKIE_NAME}=; max-age=0; path=/`;
    writeCookieConsent(data);

    const parsed = readCookieConsent();
    expect(parsed).toEqual(data);
    expect(document.cookie).toContain(`${COOKIE_NAME}=`);
  });
});
