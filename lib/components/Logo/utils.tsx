import { LogoRgbEn } from './LogoEn';
import { LogoRgbFi } from './LogoFi';
import { LogoRgbSv } from './LogoSv';

export const LogoRgb = ({ language, size }: { language: string; size: number }) => {
  switch (language) {
    case 'sv':
      return <LogoRgbSv size={size} />;
    case 'en':
      return <LogoRgbEn size={size} />;
    default:
      return <LogoRgbFi size={size} />;
  }
};
