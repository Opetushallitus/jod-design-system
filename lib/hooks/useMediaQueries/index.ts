import { useMemo, useState, useEffect } from 'react';

const useMediaQuery = (query: string) => {
  const mediaQuery = useMemo(() => window.matchMedia(query), [query]);
  const [match, setMatch] = useState(mediaQuery.matches);

  useEffect(() => {
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
