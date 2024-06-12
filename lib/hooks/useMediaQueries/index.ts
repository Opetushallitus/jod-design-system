import React from 'react';

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
  const { sm, lg } = __SCREENS__;
  return {
    sm: useMediaQuery(`(min-width: ${sm})`),
    lg: useMediaQuery(`(min-width: ${lg})`),
  };
};
