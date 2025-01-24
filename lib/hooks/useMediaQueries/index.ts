import React from 'react';

const styles = getComputedStyle(document.documentElement);

const useMediaQuery = (query: string) => {
  const mediaQuery = React.useMemo(() => window.matchMedia(query), [query]);
  const [match, setMatch] = React.useState(mediaQuery.matches);

  React.useEffect(() => {
    const onChange = () => setMatch(mediaQuery.matches);
    mediaQuery.addEventListener('change', onChange);

    return () => mediaQuery.removeEventListener('change', onChange);
  }, [mediaQuery]);

  return match;
};

export const useMediaQueries = () => {
  const { sm, md, lg, xl } = {
    sm: styles.getPropertyValue('--breakpoint-sm'),
    md: styles.getPropertyValue('--breakpoint-md'),
    lg: styles.getPropertyValue('--breakpoint-lg'),
    xl: styles.getPropertyValue('--breakpoint-xl'),
  };
  return {
    sm: useMediaQuery(`(min-width: ${sm})`),
    md: useMediaQuery(`(min-width: ${md})`),
    lg: useMediaQuery(`(min-width: ${lg})`),
    xl: useMediaQuery(`(min-width: ${xl})`),
  };
};
