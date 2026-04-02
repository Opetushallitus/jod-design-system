export const COOKIE_NAME = 'COOKIE_CONSENT';
export const COOKIE_CURRENT_VERSION = '1';

export type CookieOptionalCategory = 'thirdPartyContent';
export type CookieConsent = Record<CookieOptionalCategory, boolean>;

export interface CookieConsentData {
  version: string;
  timestamp: number;
  consent: CookieConsent;
}

/** Reads and parses the cookie consent cookie. Returns null if not found or malformed. */
export const readCookieConsent = (): CookieConsentData | null => {
  try {
    const match = document.cookie
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${COOKIE_NAME}=`));
    if (!match) {
      return null;
    }

    const encoded = match.slice(COOKIE_NAME.length + 1);
    const json = atob(encoded);
    const parsed = JSON.parse(json) as CookieConsentData;
    if (parsed.version !== COOKIE_CURRENT_VERSION || !parsed.consent) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
};

/** Writes the consent data to the cookie. Cookie is valid for 1 year. */
export const writeCookieConsent = (data: CookieConsentData): void => {
  const json = JSON.stringify(data);
  const encoded = btoa(json);
  const maxAge = 365 * 24 * 60 * 60;
  document.cookie = `${COOKIE_NAME}=${encoded}; max-age=${maxAge}; path=/; SameSite=Strict`;
};
