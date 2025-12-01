export const useEnvironment = () => {
  const hostname = window.location.hostname;

  return {
    isDev: ['localhost', 'jodkehitys'].some((str) => hostname.includes(str)),
    isTest: hostname.includes('jodtestaus'),
    isProd: !['localhost', 'jodkehitys', 'jodtestaus'].some((str) => hostname.includes(str)),
  };
};
