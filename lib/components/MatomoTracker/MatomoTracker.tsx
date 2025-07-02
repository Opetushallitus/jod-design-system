import React from 'react';
import { loadMatomo } from './loadMatomo';

declare global {
  interface Window {
    _paq?: unknown[];
  }
}

export interface TrackerProps {
  trackerUrl: string;
  siteId: number;
  pathname: string;
}

let oldPathname = '';

export const MatomoTracker = ({ trackerUrl, siteId, pathname }: TrackerProps) => {
  React.useEffect(() => {
    loadMatomo(trackerUrl, siteId);
  }, [trackerUrl, siteId]);

  React.useEffect(() => {
    if (window._paq && pathname !== oldPathname) {
      window._paq.push(['setCustomUrl', window.location.href]);
      window._paq.push(['setDocumentTitle', document.title]);
      window._paq.push(['trackPageView']);
      oldPathname = pathname;
    }
  }, [pathname]);

  return null;
};
