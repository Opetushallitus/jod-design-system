let isLoaded = false;

export const loadMatomo = (trackerUrl: string, siteId: number) => {
  if (isLoaded) {
    return;
  }

  window._paq = window._paq || [];
  window._paq.push(['trackPageView']);
  window._paq.push(['enableLinkTracking']);
  window._paq.push(['setTrackerUrl', `${trackerUrl}/matomo.php`]);
  window._paq.push(['setSiteId', siteId]);

  const script = document.createElement('script');
  script.src = `${trackerUrl}/matomo.js`;
  script.async = true;
  document.body.appendChild(script);

  isLoaded = true;
};
